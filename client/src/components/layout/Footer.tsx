import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-(--surface)/95 border-t border-(--border)">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-1.5 mb-4">
              <span className="text-xl font-bold text-foreground tracking-tight">
                DEEP<span className="text-(--primary)">LMS</span>
              </span>
            </Link>
            <p className="text-sm text-(--muted-foreground) leading-relaxed max-w-xs">
              Empowering learners worldwide with cutting-edge educational technology and premium learning experiences.
            </p>
          </div>

          {/* Product Section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Product
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Features
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Pricing
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Integrations
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Changelog
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  About
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Careers
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Blog
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Press Kit
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
              Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Help Center
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-(--muted-foreground) hover:text-foreground transition-colors duration-200 flex items-center gap-1 group">
                  Documentation
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm text-(--muted-foreground)">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span>support@deeplms.com</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-(--muted-foreground)">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span>India, Delhi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-(--border) flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-(--muted-foreground) text-center sm:text-left">
            Copyright &copy; {new Date().getFullYear()} <Link href="/" className="text-(--primary) hover:text-(--primary-hover) transition-colors duration-200 font-medium">DEEP LMS</Link>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <Link href="#" className="text-(--muted-foreground) hover:text-foreground transition-colors duration-200">
              Privacy Policy
            </Link>
            <span className="text-(--border)">|</span>
            <Link href="#" className="text-(--muted-foreground) hover:text-foreground transition-colors duration-200">
              Terms of Service
            </Link>
            <span className="text-(--border)">|</span>
            <Link href="#" className="text-(--muted-foreground) hover:text-foreground transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}