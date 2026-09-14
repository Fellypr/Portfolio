import {
  getApiAboutMeGetAllAboutMe,
  postApiAboutMeAddAboutMe,
  putApiAboutMeUpdateAboutMeId,
  deleteApiAboutMeDeleteAboutMeId,
} from "@/api/generated/hooks/about-me/about-me";

import type {
  AboutMeResponseDto,
  CreateAboutMeDto,
  UpdateAboutMeDto,
} from "@/api/generated/interfaces";

export const aboutMeService = {
  async getAll(): Promise<AboutMeResponseDto[]> {
    const response = await getApiAboutMeGetAllAboutMe();
    return response.data.dados ?? [];
  },

  async create(dto: CreateAboutMeDto): Promise<AboutMeResponseDto | null> {
    const response = await postApiAboutMeAddAboutMe(dto);
    return response.data.dados ?? null;
  },

  async update(id: number, dto: UpdateAboutMeDto): Promise<AboutMeResponseDto | null> {
    const response = await putApiAboutMeUpdateAboutMeId(id, dto);
    return response.data.dados ?? null;
  },

  async delete(id: number): Promise<boolean> {
    const response = await deleteApiAboutMeDeleteAboutMeId(id);
    return response.data.dados ?? false;
  },
};

export const aboutMeServices = aboutMeService;

