import Link from "next/link";

const SHOP = ["All Products", "New Arrivals", "Bestsellers", "Gift Sets"];
const BRAND = [
  { label: "Our Story", href: "/about" },
  { label: "Ingredients", href: "/about" },
  { label: "Sustainability", href: "/about" },
  { label: "Press", href: "/contact" },
];
const CONTACT = [
  { label: "Get in Touch", href: "/contact" },
  { label: "My Account", href: "/account" },
];

const linkStyle = { color: "rgba(255,255,255,0.45)" };
const headStyle = { color: "rgba(255,255,255,0.7)" };

export default function Footer() {
  return (
    <footer style={{ background: "#040806", color: "rgba(255,255,255,0.45)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <div className="font-serif text-2xl mb-3" style={{ color: "rgba(255,255,255,0.88)" }}>
              Zuhoor <em style={{ color: "#c9a84c", fontStyle: "normal" }}>Blossoms</em>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-4">
              Luxury bodywash rooted in Arabic botanical tradition. Crafted for skin that deserves the finest.
            </p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Mumbai, India</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>zuhoorblossoms@gmail.com</p>
            <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>+91 81691 66237</p>
            <a
              href="https://instagram.com/zuhoorblossoms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs mt-2 inline-block transition-colors duration-200 hover:opacity-80"
              style={{ color: "#c9a84c" }}
            >
              @zuhoorblossoms
            </a>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[2px] font-medium mb-4" style={headStyle}>Shop</h4>
            <ul className="space-y-2 text-sm">
              {SHOP.map((l) => (
                <li key={l}>
                  <Link href="/products" className="transition-colors duration-200 hover:opacity-80" style={linkStyle}>{l}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[2px] font-medium mb-4" style={headStyle}>Brand</h4>
            <ul className="space-y-2 text-sm">
              {BRAND.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors duration-200 hover:opacity-80" style={linkStyle}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[2px] font-medium mb-4" style={headStyle}>Contact</h4>
            <ul className="space-y-2 text-sm">
              {CONTACT.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors duration-200 hover:opacity-80" style={linkStyle}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.25)" }}
        >
          <span>© 2025 Zuhoor Blossoms. All rights reserved. · Mumbai, India</span>
        </div>
      </div>
    </footer>
  );
}
