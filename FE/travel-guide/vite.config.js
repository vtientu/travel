import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5175,
    },
    plugins: [
        react(),
        svgr({
            exportAsDefault: true,
        }),
    ],
})
