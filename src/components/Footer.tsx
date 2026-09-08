import { ArrowUp } from 'lucide-react'
import { BrandMark } from './BrandMark'

export function Footer() {
  return <footer className="footer"><div className="footer-main"><div><BrandMark light /><h2>让好奇心成为课题，<br />让课题生长为成果。</h2><p>Build Skills. Develop Ideas. Create Evidence.</p></div><div className="footer-nav"><span>EXPLORE</span><a href="#system">项目体系</a><a href="#builder">课题方向</a><a href="#builder">能力自查</a><a href="#outcomes">成果验证</a><a href="#faq">常见问题</a></div><div className="footer-contact"><span>CONTACT</span><p>项目顾问 · 联系方式待配置</p><p>企业微信 · 二维码待配置</p><p>品牌公众号 · 待配置</p></div><a className="back-top" href="#top" aria-label="返回顶部"><ArrowUp /></a></div><div className="footer-bottom"><span>© 2026 PrimeTech X Lab</span><p>本网站提供的能力评估与项目匹配结果仅作为成长路径参考，不构成竞赛结果、升学录取或项目成果承诺。</p></div></footer>
}
