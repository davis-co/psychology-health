import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  return {
    plugins: [react()],

    base: env.BASE_URL,
    build: {
      chunkSizeWarningLimit: 1000, // Set your desired limit
      manifest: true,
    },
    define: {
      TEST_TOKEN: JSON.stringify(env.TEST_TOKEN),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      // alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
    },
  }
})
