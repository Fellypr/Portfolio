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

  async getAll(): Promise<ProjectResponseDto[]> {
    const response = await getApiProjectsGetAllProjects();
    return response.data.dados ?? [];
  },
  async create(dto: CreateProjectDto): Promise<ProjectResponseDto | null> {
    const response = await postApiProjectsAddProject(dto);
    return response.data.dados ?? null;
  },

  async update(id: number, dto: UpdateProjectDto): Promise<ProjectResponseDto | null> {
    const response = await putApiProjectsUpdateProjectId(id, dto);
    return response.data.dados ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const response = await deleteApiProjectsDeleteProjectId(id);
    return response.data.dados ?? false;
  },
};

