# Portfolio Frontend

Aplicação web moderna desenvolvida com **Next.js (App Router)**, **React 19**, **Tailwind CSS v4** e integração tipada via **Orval (OpenAPI/Swagger)**. O projeto reúne a vitrine pública do portfólio profissional e uma área administrativa (Dashboard) para gestão dinâmica de conteúdos como dados pessoais, projetos e contatos.

---

## 🚀 Tecnologias e Stack

| Camada / Função | Tecnologia | Versão |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | 16.3.0 |
| **UI Library** | React | 19.2.8 |
| **Linguagem** | TypeScript | ^5 |
| **Estilização** | Tailwind CSS & PostCSS | ^4 |
| **Animações** | Framer Motion | ^13.1.1 |
| **Formulários & Validação** | React Hook Form & Zod | ^7.92.0 / ^4.6.7 |
| **Data Fetching / State** | TanStack React Query & Custom Fetch | ^5.102.8 |
| **Geração de Cliente API** | Orval (OpenAPI 3.0 / Swagger) | ^8.30.0 |
| **Ícones** | React Icons | ^5.7.0 |

---

## 📁 Estrutura do Projeto

```text
Portfolio/
├── public/                 # Imagens, ícones de tecnologias e assets estáticos
├── src/
│   ├── api/                # Camada de comunicação HTTP
│   │   ├── custom-fetch.ts # Mutator HTTP customizado, resolução de JWT e erros
│   │   └── generated/      # Código gerado via Orval (hooks e interfaces DTO)
│   ├── app/                # Next.js App Router (Páginas, Layouts e Route Handlers)
│   │   ├── 174464Fe/       # Rota protegida do Dashboard Administrativo
│   │   ├── api/auth/       # Route handlers locais (ex: /api/auth/session)
│   │   ├── login/          # Tela de autenticação administrativa
│   │   ├── layout.tsx      # Layout raiz com fontes e estilos globais
│   │   └── page.tsx        # Landing Page pública do portfólio
│   ├── components/         # Componentes compartilhados (Header, Footer, UI base)
│   ├── features/           # Módulos organizados por domínio (Feature-driven)
│   │   ├── about/          # Seção Sobre Mim
│   │   ├── auth/           # Login, hooks de sessão, validação e schemas
│   │   ├── contact/        # Seção de Contato e formulários
│   │   ├── dashboard/      # Painel de gestão, modais e serviços CRUD
│   │   ├── hero/           # Hero section e carrossel de introdução
│   │   ├── projects/       # Listagem e vitrine de projetos
│   │   └── stacks/         # Apresentação do ecossistema de tecnologias e órbita
│   └── middleware.ts       # Proteção perimetral de rotas e controle de sessão
├── orval.config.ts         # Configuração do gerador OpenAPI
└── package.json            # Scripts e dependências
```

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto `Portfolio/` contendo:

```env
# URL base da API Backend (ex: ASP.NET Core Web API)
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> [!NOTE]
> Caso `NEXT_PUBLIC_API_URL` não seja especificada, o cliente HTTP (`custom-fetch.ts`) utiliza `http://localhost:5000` como fallback padrão de desenvolvimento.

---

## 🛠️ Instalação e Execução

### Pré-requisitos
- **Node.js** >= 20.x
- **npm**, **pnpm** ou **yarn**
- API Backend em execução em `http://localhost:5000` (ou endereço configurado na env)

### Passos

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a aplicação em [http://localhost:3000](http://localhost:3000).

3. **Compilar para produção:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🔄 Geração de Código da API (Orval)

O projeto consome a documentação OpenAPI/Swagger do backend para manter as tipagens e hooks de requisição sempre atualizados e sincronizados.

- **Regenerar hooks e tipos:**
  ```bash
  npm run api:generate
  ```
- **Modo observador (watch):**
  ```bash
  npm run api:watch
  ```

As definições são geradas em `src/api/generated/` e utilizam o mutator `customFetch` para injeção automática de Bearer Token e interceptação de erros HTTP.

---

## 🔒 Segurança e Autenticação

- **Rota Protegida (`/174464Fe`):** Acesso administrativo protegido simultaneamente no nível de borda (`middleware.ts`) e no Server Component (`/174464Fe/page.tsx`).
- **Token de Sessão:** Armazenado via cookie `auth_session_token` e espelhado em `localStorage` para compatibilidade total entre requisições Client-Side e Server-Side Rendering (SSR).
- **Proteção contra Open Redirect:** O fluxo de redirecionamento pós-login valida e sanitiza a URL de destino contra ataques de manipulação de parâmetros.

---

## 📚 Documentações Complementares

Para aprofundar na arquitetura e integração:
- Consulte [ARCHITECTURE.md](./docs/ARCHITECTURE.md) para detalhes de design de software e fluxo de dados.
- Consulte [API.md](./docs/API.md) para o contrato de integração com a API e serviços.
