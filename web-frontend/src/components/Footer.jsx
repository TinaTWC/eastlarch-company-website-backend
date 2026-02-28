import { Link } from 'react-router-dom'
import VentSysLogo from './VentSysLogo.jsx'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-800 bg-[#0a160a] py-12 text-slate-300">
      <div className="mx-auto w-full max-w-[1200px] px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4 flex items-center gap-2 text-white">
              <VentSysLogo className="size-6 text-[#2bee2b]" />
              <span className="text-lg font-bold">落葉松股份有限公司</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              全球領先的工業排水解決方案供應商。
            </p>
          </div>
          <div>
            <h5 className="mb-4 font-bold text-white">快速連結</h5>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link
                  to="/products"
                  className="transition-colors hover:text-[#2bee2b]"
                >
                  產品
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-[#2bee2b]"
                >
                  關於我們
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 font-bold text-white">法律資訊</h5>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a
                  className="transition-colors hover:text-[#2bee2b]"
                  href="#"
                >
                  隱私權政策
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-[#2bee2b]"
                  href="#"
                >
                  服務條款
                </a>
              </li>
              <li>
                <a
                  className="transition-colors hover:text-[#2bee2b]"
                  href="#"
                >
                  合規性
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="mb-4 font-bold text-white">聯絡我們</h5>
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>
                e377564@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">call</span>
                +886 919233959
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  location_on
                </span>
                桃園市中壢區同慶路98號
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 md:flex-row">
          <p>© 2026 落葉松股份有限公司. 版權所有.</p>
          <div className="flex gap-4">
          </div>
        </div>
      </div>
    </footer>
  )
}
