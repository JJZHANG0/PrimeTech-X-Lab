export function BrandMark({ light = false }: { light?: boolean }) {
  return <a className={`brand-mark ${light ? 'brand-mark--light' : ''}`} href="#top" aria-label="PrimeTech X Lab 首页"><span>PrimeTech</span><b>X</b><span>Lab</span></a>
}
