import { API_BASE } from './config.js'

/**
 * 提交聯絡表單
 * @param {{name: string, email: string, message: string, company?: string, phone?: string}} data
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitContact(data) {
  const res = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.detail || '提交失敗')
  return json
}
