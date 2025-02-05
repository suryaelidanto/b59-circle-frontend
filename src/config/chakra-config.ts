import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          value: '#04A51E',
        },
        secondary: {
          value: '#909090',
        },
        background: {
          value: '#262626',
        },
        outline: {
          value: '#3F3F3F',
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
