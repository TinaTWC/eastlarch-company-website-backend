export default function Quote() {
  return (
    <main className="flex flex-grow flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-[800px]">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold text-slate-900">
            產品詢價單
          </h1>
          <p className="text-slate-500">
            請填寫下方表格，我們的團隊將盡快與您聯繫。
          </p>
        </div>

        <form className="flex flex-col gap-8">
          {/* 詢價項目 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#2bee2b]/20 text-[#1fa81f]">
                <span className="material-symbols-outlined text-xl">
                  inventory_2
                </span>
              </span>
              詢價項目
            </h3>
            <div className="space-y-4">
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 transition-colors hover:border-[#2bee2b]">
                <input
                  className="mt-1 size-5 rounded border-slate-300 bg-white accent-[#2bee2b] focus:ring-[#2bee2b]"
                  type="checkbox"
                />
                <div className="flex-1">
                  <span className="block text-sm font-bold text-slate-900">
                    電動排水器 (Electric Drainage Pump)
                  </span>
                  <span className="text-xs text-slate-500">
                    適用於一般廠房排水，高效率馬達驅動。
                  </span>
                </div>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-4 transition-colors hover:border-[#2bee2b]">
                <input
                  className="mt-1 size-5 rounded border-slate-300 bg-white accent-[#2bee2b] focus:ring-[#2bee2b]"
                  type="checkbox"
                />
                <div className="flex-1">
                  <span className="block text-sm font-bold text-slate-900">
                    無動力排水器 (Gravity Drainage)
                  </span>
                  <span className="text-xs text-slate-500">
                    環保節能，利用重力自然排水，無需電力。
                  </span>
                </div>
            </div>
          </div>

          {/* 聯絡資訊 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-slate-900">
              <span className="flex size-8 items-center justify-center rounded-lg bg-[#2bee2b]/20 text-[#1fa81f]">
                <span className="material-symbols-outlined text-xl">person</span>
              </span>
              聯絡資訊
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="col-span-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  姓名
                </label>
                <input
                  className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-[#2bee2b] focus:ring-[#2bee2b]"
                  placeholder="王小明"
                  type="text"
                />
              </div>
              <div className="col-span-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  公司名稱
                </label>
                <input
                  className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-[#2bee2b] focus:ring-[#2bee2b]"
                  placeholder="範例工業股份有限公司"
                  type="text"
                />
              </div>
              <div className="col-span-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  電話
                </label>
                <input
                  className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-[#2bee2b] focus:ring-[#2bee2b]"
                  placeholder="02-2345-6789"
                  type="tel"
                />
              </div>
              <div className="col-span-1">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  電子郵件
                </label>
                <input
                  className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-[#2bee2b] focus:ring-[#2bee2b]"
                  placeholder="wang@company.com"
                  type="email"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  公司所在地 (服務地區)
                </label>
                <select className="w-full rounded-lg border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 focus:border-[#2bee2b] focus:ring-[#2bee2b]">
                  <option value="">請選擇縣市...</option>
                  <option value="keelung">基隆市</option>
                  <option value="taipei">台北市</option>
                  <option value="new_taipei">新北市</option>
                  <option value="taoyuan">桃園市</option>
                  <option value="hsinchu_city">新竹市</option>
                  <option value="hsinchu_county">新竹縣</option>
                  <option value="miaoli">苗栗縣</option>
                  <option value="taichung">台中市</option>
                  <option value="changhua">彰化縣</option>
                  <option value="nantou">南投縣</option>
                  <option value="yunlin">雲林縣</option>
                  <option value="chiayi_city">嘉義市</option>
                  <option value="chiayi_county">嘉義縣</option>
                  <option value="tainan">台南市</option>
                  <option value="kaohsiung">高雄市</option>
                  <option value="pingtung">屏東縣</option>
                  <option value="yilan">宜蘭縣</option>
                  <option value="hualien">花蓮縣</option>
                  <option value="taitung">台東縣</option>
                  <option value="other">其他 / 外島地區</option>
                </select>
                <p className="mt-1 text-xs text-slate-500">
                  我們會將您的詢價轉交給負責該區域的業務代表或經銷商。
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center pt-4">
            <button
              className="flex w-full transform items-center justify-center gap-2 rounded-lg bg-[#2bee2b] px-12 py-4 text-lg font-bold text-slate-900 shadow-md transition-all hover:bg-[#1fa81f] hover:shadow-lg active:scale-95 sm:w-auto"
              type="button"
            >
              提交詢價
              <span className="material-symbols-outlined text-xl">send</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
