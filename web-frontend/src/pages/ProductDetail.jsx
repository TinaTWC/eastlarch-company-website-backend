import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { fetchProduct } from '../api/products.js'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    fetchProduct(Number(id))
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#f6f8f6] py-20">
        <p className="text-slate-500">載入中...</p>
      </div>
    )
  }

  if (error || !product) {
    return <Navigate to="/products" replace />
  }

  const img = product.image_url || product.img
  const desc = product.description || product.desc
  const intro = product.intro || product.description || product.desc

  return (
    <div className="flex flex-1 flex-col bg-[#f6f8f6] text-[#111811]">
      <section className="mx-auto w-full max-w-[900px] px-4 py-12 md:px-10">
        <Link
          to="/products"
          className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-[#618961] transition-colors hover:text-[#2bee2b]"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          返回產品列表
        </Link>

        <article className="overflow-hidden rounded-xl border border-[#f0f4f0] bg-white shadow-sm">
          <div className="relative w-full overflow-hidden bg-gray-100 aspect-[16/9] md:aspect-[21/9]">
            <img
              alt={product.name}
              className="absolute left-0 top-0 size-full object-cover"
              src={img}
            />
          </div>
          <div className="p-6 md:p-10">
            {product.category && (
              <span className="mb-2 inline-block text-xs font-medium text-[#618961]">
                {product.category}
              </span>
            )}
            <h1 className="mb-4 text-2xl font-bold text-[#111811] md:text-3xl">
              {product.name}
            </h1>
            <p className="mb-6 text-slate-600">{desc}</p>

            <div className="mb-8 border-t border-[#f0f4f0] pt-6">
              <h2 className="mb-4 text-lg font-bold text-[#111811]">
                商品簡介
              </h2>
              <div className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {intro}
              </div>
            </div>

            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2bee2b] px-6 py-3 text-sm font-bold text-[#111811] transition-colors hover:bg-[#22bd22]"
            >
              立即詢價
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}
