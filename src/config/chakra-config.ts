import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          value: '#04A51E',
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
