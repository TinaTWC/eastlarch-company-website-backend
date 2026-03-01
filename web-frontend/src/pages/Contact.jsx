import { useState } from 'react'
import { submitContact } from '../api/contact.js'

export default function Contact() {
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target
    const data = {
      name: form.contact?.value?.trim() || '',
      email: form.email?.value?.trim() || '',
      message: form.message?.value?.trim() || '',
      company: form.company?.value?.trim() || undefined,
      phone: form.phone?.value?.trim() || undefined,
    }
    if (!data.name || !data.email || !data.message) {
      setStatus('error')
      return
    }
    setIsSubmitting(true)
    setStatus(null)
    setErrorMessage('')
    try {
      await submitContact(data)
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setErrorMessage(err?.message || '提交失敗，請稍後再試。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#f6f8f6] py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-10">
          <div className="absolute -right-24 -top-24 size-96 rounded-full bg-[#2bee2b] blur-3xl" />
          <div className="absolute -left-24 top-1/2 size-72 rounded-full bg-[#2bee2b] blur-3xl" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center md:px-10">
          <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            聯繫我們的
            <span className="text-[#2bee2b]">專家團隊</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            我們提供專業的工業排水系統解決方案。無論您有任何疑問或專案需求，歡迎隨時與我們聯繫，我們將竭誠為您服務。
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="container mx-auto px-4 pb-20 md:px-10">
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column: Contact Details */}
            <div className="flex flex-col gap-10 bg-slate-50 p-8 md:p-12">
              <div>
                <h3 className="mb-2 text-2xl font-bold text-slate-900">
                  聯絡資訊
                </h3>
                <p className="text-slate-500">
                  您可以透過以下方式找到我們，或直接填寫右側表格。
                </p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="group flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#2bee2b]/20 text-[#22c522] transition-colors group-hover:bg-[#2bee2b] group-hover:text-black">
                    <span className="material-symbols-outlined">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      公司地址
                    </h4>
                    <p className="mt-1 text-slate-600">
                      桃園市中壢區同慶路98號
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#2bee2b]/20 text-[#22c522] transition-colors group-hover:bg-[#2bee2b] group-hover:text-black">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      聯絡電話
                    </h4>
                    <p className="mt-1 text-slate-600">+886 919233959</p>
                    <p className="mt-0.5 text-sm text-slate-500">
                      週一至週日 09:00 - 18:00
                    </p>
                  </div>
                </div>
                <div className="group flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#2bee2b]/20 text-[#22c522] transition-colors group-hover:bg-[#2bee2b] group-hover:text-black">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">
                      電子信箱
                    </h4>
                    <p className="mt-1 text-slate-600">
                    e377564@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="p-8 md:p-12">
              <div className="mb-8">
                <h3 className="mb-2 text-2xl font-bold text-slate-900">
                  專案諮詢
                </h3>
                <p className="text-slate-500">
                  請填寫以下表格，我們將在 24 小時內指派專人與您聯繫。
                </p>
              </div>
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold text-slate-900"
                      htmlFor="company"
                    >
                      公司名稱
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#2bee2b] focus:ring-1 focus:ring-[#2bee2b]"
                      id="company"
                      name="company"
                      placeholder="請輸入貴公司名稱"
                      type="text"
                    />
                      <span className="material-symbols-outlined absolute right-3 top-3 text-lg text-slate-400">
                        domain
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-sm font-semibold text-slate-900"
                      htmlFor="contact"
                    >
                      聯絡人姓名
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#2bee2b] focus:ring-1 focus:ring-[#2bee2b]"
                      id="contact"
                      name="contact"
                      placeholder="請輸入聯絡人姓名"
                      type="text"
                      required
                    />
                      <span className="material-symbols-outlined absolute right-3 top-3 text-lg text-slate-400">
                        person
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-900"
                    htmlFor="email"
                  >
                    電子信箱
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#2bee2b] focus:ring-1 focus:ring-[#2bee2b]"
                      id="email"
                      name="email"
                      placeholder="name@company.com"
                      type="email"
                      required
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-lg text-slate-400">
                      mail
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-900"
                    htmlFor="phone"
                  >
                    聯絡電話
                  </label>
                  <div className="relative">
                    <input
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#2bee2b] focus:ring-1 focus:ring-[#2bee2b]"
                      id="phone"
                      name="phone"
                      placeholder="0912-345-678"
                      type="tel"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-lg text-slate-400">
                      phone
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-900"
                    htmlFor="message"
                  >
                    需求描述
                  </label>
                  <textarea
                    className="resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#2bee2b] focus:ring-1 focus:ring-[#2bee2b]"
                    id="message"
                    name="message"
                    placeholder="請簡述您的需求，例如：廠房排水規劃、設備詢價..."
                    required
                    rows={4}
                  />
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    className="rounded border-slate-300 bg-white text-[#2bee2b] focus:ring-[#2bee2b]"
                    id="policy"
                    type="checkbox"
                  />
                  <label
                    className="text-sm text-slate-500"
                    htmlFor="policy"
                  >
                    我同意隱私權政策與個人資料使用條款
                  </label>
                </div>
                {status === 'success' && (
                  <p className="rounded-lg bg-[#2bee2b]/20 p-3 text-sm font-medium text-[#22c522]">
                    感謝您的來信，我們將在 24 小時內與您聯繫。
                  </p>
                )}
                {status === 'error' && (
                  <p className="rounded-lg bg-red-100 p-3 text-sm font-medium text-red-600">
                    {errorMessage || '提交失敗，請稍後再試或直接來電聯繫。'}
                  </p>
                )}
                <button
                  className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#2bee2b] px-6 py-3 text-sm font-bold text-[#111811] transition-all hover:bg-[#22c522] active:scale-[0.98] disabled:opacity-50"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '提交中...' : '提交申請'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto max-w-[960px] px-4 md:px-10">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">
            常見問題
          </h2>
          <div className="space-y-4">
            <details className="group rounded-xl bg-slate-50 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900">
                <h3 className="font-bold">詢價後多久會收到回覆？</h3>
                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                通常我們會在收到詢價後的 24 小時內由專案經理主動聯繫您，確認詳細需求並安排後續場勘或報價。
              </p>
            </details>
            <details className="group rounded-xl bg-slate-50 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-slate-900">
                <h3 className="font-bold">你們提供全台灣服務嗎？</h3>
                <span className="material-symbols-outlined transition duration-300 group-open:-rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">
                是的，我們的服務範圍涵蓋全台灣各地工業區與科學園區，並且提供完整的售後維修保養服務。
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  )
}
