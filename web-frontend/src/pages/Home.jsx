import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/products.js'

// 專利證書圖片，請放到 web-frontend/public/images/patent-m683135.jpg
const PATENT_IMAGE = '/images/patent-m683135.jpg'
const SLIDE_COUNT = 2

function HeroCarousel() {
  const trackRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [patentImageOk, setPatentImageOk] = useState(true)

  const goToSlide = (index) => {
    const track = trackRef.current
    if (!track) return
    const target = (index + SLIDE_COUNT) % SLIDE_COUNT
    track.scrollTo({ left: track.clientWidth * target, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const track = trackRef.current
    if (!track) return
    setActiveSlide(Math.round(track.scrollLeft / track.clientWidth))
  }

  return (
    <section className="relative overflow-hidden bg-hero-bg">
      <div
        className="absolute inset-0 z-0 opacity-20"
        data-alt="Abstract geometric dot pattern on light green background"
        style={{
          backgroundImage: 'radial-gradient(#2D6A4F 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative z-10">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          tabIndex={0}
          aria-label="首頁輪播"
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-full shrink-0 snap-center items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-secondary sm:text-4xl lg:text-5xl">
                穩定排水，守護製程：
                <br className="hidden sm:block" />
                電動與無動力雙效專家
              </h1>
              <p className="mx-auto max-w-2xl text-base font-medium leading-relaxed text-slate-600">
                提供最高標準的工業排水解決方案，結合電動與無動力技術，優化您的生產環境，打造高效、安全的作業空間。
              </p>
            </div>
          </div>

          <div className="flex w-full shrink-0 snap-center items-center justify-center px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
              {patentImageOk ? (
                <img
                  src={PATENT_IMAGE}
                  alt="全透明無耗氣電子式排水器 中華民國專利證書 M683135"
                  onError={() => setPatentImageOk(false)}
                  className="max-h-64 w-auto rounded-lg border border-emerald-100 bg-white object-contain shadow-sm sm:max-h-80 lg:max-h-96"
                />
              ) : (
                <div className="flex h-64 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-emerald-300 bg-white/60 text-emerald-600 sm:h-80 sm:w-60">
                  <span className="material-symbols-outlined text-4xl">image</span>
                  <span className="text-sm font-medium">專利證書圖片</span>
                </div>
              )}
              <h2 className="text-2xl font-black leading-snug tracking-tight text-secondary sm:text-3xl lg:text-4xl">
                全透明無耗氣電子式排水器
                <br />
                中華民國專利字號證書字號:M683135
              </h2>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => goToSlide(activeSlide - 1)}
          aria-label="上一張"
          className="absolute left-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-secondary shadow-sm transition-colors hover:bg-white sm:flex lg:left-6"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          type="button"
          onClick={() => goToSlide(activeSlide + 1)}
          aria-label="下一張"
          className="absolute right-2 top-1/2 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-secondary shadow-sm transition-colors hover:bg-white sm:flex lg:right-6"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>

        <div className="flex items-center justify-center gap-2 pb-6">
          {Array.from({ length: SLIDE_COUNT }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`第 ${i + 1} 張`}
              aria-current={activeSlide === i ? 'true' : undefined}
              className={[
                'h-2 rounded-full transition-all',
                activeSlide === i ? 'w-6 bg-primary' : 'w-2 bg-emerald-200 hover:bg-emerald-300',
              ].join(' ')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => {})
  }, [])

  return (
    <>
      <HeroCarousel />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              熱門產品
            </h2>
            <p className="mt-3 text-lg text-slate-500">點選產品了解詳細規格與應用情境</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <article
                  key={p.id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-emerald-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/50"
                >
                  <Link
                    to={`/products/${p.id}`}
                    className="relative block w-full overflow-hidden bg-slate-50 pt-[75%]"
                  >
                    <img
                      alt={p.name}
                      src={p.image_url}
                      className="absolute left-0 top-0 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    {p.category && (
                      <span className="mb-1 text-xs font-medium text-primary">{p.category}</span>
                    )}
                    <Link
                      to={`/products/${p.id}`}
                      className="mb-2 text-lg font-bold text-slate-900 transition-colors hover:text-primary"
                    >
                      {p.name}
                    </Link>
                    <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-2">
                      {p.description}
                    </p>
                    <div className="flex items-center gap-3">
                      <Link
                        to={`/products/${p.id}`}
                        className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
                      >
                        商品簡介
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </Link>
                      <Link
                        to="/quote"
                        className="ml-auto inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-primary-hover"
                      >
                        詢價
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-slate-400">載入中...</div>
          )}

          <div className="mt-10 text-center">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-lg border border-primary px-6 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              查看全部產品
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-background-light py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              專業、高效、安全
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              我們致力於為您的工廠提供最佳排水解決方案
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group relative flex flex-col rounded-xl border border-emerald-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/50">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-lg bg-emerald-50 text-primary">
                <span className="material-symbols-outlined text-3xl">
                  engineering
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">專業技術</h3>
              <p className="text-base leading-relaxed text-slate-600">
                十年研發經驗，領先業界的排水效能。我們專注於流體力學設計，確保每一套系統都能達到最佳排水效率。
              </p>
            </div>

            <div className="group relative flex flex-col rounded-xl border border-emerald-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/50">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-lg bg-emerald-50 text-primary">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">快速響應</h3>
              <p className="text-base leading-relaxed text-slate-600">
                24小時技術支援，確保製程永不中斷。我們的專業團隊隨時待命，為您解決任何突發狀況，降低停機風險。
              </p>
            </div>

            <div className="group relative flex flex-col rounded-xl border border-emerald-100 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100/50">
              <div className="mb-6 inline-flex size-12 items-center justify-center rounded-lg bg-emerald-50 text-primary">
                <span className="material-symbols-outlined text-3xl">
                  verified_user
                </span>
              </div>
              <h3 className="mb-3 text-xl font-bold text-secondary">安全可靠</h3>
              <p className="text-base leading-relaxed text-slate-600">
                符合國際工業安全標準，品質值得信賴。所有產品皆經過嚴格測試，保證在高強度工業環境下依然穩定耐用。
              </p>
            </div>
          </div>
        </div>
      </section>


    </>
  )
}

