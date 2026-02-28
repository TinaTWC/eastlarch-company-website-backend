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
  let json
  try {
    json = await res.json()
  } catch {
    throw new Error(`伺服器回應異常 (${res.status})`)
  }
  if (!res.ok) {
    const d = json.detail
    const msg = Array.isArray(d)
      ? d.map((x) => x.msg || JSON.stringify(x)).join('、')
      : d || '提交失敗'
    throw new Error(msg)
  }
  return json
}
