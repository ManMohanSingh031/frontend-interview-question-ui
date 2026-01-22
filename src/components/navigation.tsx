"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + "/");

  return (
    <nav className="bg-dark-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-400 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-white text-xl font-bold">FrontendQuestion</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/topics"
              className={`text-sm font-medium transition-colors ${
                isActive("/topics")
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Topics
            </Link>
            <Link
              href="/tree/usecallback"
              className={`text-sm font-medium transition-colors ${
                isActive("/tree")
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Question Trees
            </Link>
            <Link
              href="/demos/debounce-throttle"
              className={`text-sm font-medium transition-colors ${
                isActive("/demos")
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Demos
            </Link>
            <Link
              href="/playbooks/rippling"
              className={`text-sm font-medium transition-colors ${
                isActive("/playbooks")
                  ? "text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Playbooks
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}