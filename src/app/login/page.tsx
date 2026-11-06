import { Metadata } from "next";
import { LoginScreen } from "@/features/auth";

export const metadata: Metadata = {
  title: "Login | Sign in",
  description: "Tela de login moderna e segura.",
};

export default function LoginPage() {
  return (
    <LoginScreen
      titleLeft="Welcome Back"
      descriptionLeft="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using"
      formTitle="Sign in"
      usernameLabel="Email Address"
      usernamePlaceholder="Digite seu email ou usuário"
      passwordLabel="Password"
      passwordPlaceholder="Digite sua senha"
      submitButtonText="Sign in now"
      redirectTo="/174464Fe"
    />
  );
}

