"use client";
import { useCallback, useEffect, useState } from "react";
import {
  UpdateContactDto,
  ContactResponseDto,
} from "@/api/generated/interfaces";

export function useDashboardContact() {
  const [contacts, setContacts] = useState<ContactResponseDto[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  
}
