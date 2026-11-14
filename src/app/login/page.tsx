import { Metadata } from "next";
import { LoginScreen } from "@/features/auth";

export const metadata: Metadata = {
  title: "Login | Sign in",
  description: "Tela de login moderna e minimalista para portfólio.",
};

export default function LoginPage() {
  return <LoginScreen />;
}
