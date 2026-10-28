import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hv-santa-monica-sebaz.vercel.app',
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
