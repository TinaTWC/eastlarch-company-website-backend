import { Link, NavLink } from 'react-router-dom'
import VentSysLogo from './VentSysLogo.jsx'

const navLinkClass = ({ isActive }) =>
  [
    'text-sm font-medium leading-normal transition-colors',
    isActive
      ? 'font-bold text-[#2bee2b]'
      : 'text-slate-900 hover:text-[#2bee2b]',
  ].join(' ')

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between whitespace-nowrap border-b border-slate-200 bg-white px-6 py-4 lg:px-10">
      <Link
        to="/"
        className="flex items-center gap-4 text-slate-900 transition-opacity hover:opacity-80"
      >
        <VentSysLogo />
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          落葉松股份有限公司
        </h2>
      </Link>
      <div className="flex items-center gap-9">
        <nav className="hidden items-center gap-9 md:flex">
          <NavLink to="/products" className={navLinkClass}>
            產品
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            關於我們
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            聯絡我們
          </NavLink>
        </nav>
        <Link
          to="/quote"
          className="flex items-center gap-2 rounded-lg bg-[#2bee2b] px-4 py-2 text-sm font-bold text-slate-900 shadow-sm transition-colors hover:bg-[#1fa81f]"
        >
          <span>產品詢價</span>
        </Link>
      </div>
    </header>
  )
}
