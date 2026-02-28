import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/products.js'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data)
      })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // 將 API 回傳格式對應至元件使用格式
  const mapProduct = (p) => ({
    id: p.id,
    name: p.name,
    desc: p.description,
    img: p.image_url,
    category: p.category || '',
  })

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-[#f6f8f6] py-20">
        <p className="text-slate-500">載入中...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-[#f6f8f6] py-20">
        <p className="text-red-600">{error}</p>
        <p className="text-sm text-slate-500">
          請確認後端已啟動（於專案根目錄執行：uvicorn main:app --reload）
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col bg-[#f6f8f6] text-[#111811]">
      <section className="relative overflow-hidden bg-[#e8f5e8] px-4 py-16 md:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(#2bee2b 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1280px] text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#111811] md:text-5xl">
            專業產品
          </h1>
          <p className="mx-auto max-w-xl text-lg text-[#618961]">
            提供電動式與無動力兩種排水解決方案，為您的廠房打造完善的排水環境。
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[900px] px-4 py-12 md:px-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const mapped = mapProduct(p)
            return (
              <article
                key={mapped.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#f0f4f0] bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <Link
                  to={`/products/${mapped.id}`}
                  className="relative block w-full overflow-hidden bg-gray-100 pt-[75%]"
                >
                  <img
                    alt={mapped.name}
                    className="absolute left-0 top-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    src={mapped.img}
                  />
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  {mapped.category && (
                    <span className="mb-2 text-xs font-medium text-[#618961]">
                      {mapped.category}
                    </span>
                  )}
                  <Link
                    to={`/products/${mapped.id}`}
                    className="mb-3 text-xl font-bold text-[#111811] transition-colors hover:text-[#2bee2b]"
                  >
                    {mapped.name}
                  </Link>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-[#618961]">
                    {mapped.desc}
                  </p>
                  <div className="flex gap-3">
                    <Link
                      to={`/products/${mapped.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#618961] transition-colors hover:text-[#2bee2b]"
                    >
                      商品簡介
                      <span className="material-symbols-outlined text-base">
                        arrow_forward
                      </span>
                    </Link>
                    <Link
                      to="/quote"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2bee2b] px-4 py-2.5 text-sm font-bold text-[#111811] transition-colors hover:bg-[#22bd22]"
                    >
                      詢價
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
