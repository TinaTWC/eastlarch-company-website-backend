export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-hero-bg py-20 lg:py-32">
        <div
          className="absolute inset-0 z-0 opacity-20"
          data-alt="Abstract geometric dot pattern on light green background"
          style={{
            backgroundImage: 'radial-gradient(#2D6A4F 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-4xl font-black leading-tight tracking-tight text-secondary sm:text-5xl lg:text-6xl">
              穩定排水，守護製程：
              <br className="hidden sm:block" />
              電動與無動力雙效專家
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-medium leading-relaxed text-slate-600">
              提供最高標準的工業排水解決方案，結合電動與無動力技術，優化您的生產環境，打造高效、安全的作業空間。
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-8 text-base font-bold text-white shadow-lg shadow-emerald-200 transition-colors hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white sm:w-auto">
                查看商品
              </button>
            </div>
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

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="order-2 lg:order-1">
              <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-slate-50 shadow-lg ring-1 ring-slate-100">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  data-alt="Modern industrial factory with drainage systems"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBcA8mhWLb7k7YE2nLdlubWAzPHZJngOiHN5T64d7NjBbvRqLtmQfDxRC_RauO1ck6Wf3Vgc57KCcahBMszC5uqayGBNMCj47XaWpNhW4NegJHDEjD_zApU4SBJtTM1nQPCI1m4_tACGLbycAM59q5DXMhZOFqnElLKTKVO5alLNvpJPa_YgWAV6Qw-2Rp4oseKKGHX6uYfLLvZlsqwjRySVl6gN8Ho2UIA1x3pbUr-x61gd3Pjka3wED7mduHKfDDXtHFtie-9OiE')",
                  }}
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-primary">
                工業級解決方案
              </h3>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                為您的廠房量身打造
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-slate-600">
                無論是廠區雨水排水，還是室內汙水排放需求，VENTI-PRO
                都能提供最適合的系統規劃。我們的工程師將親臨現場評估，確保每一分投資都發揮最大效益。
              </p>

              <ul className="mb-8 space-y-4">
                <li className="flex items-center gap-3 text-slate-700">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span>客製化排水系統設計</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span>節能減碳效能評估</span>
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <span className="material-symbols-outlined text-primary">
                    check_circle
                  </span>
                  <span>定期維護保養計畫</span>
                </li>
              </ul>

              <a
                className="inline-flex items-center font-bold text-primary transition-colors hover:text-primary-hover"
                href="#"
              >
                深入了解我們的服務
                <span className="material-symbols-outlined ml-1 text-sm">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

