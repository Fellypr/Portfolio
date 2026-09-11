import {
  getApiProjectsGetAllProjects,
  postApiProjectsAddProject,
  putApiProjectsUpdateProjectId,
  deleteApiProjectsDeleteProjectId,
} from "@/api/generated/hooks/projects/projects";
import type {
  CreateProjectDto,
  ProjectResponseDto,
  UpdateProjectDto,
} from "@/api/generated/interfaces";

export const projectsService = {
  /**
   * Obtém a lista de todos os projetos cadastrados na API.
   */
  async getAll(): Promise<ProjectResponseDto[]> {
    const response = await getApiProjectsGetAllProjects();
    return response.data.dados ?? [];
  },

  /**
   * Adiciona um novo projeto.
   */
  async create(dto: CreateProjectDto): Promise<ProjectResponseDto | null> {
    const response = await postApiProjectsAddProject(dto);
    return response.data.dados ?? null;
  },

  /**
   * Atualiza um projeto existente pelo ID.
   */
  async update(id: number, dto: UpdateProjectDto): Promise<ProjectResponseDto | null> {
    const response = await putApiProjectsUpdateProjectId(id, dto);
    return response.data.dados ?? null;
  },

  /**
   * Exclui um projeto pelo ID.
   */
  async delete(id: number): Promise<boolean> {
    const response = await deleteApiProjectsDeleteProjectId(id);
    return response.data.dados ?? false;
  },
};

