import { useCallback, useEffect, useState } from "react";
import type {
  ContactResponseDto,
  CreateContactDto,
  UpdateContactDto,
} from "@/api/generated/interfaces";
import { contactServices } from "../services/contact.service";

export function useDashboardContact() {
  const [contacts, setContacts] = useState<ContactResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchContacts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await contactServices.getAll();
      setContacts(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar os contatos.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const createContact = async (dto: CreateContactDto) => {
    try {
      setIsSubmitting(true);
      const created = await contactServices.create(dto);
      await fetchContacts();
      return created;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao criar contato.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateContact = async (id: number, dto: UpdateContactDto) => {
    try {
      setIsSubmitting(true);
      const updated = await contactServices.update(id, dto);
      await fetchContacts();
      return updated;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao atualizar o contato.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteContact = async (id: number) => {
    try {
      setIsSubmitting(true);
      const success = await contactServices.delete(id);
      if (success) {
        setContacts((prev) => prev.filter((item) => item.id !== id));
      } else {
        await fetchContacts();
      }
      return success;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao excluir o contato.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contact = contacts[0] ?? null;

  return {
    contacts,
    contact,
    loading,
    error,
    isSubmitting,
    refresh: fetchContacts,
    createContact,
    updateContact,
    deleteContact,
  };
}

export const useDashboardContacts = useDashboardContact;


