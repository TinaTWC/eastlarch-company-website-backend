import { API_BASE } from './config.js'

/**
 * 提交詢價單
 * @param {{
 *   products: string[],
 *   name: string,
 *   email: string,
 *   company?: string,
 *   phone?: string,
 *   region?: string
 * }} data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitQuote(data) {
  const res = await fetch(`${API_BASE}/api/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.detail || '提交失敗')
  return json
}
