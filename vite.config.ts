// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  vite: {
    plugins: [
    tanstackStart({
      prerender: {
        enabled: true, // 👈 CRITICAL: This forces TanStack to output static index.html files
      },
    }),
    viteReact(), // Note: react plugin must always come AFTER tanstackStart
  ],
    base: "/group-pay-pal/",
    server: {
      allowedHosts: [
        "9f0d-2c0f-fe38-2412-74b3-5492-c39c-b869-cfa9.ngrok-free.app",
        "6957-41-90-137-232.ngrok-free.app",
        "pagamos.github.io",
        "*.vercel.app",
      ],
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
