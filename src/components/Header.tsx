import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { BrandMark } from './BrandMark'

const links = [['项目体系', 'system'], ['课题方向', 'builder'], ['能力自查', 'builder'], ['成果延展', 'outcomes'], ['构建我的路径', 'builder']]

export function Header({ onStart }: { onStart: () => void }) {
  const [open, setOpen] = useState(false)
  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setOpen(false) }
  return <header className="site-header">
    <div className="nav-shell">
      <BrandMark />
      <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="主导航">
        {links.map(([label, id]) => <button key={`${label}-${id}`} onClick={() => go(id)}>{label}</button>)}
      </nav>
      <button className="button button--dark nav-cta" onClick={onStart}>构建我的项目路径</button>
      <button className="menu-button" aria-label={open ? '关闭菜单' : '打开菜单'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
  </header>
}
