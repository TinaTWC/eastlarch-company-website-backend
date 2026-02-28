import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // 允許所有外部網域連入 (或者你也可以寫成陣列: ['eastlarch.com', 'www.eastlarch.com'])
    allowedHosts: true, 
  }
})