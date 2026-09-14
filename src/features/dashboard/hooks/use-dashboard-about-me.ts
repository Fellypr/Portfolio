"use client";

import { useCallback, useEffect, useState } from "react";
import type {
  AboutMeResponseDto,
  CreateAboutMeDto,
  UpdateAboutMeDto,
} from "@/api/generated/interfaces";
import { aboutMeService } from "../services/about-me.service";

export function useDashboardAboutMe() {
  const [aboutMeList, setAboutMeList] = useState<AboutMeResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchAboutMe = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await aboutMeService.getAll();
      setAboutMeList(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar os dados de Sobre Mim.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAboutMe();
  }, [fetchAboutMe]);

  const createAboutMe = async (dto: CreateAboutMeDto) => {
    try {
      setIsSubmitting(true);
      const created = await aboutMeService.create(dto);
      await fetchAboutMe();
      return created;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao cadastrar os dados de Sobre Mim.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateAboutMe = async (id: number, dto: UpdateAboutMeDto) => {
    try {
      setIsSubmitting(true);
      const updated = await aboutMeService.update(id, dto);
      await fetchAboutMe();
      return updated;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao atualizar os dados de Sobre Mim.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAboutMe = async (id: number) => {
    try {
      setIsSubmitting(true);
      const success = await aboutMeService.delete(id);
      if (success) {
        setAboutMeList((prev) => prev.filter((item) => item.id !== id));
      } else {
        await fetchAboutMe();
      }
      return success;
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao excluir os dados de Sobre Mim.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const aboutMe = aboutMeList[0] ?? null;

  return {
    aboutMeList,
    aboutMe,
    loading,
    error,
    isSubmitting,
    refresh: fetchAboutMe,
    createAboutMe,
    updateAboutMe,
    deleteAboutMe,
  };
}

export const useDashboardAbout = useDashboardAboutMe;

