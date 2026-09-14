import {
    getApiContactsGetAllContacts,
    putApiContactsUpdateContactId
} from "@/api/generated/hooks/contacts/contacts";

import type {
    ContactResponseDto,
    UpdateContactDto
} from "@/api/generated/interfaces"


export const contactServices = {

    async getAll(): Promise<ContactResponseDto[]> {
        const response = await getApiContactsGetAllContacts();
        return response.data.dados ?? []
    },
    async update(id:number , dto: UpdateContactDto): Promise<ContactResponseDto | null> {
        const response = await putApiContactsUpdateContactId(id,dto)
        return response.data.dados || null;
    }
}
