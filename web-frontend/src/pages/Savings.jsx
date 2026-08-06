import { useState } from 'react'
import { Link } from 'react-router-dom'

// 114 年度（2025）公用售電業電力排碳係數，經濟部能源署 2026-06-02 公告
const CO2_FACTOR = 0.467

// 預設值即為簡報中的案例條件，讓案例試算與互動試算共用同一組計算邏輯
const DEFAULTS = {
  price: 4.5,
  unitEnergy: 0.16,
  hoursPerDay: 24,
  daysPerYear: 365,
  intervalMin: 5,
  dischargeSec: 10,
  ventSec: 6,
  airFlow: 0.36,
}

const FIELDS = [
  { key: 'price', label: '電費單價', unit: 'NT$ / 度', step: 0.1 },
  {
    key: 'unitEnergy',
    label: '系統單位耗能',
    unit: 'kW / m³',
    step: 0.01,
    hint: '空壓機產生 1 m³ 壓縮空氣所需電力，可查空壓機性能表',
  },
  { key: 'hoursPerDay', label: '每日運轉時數', unit: '小時', step: 1 },
  { key: 'daysPerYear', label: '每年運轉天數', unit: '天', step: 1 },
  { key: 'intervalMin', label: '排放間隔', unit: '分鐘', step: 1 },
  { key: 'dischargeSec', label: '每次排放時間', unit: '秒', step: 1 },
  {
    key: 'ventSec',
    label: '其中排氣時間',
    unit: '秒',
    step: 1,
    hint: '積水排完後仍持續排放壓縮空氣的時間，這段才是真正的損失',
  },
  {
    key: 'airFlow',
    label: '孔口排氣量',
    unit: 'm³ / sec',
    step: 0.01,
    hint: '依排放孔徑與工作壓力查孔口排放量對照表',
  },
]

function calc(v) {
  const totalSec = v.daysPerYear * v.hoursPerDay * 3600
  const cycleSec = v.intervalMin * 60 + v.dischargeSec
  const actuations = cycleSec > 0 ? totalSec / cycleSec : 0
  const airLoss = actuations * v.airFlow * v.ventSec
  const costPerM3 = v.price * v.unitEnergy
  const annualCost = airLoss * costPerM3
  const kwh = airLoss * v.unitEnergy
  return {
    totalSec,
    cycleSec,
    actuations,
    airLoss,
    costPerM3,
    annualCost,
    monthlyCost: annualCost / 12,
    kwh,
    co2: kwh * CO2_FACTOR,
  }
}

const fmt = (n, digits = 0) =>
  Number.isFinite(n)
    ? n.toLocaleString('zh-TW', { maximumFractionDigits: digits, minimumFractionDigits: 0 })
    : '—'

export default function Savings() {
  const [form, setForm] = useState(DEFAULTS)

  // 輸入過程允許暫時為空字串，計算時以 0 代入避免 NaN 擴散
  const values = Object.fromEntries(
    Object.entries(form).map(([k, v]) => [k, Number(v) || 0]),
  )
  const r = calc(values)
  const isDefault = FIELDS.every((f) => Number(form[f.key]) === DEFAULTS[f.key])

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const results = [
    { label: '每年浪費電費', value: fmt(r.annualCost), unit: '元', accent: true },
    { label: '每月浪費電費', value: fmt(r.monthlyCost), unit: '元' },
    { label: '每年浪費電力', value: fmt(r.kwh), unit: 'kWh' },
    { label: '每年多餘碳排', value: fmt(r.co2), unit: 'kg CO₂e' },
  ]

  const steps = [
    {
      title: '每立方米壓縮空氣的電費成本',
      formula: `${fmt(values.price, 2)} 元/度 × ${fmt(values.unitEnergy, 2)} kW/m³`,
      result: `${fmt(r.costPerM3, 2)} 元 / m³`,
    },
    {
      title: '定時排水器每年作動次數',
      formula: `${fmt(r.totalSec)} 秒/年 ÷ ${fmt(r.cycleSec)} 秒（間隔 ${fmt(values.intervalMin)} 分 + 排放 ${fmt(values.dischargeSec)} 秒）`,
      result: `${fmt(r.actuations)} 次 / 年`,
    },
    {
      title: '每年白白排掉的壓縮空氣',
      formula: `${fmt(r.actuations)} 次 × ${fmt(values.airFlow, 2)} m³/sec × ${fmt(values.ventSec)} 秒`,
      result: `${fmt(r.airLoss)} m³ / 年`,
    },
    {
      title: '換算成電費損失',
      formula: `${fmt(r.airLoss)} m³ × ${fmt(r.costPerM3, 2)} 元/m³`,
      result: `${fmt(r.annualCost)} 元 / 年`,
    },
    {
      title: '換算成電力損失',
      formula: `${fmt(r.airLoss)} m³ × ${fmt(values.unitEnergy, 2)} kW/m³`,
      result: `${fmt(r.kwh)} kWh / 年`,
    },
    {
      title: '換算成碳排放量',
      formula: `${fmt(r.kwh)} kWh × ${CO2_FACTOR} kg CO₂e/度`,
      result: `${fmt(r.co2)} kg CO₂e / 年`,
    },
  ]

  return (
    <div className="flex flex-1 flex-col bg-[#f6f8f6] text-[#111811]">
      <div className="mx-auto w-full max-w-5xl px-6 py-10 md:px-10">
        {/* Hero */}
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#2a792a]">
            節能效益
          </p>
          <h1 className="mb-4 text-2xl font-bold leading-snug md:text-3xl">
            定時排水器每排一次水，就順手排掉一份電費
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            定時電子式排水器依時間開閥，不管桶內有沒有積水都照排。積水排完之後，閥還開著的那幾秒
            排掉的是壓縮空氣 —— 那是你花電費製造出來的。無耗氣電子式排水器以液位感應控制，排完立即
            關閉，這段損失直接歸零。下方可依貴廠實際條件試算。
          </p>
        </div>

        {/* Calculator */}
        <div className="mb-8 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
          {/* Inputs */}
          <div className="rounded-2xl border border-[#e8ede8] bg-white p-6 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold">運轉條件</h2>
              {!isDefault && (
                <button
                  type="button"
                  onClick={() => setForm(DEFAULTS)}
                  className="rounded-lg border border-[#e0e8e0] px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-[#f0f4f0]"
                >
                  還原預設案例
                </button>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <div key={f.key}>
                  <label
                    htmlFor={`field-${f.key}`}
                    className="mb-1.5 block text-xs font-semibold text-slate-500"
                  >
                    {f.label}
                    <span className="ml-1 font-normal text-slate-400">（{f.unit}）</span>
                  </label>
                  <input
                    id={`field-${f.key}`}
                    type="number"
                    min="0"
                    step={f.step}
                    value={form[f.key]}
                    onChange={update(f.key)}
                    className="w-full rounded-lg border border-[#e0e8e0] bg-[#f9fbf9] px-3.5 py-2.5 text-sm font-medium text-[#111811] outline-none transition-colors focus:border-[#2bee2b] focus:bg-white"
                  />
                  {f.hint && <p className="mt-1.5 text-[11px] leading-snug text-slate-400">{f.hint}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-[#e8ede8] bg-white p-6 md:p-8">
              <h2 className="mb-1 text-lg font-bold">改用無耗氣排水器後可省下</h2>
              <p className="mb-5 text-xs text-slate-400">單台排水器、依左側條件計算</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {results.map((item) => (
                  <div
                    key={item.label}
                    className={[
                      'rounded-xl border px-4 py-4',
                      item.accent
                        ? 'border-[#2bee2b]/40 bg-[#2bee2b]/10 sm:col-span-2'
                        : 'border-[#e8ede8] bg-[#f9fbf9]',
                    ].join(' ')}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      {item.label}
                    </p>
                    <p
                      className={[
                        'mt-1 font-bold text-[#111811]',
                        item.accent ? 'text-3xl' : 'text-xl',
                      ].join(' ')}
                    >
                      {item.value}
                      <span className="ml-1.5 text-xs font-semibold text-slate-500">{item.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2bee2b] px-6 py-4 text-sm font-bold text-[#111811] shadow-sm transition-colors hover:bg-[#22bd22]"
            >
              我要詢價
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Calculation breakdown */}
        <div className="mb-8 rounded-2xl border border-[#e8ede8] bg-white p-6 md:p-8">
          <h2 className="mb-1 text-lg font-bold">計算過程</h2>
          <p className="mb-6 text-xs text-slate-400">數字隨上方條件即時更新，每一步都可自行驗算</p>
          <ol className="space-y-3">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col gap-2 rounded-xl bg-[#f9fbf9] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2bee2b]/20 text-xs font-bold text-[#2a792a]">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111811]">{s.title}</p>
                    <p className="mt-0.5 break-words text-xs text-slate-500">{s.formula}</p>
                  </div>
                </div>
                <p className="shrink-0 text-sm font-bold text-[#111811] sm:pl-4 sm:text-right">
                  {s.result}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Notes */}
        <div className="rounded-2xl border border-[#e8ede8] bg-white p-6 text-xs leading-relaxed text-slate-500 md:p-8">
          <h2 className="mb-3 text-sm font-bold text-[#111811]">計算說明</h2>
          <ul className="list-disc space-y-1.5 pl-4">
            <li>
              本頁為<strong className="text-slate-600">案例試算</strong>，非保證值。實際節省金額
              依現場工作壓力、排放孔徑、空壓機效率、積水量與電價方案而異，建議由本公司協助現場評估。
            </li>
            <li>
              電力排碳係數採 {CO2_FACTOR} 公斤 CO₂e/度（114 年度公用售電業電力排碳係數，經濟部能源署
              115 年 6 月 2 日公告）。同年度另訂產業電力排碳係數 0.466、民生住宅 0.471，
              碳盤查揭露請依貴公司適用類別調整。
            </li>
            <li>
              預設條件取自實際案場：工作壓力 8.16 kg/cm²、每 5 分鐘排放 10 秒（其中約 6 秒為排氣），
              孔口排氣量依孔口排放量對照表取 0.36 m³/sec。
            </li>
            <li>試算結果為單台排水器之數值，多台請依台數計算。</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
