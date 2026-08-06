import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { fetchProduct } from '../api/products.js'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    if (!id) return
    fetchProduct(Number(id))
      .then((data) => {
        setProduct(data)
        setActiveImg(0)
      })
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

  const images = product.images?.length ? product.images : [product.image_url || product.img]
  const desc = product.description || product.desc
  const specs = product.specs || {}
  const features = product.features || []
  const applications = product.applications || []
  // 同系列多型號時以並列比較表呈現；已列在比較表的項目不再重複於共同規格
  const specVariants = product.spec_variants || null
  const variantLabels = new Set(specVariants?.rows?.map((r) => r.label) || [])
  const commonSpecs = Object.entries(specs).filter(([k]) => !variantLabels.has(k))

  return (
    <div className="flex flex-1 flex-col bg-[#f6f8f6] text-[#111811]">
      <section className="mx-auto w-full max-w-[1100px] px-4 py-10 md:px-10">

        {/* Breadcrumb */}
        <Link
          to="/products"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-[#618961] transition-colors hover:text-[#2bee2b]"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          返回產品列表
        </Link>

        {/* Main card */}
        <div className="overflow-hidden rounded-2xl border border-[#e8ede8] bg-white shadow-md">

          {/* Top: image gallery + summary */}
          <div className="flex flex-col md:flex-row">

            {/* Image gallery */}
            <div className="flex flex-col gap-3 p-6 md:w-[52%] md:p-8">
              <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3]">
                <img
                  key={activeImg}
                  alt={product.name}
                  src={images[activeImg]}
                  className="absolute inset-0 size-full object-contain"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                        activeImg === i
                          ? 'border-[#2bee2b] shadow-sm'
                          : 'border-[#e8ede8] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={src} alt={`圖${i + 1}`} className="size-full object-contain bg-gray-50" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product summary */}
            <div className="flex flex-col justify-start p-6 md:w-[48%] md:border-l md:border-[#f0f4f0] md:p-8">
              {product.category && (
                <span className="mb-2 inline-block w-fit rounded-full bg-[#eafaea] px-3 py-1 text-xs font-semibold text-[#2a792a] tracking-wide">
                  {product.category}
                </span>
              )}
              <h1 className="mb-1 text-2xl font-bold text-[#111811] md:text-3xl leading-snug">
                {product.name}
              </h1>
              {product.model && (
                <p className="mb-4 text-sm text-slate-400 font-medium">型號：{product.model}</p>
              )}
              <p className="mb-6 text-sm leading-relaxed text-slate-600">{desc}</p>

              {/* Quick specs strip */}
              {Object.keys(specs).length > 0 && (
                <div className="mb-6 grid grid-cols-2 gap-3">
                  {['耐壓', '耐溫', '電壓', '最大排水量'].filter(k => specs[k]).map((k) => (
                    <div key={k} className="rounded-lg bg-[#f6f8f6] px-4 py-3 border border-[#e8ede8]">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{k}</p>
                      <p className="mt-0.5 text-sm font-bold text-[#111811]">{specs[k]}</p>
                    </div>
                  ))}
                </div>
              )}

              {applications.length > 0 && (
                <div className="mb-6">
                  <p className="mb-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">適用場景</p>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((app) => (
                      <span key={app} className="rounded-full bg-[#f0f4f0] px-3 py-1 text-xs text-slate-600 border border-[#e0e8e0]">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Link
                to="/quote"
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#2bee2b] px-6 py-3.5 text-sm font-bold text-[#111811] transition-colors hover:bg-[#22bd22] shadow-sm"
              >
                立即詢價
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-6 border-t border-[#f0f4f0] md:mx-10" />

          {/* Features */}
          {features.length > 0 && (
            <div className="px-6 py-8 md:px-10">
              <h2 className="mb-6 text-lg font-bold text-[#111811]">產品特色</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((f) => (
                  <div key={f.title} className="rounded-xl border border-[#e8ede8] bg-[#f9fbf9] p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#2bee2b]/20">
                        <span className="material-symbols-outlined text-base text-[#2a792a]">check_circle</span>
                      </span>
                      <h3 className="text-sm font-bold text-[#111811]">{f.title}</h3>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="mx-6 border-t border-[#f0f4f0] md:mx-10" />

          {/* Specifications table */}
          {(specVariants || commonSpecs.length > 0) && (
            <div className="px-6 py-8 md:px-10">
              <h2 className="mb-6 text-lg font-bold text-[#111811]">技術規格</h2>

              {specVariants && (
                <div className="mb-8 overflow-x-auto rounded-xl border border-[#e8ede8]">
                  <table className="w-full min-w-[560px] text-sm">
                    <thead>
                      <tr className="bg-[#f0f4f0]">
                        <th className="w-[22%] border-r border-[#e8ede8] px-5 py-3" />
                        {specVariants.columns.map((col) => (
                          <th
                            key={col}
                            className="border-r border-[#e8ede8] px-5 py-3 text-left text-xs font-bold tracking-widest text-[#111811] last:border-r-0"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {specVariants.rows.map((row, i) => (
                        <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9fbf9]'}>
                          <td className="border-r border-[#f0f4f0] px-5 py-3.5 text-xs font-semibold text-slate-500">
                            {row.label}
                          </td>
                          {row.values.map((v, j) => (
                            <td
                              key={`${row.label}-${j}`}
                              className="border-r border-[#f0f4f0] px-5 py-3.5 font-medium text-[#111811] last:border-r-0"
                            >
                              {v}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {commonSpecs.length > 0 && (
                <>
                  {specVariants && (
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
                      共同規格
                    </p>
                  )}
                  <div className="overflow-hidden rounded-xl border border-[#e8ede8]">
                    <table className="w-full text-sm">
                      <tbody>
                        {commonSpecs.map(([k, v], i) => (
                          <tr key={k} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f9fbf9]'}>
                            <td className="w-[40%] px-5 py-3.5 font-semibold text-slate-500 text-xs border-r border-[#f0f4f0]">
                              {k}
                            </td>
                            <td className="px-5 py-3.5 text-[#111811] font-medium">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="mx-6 border-t border-[#f0f4f0] md:mx-10" />

          {/* Product intro / description */}
          {product.intro && (
            <div className="px-6 py-8 md:px-10">
              <h2 className="mb-4 text-lg font-bold text-[#111811]">商品簡介</h2>
              <div className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {product.intro}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="flex flex-col items-center gap-4 bg-[#f0f8f0] px-6 py-10 text-center md:px-10">
            <p className="text-base font-semibold text-[#111811]">對此產品有興趣？歡迎聯繫我們取得詳細報價。</p>
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2bee2b] px-8 py-3.5 text-sm font-bold text-[#111811] transition-colors hover:bg-[#22bd22] shadow-sm"
            >
              填寫詢價單
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
