/**
 * API 基礎網址
 * 開發：http://localhost:8000（需先啟動 FastAPI 後端）
 * 生產：設定環境變數 VITE_API_URL，例如 https://你的後端.railway.app
 */
export const API_BASE =
  import.meta.env.VITE_API_URL || 'http://localhost:8000'
