"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  ContactResponseDto,
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

  return {
    contacts,
    loading,
    error,
    isSubmitting,
    refresh: fetchContacts,
    updateContact,
  };
}

export const useDashboardContacts = useDashboardContact;

