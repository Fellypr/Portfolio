// orval.config.ts
import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: './swagger.json',
    },
    output: {
      mode: 'tags-split',                      // Separa arquivos em pastas por tag/controller
      target: './src/api/generated/endpoints', // Onde vão os hooks (useQuery/useMutation)
      schemas: './src/api/generated/models',   // Onde vão as interfaces e DTOs
      client: 'react-query',                   // Gera integração direta com TanStack Query
      httpClient: 'fetch',
      clean: true,                             // Remove arquivos antigos ao regerar
      override: {
        mutator: {
          path: './src/api/custom-fetch.ts',   // Caminho para o seu customFetch
          name: 'customFetch',                 // Nome exato da função exportada
        },
        query: {
          useQuery: true,
          useMutation: true,
          options: {
            staleTime: 1000 * 60 * 5,          // Exemplo: 5 minutos de cache padrão
          },
        },
      },
    },
  },
});