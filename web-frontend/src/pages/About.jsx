import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[400px] w-full flex-col items-center justify-center overflow-hidden bg-cover bg-center">
        <div
          className="absolute inset-0"
          data-alt="Modern clean industrial office space with sunlight"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17, 24, 17, 0.7), rgba(17, 24, 17, 0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxLvfKoG49_y9C_Nnj7rPSnl1EJY2a_0F4aYqE9caY1gN2B96lgO1U4sZfMxf_YziEnQOWD1PFoH7TXZs_u11rg4OMOKqlz_ugEwQWwZ9uS-TQKX2apfb1u3q-UogB-NalIA9pIWjG6qXr8VRlDauTO9-thU8Au7kjBJyuwZL7XE35Cx3xqm3XGV8PwoWF6kM6TN7BhaVwqTb1-OkY4nZfAYCksqbO8zhLWmH-TUC2Ax9bC5mU9dUaQCerArhpqr60aOdhXS69AJ8')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f6f8f6]/20 to-transparent" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-6 px-4 text-center">
          <span className="mx-auto inline-block rounded-full border border-[#13ec13]/30 bg-[#13ec13]/20 py-1 px-3 text-xs font-bold uppercase tracking-wider text-[#13ec13] backdrop-blur-sm">
            Corporate Vision
          </span>
          <h1 className="text-5xl font-black leading-tight tracking-tight text-white drop-shadow-sm md:text-6xl">
            我們的理想與使命
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium leading-relaxed text-gray-200 md:text-xl">
            Our Vision &amp; Mission - 為下一代打造更完善的工業排水環境
          </p>
        </div>
      </section>

      {/* Vision Statement Quote */}
      <section className="relative overflow-hidden bg-white py-20 px-4">
        {/* Decorative background elements */}
        <div className="absolute left-0 top-0 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#13ec13]/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 translate-x-1/3 translate-y-1/3 rounded-full bg-[#13ec13]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <div className="mb-8 flex justify-center text-[#13ec13]/40">
            <span className="material-symbols-outlined text-6xl">
              format_quote
            </span>
          </div>
          <h2 className="mb-8 text-3xl font-bold leading-tight tracking-tight text-[#111811] md:text-4xl lg:text-[44px]">
            <span className="bg-gradient-to-r from-[#111811] to-[#618961] bg-clip-text text-transparent">
              致力於提供最高效能的工業排水方案，
              <br className="hidden md:block" />
              守護每一位工作者的健康與環境。
            </span>
          </h2>
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-[#13ec13]" />
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#618961]">
            我們相信，完善的排水系統不僅是生產力的基石，更是企業對環境責任的具體實踐。
          </p>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="bg-[#f6f8f6] py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-widest text-[#13ec13]">
              Core Values
            </h3>
            <h2 className="text-3xl font-bold text-[#111811] md:text-4xl">
              核心價值
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Value 1 */}
            <div className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-[#13ec13]/30 hover:shadow-xl">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-[#13ec13]/10 text-[#13ec13] transition-colors duration-300 group-hover:bg-[#13ec13] group-hover:text-white">
                <span className="material-symbols-outlined text-4xl">eco</span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#111811] transition-colors group-hover:text-[#13ec13]">
                永續經營
              </h3>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#618961]">
                Sustainability
              </h4>
              <p className="leading-relaxed text-gray-600">
                致力於環境保護與長期發展，導入綠色製程思維，打造低碳排、高效率的綠色工業生態系統。
              </p>
            </div>

            {/* Value 2 */}
            <div className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-[#13ec13]/30 hover:shadow-xl">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-[#13ec13]/10 text-[#13ec13] transition-colors duration-300 group-hover:bg-[#13ec13] group-hover:text-white">
                <span className="material-symbols-outlined text-4xl">
                  lightbulb
                </span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#111811] transition-colors group-hover:text-[#13ec13]">
                技術領先
              </h3>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#618961]">
                Tech Leadership
              </h4>
              <p className="leading-relaxed text-gray-600">
                不斷研發創新排水技術，結合 IoT
                智慧監控，提供業界最高效能與最精準的客製化解決方案。
              </p>
            </div>

            {/* Value 3 */}
            <div className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:border-[#13ec13]/30 hover:shadow-xl">
              <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-[#13ec13]/10 text-[#13ec13] transition-colors duration-300 group-hover:bg-[#13ec13] group-hover:text-white">
                <span className="material-symbols-outlined text-4xl">
                  diversity_1
                </span>
              </div>
              <h3 className="mb-4 text-xl font-bold text-[#111811] transition-colors group-hover:text-[#13ec13]">
                以人為本
              </h3>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#618961]">
                People First
              </h4>
              <p className="leading-relaxed text-gray-600">
                視員工健康與客戶需求為首要考量，創造安全、舒適且符合人體工學的友善工作環境。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-gray-100 bg-white py-16 px-4">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-[#111811] p-10 text-center text-white md:p-16">
          {/* Abstract pattern background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#13ec13] via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold md:text-4xl">
              準備好升級您的工作環境了嗎？
            </h2>
            <p className="max-w-xl text-lg text-gray-300">
              讓我們攜手打造更安全、更高效的工業排水系統。
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-[#13ec13] py-3 px-8 font-bold text-[#111811] shadow-lg transition-colors hover:bg-[#0fa80f] hover:shadow-[#13ec13]/50"
              >
                聯絡我們
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

