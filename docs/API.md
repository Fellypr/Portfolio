# Integração com a API - Portfolio Frontend

Este documento descreve como o frontend se comunica com o backend, o mapeamento dos contratos gerados pelo Orval e o consumo dos serviços.

---

## 1. Configuração da API

A URL base do backend é definida pela variável de ambiente `NEXT_PUBLIC_API_URL`.

- **Padrão de Desenvolvimento:** `http://localhost:5000`
- **Mutator HTTP:** [`src/api/custom-fetch.ts`](file:///c:/Users/Gal/Documents/Projetos/portfolio/Portfolio/src/api/custom-fetch.ts)

Todas as requisições utilizam o mutator customizado para:
- Injetar automaticamente o header `Authorization: Bearer <JWT>` caso o token exista no Cookie ou no LocalStorage.
- Tratar e normalizar payloads de erro no formato padronizado da classe `ApiError`.
- Emitir o evento de janela `auth:unauthorized` caso receba status `401 Unauthorized`.

---

## 2. Endpoints e Contratos Consumidos

Os tipos e hooks de chamada são gerados na pasta [`src/api/generated/`](file:///c:/Users/Gal/Documents/Projetos/portfolio/Portfolio/src/api/generated/) a partir do OpenAPI Swagger do backend.

### 2.1. Usuários e Autenticação (`/api/Users`)
| Método | Endpoint | Função Gerada | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/Users/login` | `postApiUsersLogin` | Autentica o usuário e retorna o JWT (`AuthResponseDto`) |
| `POST` | `/api/Users/register` | `postApiUsersRegister` | Registro de novos usuários |
| `GET` | `/api/Users/current-user` | `getApiUsersCurrentUser` | Obtém o perfil do usuário logado |

### 2.2. Projetos (`/api/Projects`)
Gerenciado por [`projects.service.ts`](file:///c:/Users/Gal/Documents/Projetos/portfolio/Portfolio/src/features/dashboard/services/projects.service.ts):
| Método | Endpoint | Função Gerada | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/Projects/GetAllProjects` | `getApiProjectsGetAllProjects` | Lista todos os projetos cadastrados |
| `POST` | `/api/Projects/AddProject` | `postApiProjectsAddProject` | Cria um novo projeto (`CreateProjectDto`) |
| `PUT` | `/api/Projects/UpdateProject/{id}` | `putApiProjectsUpdateProjectId` | Atualiza projeto existente (`UpdateProjectDto`) |
| `DELETE` | `/api/Projects/DeleteProject/{id}` | `deleteApiProjectsDeleteProjectId` | Remove um projeto pelo ID |

### 2.3. Sobre Mim (`/api/AboutMe`)
Gerenciado por [`about-me.service.ts`](file:///c:/Users/Gal/Documents/Projetos/portfolio/Portfolio/src/features/dashboard/services/about-me.service.ts):
| Método | Endpoint | Função Gerada | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/AboutMe` | `getApiAboutMe` | Recupera as informações biográficas e profissionais |
| `POST` | `/api/AboutMe` | `postApiAboutMe` | Cadastra dados iniciais de perfil |
| `PUT` | `/api/AboutMe/{id}` | `putApiAboutMeId` | Atualiza informações de perfil por ID |

### 2.4. Contatos (`/api/Contact`)
Gerenciado por [`contact.service.ts`](file:///c:/Users/Gal/Documents/Projetos/portfolio/Portfolio/src/features/dashboard/services/contact.service.ts):
| Método | Endpoint | Função Gerada | Descrição |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/Contact` | `getApiContact` | Obtém informações de canais de contato |
| `POST` | `/api/Contact` | `postApiContact` | Registra canais de contato |
| `PUT` | `/api/Contact/{id}` | `putApiContactId` | Atualiza canais de contato por ID |

---

## 3. Route Handlers Internos (Next.js)

O frontend possui rotas de API locais para suporte a sessão de cookies:

- `POST /api/auth/session`: Recebe `{ token: string }` e configura o cookie HTTP com validade de 8 horas.
- `GET /api/auth/session`: Consulta se existe sessão autenticada ativa no servidor.
- `DELETE /api/auth/session`: Limpa o cookie de sessão durante o logout.

---

## 4. Atualização de Contratos

Caso o backend altere endpoints ou modelos, execute:
```bash
npm run api:generate
```
> [!IMPORTANT]
> Certifique-se de que a API Backend está em execução em `http://localhost:5000` com o Swagger acessível em `/swagger/v1/swagger.json` antes de rodar o comando.
