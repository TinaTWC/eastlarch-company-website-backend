import { API_BASE } from './config.js'

/**
 * 取得產品列表
 * @returns {Promise<Array<{id: number, name: string, description: string, image_url: string}>>}
 */
export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`)
  if (!res.ok) throw new Error('取得產品失敗')
  return res.json()
}

/**
 * 取得單一產品詳情
 * @param {number} id
 * @returns {Promise<{id: number, name: string, description: string, image_url: string, intro?: string}>}
 */
export async function fetchProduct(id) {
  const res = await fetch(`${API_BASE}/api/products/${id}`)
  if (!res.ok) throw new Error('取得產品詳情失敗')
  return res.json()
}
