"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  CreateProjectDto,
  ProjectResponseDto,
  UpdateProjectDto,
} from "@/api/generated/interfaces";
import { projectsService } from "../services/projects.service";

export function useDashboardProjects() {
  const [projects, setProjects] = useState<ProjectResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsService.getAll();
      setProjects(data);
      console.log("Projects fetched:", data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao carregar os projetos.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const createProject = async (dto: CreateProjectDto) => {
    try {
      setIsSubmitting(true);
      const created = await projectsService.create(dto);
      await fetchProjects();
      return created;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao criar o projeto.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateProject = async (id: number, dto: UpdateProjectDto) => {
    try {
      setIsSubmitting(true);
      const updated = await projectsService.update(id, dto);
      await fetchProjects();
      return updated;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao atualizar o projeto.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteProject = async (id: number) => {
    try {
      setIsSubmitting(true);
      const success = await projectsService.delete(id);
      if (success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        await fetchProjects();
      }
      return success;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao excluir o projeto.";
      throw new Error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    projects,
    loading,
    error,
    isSubmitting,
    refresh: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  };
}

