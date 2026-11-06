"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaArrowLeft,
  FaCircleCheck,
  FaCircleExclamation,
} from "react-icons/fa6";

export interface LoginScreenProps {
  /**
   * Título principal exibido à esquerda
   * @default "Welcome Back"
   */
  titleLeft?: string;
  /**
   * Texto descritivo exibido abaixo do título
   */
  descriptionLeft?: string;
  /**
   * Título do formulário de login
   * @default "Sign in"
   */
  formTitle?: string;
  /**
   * Rótulo do campo de usuário / email
   * @default "Email Address"
   */
  usernameLabel?: string;
  /**
   * Placeholder do campo de usuário / email
   * @default "seu.email@exemplo.com"
   */
  usernamePlaceholder?: string;
  /**
   * Rótulo do campo de senha
   * @default "Password"
   */
  passwordLabel?: string;
  /**
   * Placeholder do campo de senha
   * @default "••••••••"
   */
  passwordPlaceholder?: string;
  /**
   * Texto do botão de submissão
   * @default "Sign in now"
   */
  submitButtonText?: string;
  /**
   * Imagem de fundo personalizada (URL ou caminho local em /public)
   */
  backgroundImageUrl?: string;
  /**
   * Callback acionado ao submeter o formulário
   */
  onSubmit?: (credentials: { username: string; password: string }) => Promise<void> | void;
  /**
   * Rota de redirecionamento após sucesso
   */
  redirectTo?: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  titleLeft = "Welcome Back",
  descriptionLeft = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using",
  formTitle = "Sign in",
  usernameLabel = "Email Address",
  usernamePlaceholder = "Digite seu usuário ou email",
  passwordLabel = "Password",
  passwordPlaceholder = "Digite sua senha",
  submitButtonText = "Sign in now",
  backgroundImageUrl = "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=85",
  onSubmit,
  redirectTo,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage({ type: null, text: "" });

    // Validação básica frontend
    if (!username.trim()) {
      setStatusMessage({
        type: "error",
        text: "Por favor, preencha o campo de usuário ou email.",
      });
      return;
    }

    if (!password.trim()) {
      setStatusMessage({
        type: "error",
        text: "Por favor, digite a sua senha.",
      });
      return;
    }

    if (password.length < 4) {
      setStatusMessage({
        type: "error",
        text: "A senha deve conter no mínimo 4 caracteres.",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (onSubmit) {
        await onSubmit({ username, password });
      } else {
        // Simulação de autenticação com feedback visual realista
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setStatusMessage({
        type: "success",
        text: "Login efetuado com sucesso! Redirecionando...",
      });

      if (redirectTo && typeof window !== "undefined") {
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 800);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Falha na autenticação. Verifique suas credenciais.";
      setStatusMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden font-sans select-none">
      {/* Background Image com Otimização do Next.js */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImageUrl}
          alt="Paisagem de montanhas ao entardecer com neve"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Camada sutil de gradiente e vinheta cinematográfica para contraste e legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-black/55 backdrop-brightness-[0.92]" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60" />
      </div>

      {/* Botão de retorno sutil para navegação */}
      <Link
        href="/"
        className="absolute top-6 left-6 sm:top-8 sm:left-10 z-20 flex items-center gap-2 text-white/80 hover:text-white bg-black/30 hover:bg-black/50 backdrop-blur-md px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border border-white/10 hover:border-white/30 group"
        aria-label="Voltar para a página inicial"
      >
        <FaArrowLeft className="transition-transform group-hover:-translate-x-1" />
        <span>Início</span>
      </Link>

      {/* Conteúdo Principal Centralizado */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LADO ESQUERDO: "Welcome Back" + Texto + Redes Sociais */}
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col justify-center text-white"
            aria-labelledby="welcome-heading"
          >
            <h1
              id="welcome-heading"
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08] drop-shadow-lg"
            >
              {titleLeft.split(" ").map((word, index) => (
                <span key={index} className="block">
                  {word}
                </span>
              ))}
            </h1>

            <p className="mt-6 text-white/85 text-sm sm:text-base leading-relaxed max-w-md drop-shadow-md">
              {descriptionLeft}
            </p>

            {/* Ícones de Mídias Sociais */}
            <nav aria-label="Redes Sociais" className="mt-8 flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label="Twitter / X"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label="Instagram"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
            </nav>
          </motion.section>

          {/* LADO DIREITO: "Sign in" + Inputs de Usuário e Senha + Botão */}
          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-center items-start lg:pl-8 xl:pl-16"
            aria-labelledby="signin-heading"
          >
            <div className="w-full max-w-md">
              <h2
                id="signin-heading"
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md mb-8"
              >
                {formTitle}
              </h2>

              <form onSubmit={handleSubmit} noValidate className="space-y-6 w-full">
                {/* Feedback de Status (Erro / Sucesso) */}
                <AnimatePresence mode="wait">
                  {statusMessage.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`p-3.5 rounded-lg text-sm flex items-center gap-3 backdrop-blur-md border ${
                        statusMessage.type === "success"
                          ? "bg-emerald-950/70 border-emerald-500/50 text-emerald-200"
                          : "bg-red-950/70 border-red-500/50 text-red-200"
                      }`}
                      role="alert"
                    >
                      {statusMessage.type === "success" ? (
                        <FaCircleCheck className="shrink-0 text-emerald-400 w-4 h-4" />
                      ) : (
                        <FaCircleExclamation className="shrink-0 text-red-400 w-4 h-4" />
                      )}
                      <span>{statusMessage.text}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Campo 1: Usuário / Email */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-semibold text-white drop-shadow-sm mb-2"
                  >
                    {usernameLabel}
                  </label>
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={usernamePlaceholder}
                      disabled={isLoading}
                      required
                      aria-required="true"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-400 px-4 py-3 rounded-md shadow-md border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 font-normal transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-base"
                    />
                  </div>
                </div>

                {/* Campo 2: Senha com Toggle de Visualização */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-white drop-shadow-sm mb-2"
                  >
                    {passwordLabel}
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={passwordPlaceholder}
                      disabled={isLoading}
                      required
                      aria-required="true"
                      className="w-full bg-white text-gray-900 placeholder:text-gray-400 px-4 py-3 pr-12 rounded-md shadow-md border border-transparent focus:outline-none focus:ring-2 focus:ring-orange-500 font-normal transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 p-1.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                      aria-label={showPassword ? "Ocultar senha" : "Exibir senha"}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-4 h-4" />
                      ) : (
                        <FaEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* NOTA: Conforme instrução expressa do usuário:
                    NÃO há "Remember Me"
                    NÃO há "Lost your password" */}

                {/* Botão de Submissão com Estilo Laranja Vibrante da Referência */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#e05626] hover:bg-[#c94619] active:bg-[#b03b13] text-white font-semibold text-sm sm:text-base px-8 py-3 rounded-md shadow-lg shadow-orange-950/40 hover:shadow-orange-900/30 transition-all duration-200 active:scale-[0.98] inline-flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isLoading && <FaSpinner className="animate-spin w-4 h-4" />}
                    <span>{isLoading ? "Processando..." : submitButtonText}</span>
                  </button>
                </div>

                {/* Disclaimer Legal / Termos */}
                <p className="text-white/70 text-xs sm:text-sm pt-4 leading-relaxed">
                  By clicking on &ldquo;{submitButtonText}&rdquo; you agree to{" "}
                  <Link
                    href="#"
                    className="underline hover:text-white transition-colors underline-offset-2"
                  >
                    Terms of Service
                  </Link>{" "}
                  |{" "}
                  <Link
                    href="#"
                    className="underline hover:text-white transition-colors underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                </p>
              </form>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
};

