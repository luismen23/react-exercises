// esta es la config de vite que necesito para cuando quiero crear un proyecto react con vanilla JS

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()]
})
