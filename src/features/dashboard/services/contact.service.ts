import {
    getApiContactsGetAllContacts,
    postApiContactsAddContact,
    putApiContactsUpdateContactId,
    deleteApiContactsDeleteContactId
} from "@/api/generated/hooks/contacts/contacts";

import type {
    ContactResponseDto,
    CreateContactDto,
    UpdateContactDto
} from "@/api/generated/interfaces"

export const contactServices = {
    async getAll(): Promise<ContactResponseDto[]> {
        const response = await getApiContactsGetAllContacts();
        return response.data.dados ?? []
    },
    async create(dto: CreateContactDto): Promise<ContactResponseDto | null> {
        const response = await postApiContactsAddContact(dto);
        return response.data.dados ?? null;
    },
    async update(id: number, dto: UpdateContactDto): Promise<ContactResponseDto | null> {
        const response = await putApiContactsUpdateContactId(id, dto)
        return response.data.dados || null;
    },
    async delete(id: number): Promise<boolean> {
        const response = await deleteApiContactsDeleteContactId(id);
        return response.data.dados ?? false;
    }
}

