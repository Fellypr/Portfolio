import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:5050/swagger/v1/swagger.json',
    },
    output: {
      mode: 'tags-split',                      // tags-split ele em especifico, separa os endpoints por tags
      target: './src/api/generated/hooks', // Onde vão os hooks
      schemas: './src/api/generated/interfaces',   // Onde vão as interfaces
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,                             // remove arquivos antigos ao regerar
      override: {
        mutator: {
          path: './src/api/custom-fetch.ts', 
          name: 'customFetch',                 
        },
        query: {
          useQuery: true,
          useMutation: true,
          options: {
            staleTime: 1000 * 60 * 5,          // 5 minutos para o cache padrão
          },
        },
      },
    },
  },
});