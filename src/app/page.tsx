import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white font-inter">
      {/* Hero Section */}
      <section className="relative px-6 py-24 lg:py-32">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            Master Frontend
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-400">
              Interviews
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Structured learning paths with mindmaps, interactive demos, and company-specific playbooks
            for Fresher/SDE-1/SDE-2/SDE-3 frontend engineering roles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/topics">
              <Button className="bg-gradient-to-r from-primary-600 to-accent-500 hover:from-primary-700 hover:to-accent-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                Explore Topics
              </Button>
            </Link>
            <Link href="/playbooks/rippling">
              <Button variant="outline" className="px-8 py-4 text-lg font-semibold rounded-xl">
                View Playbooks
              </Button>
            </Link>
          </div>
        </div>

        {/* Background Tech Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-gray-700"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="px-6 py-16 bg-dark-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/topics/react" className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors">Visual Mindmaps</h3>
              <p className="text-gray-400 leading-relaxed">Structured knowledge graphs for complex frontend concepts</p>
            </Link>

            <Link href="/tree/usecallback" className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent-400 transition-colors">Follow-up Trees</h3>
              <p className="text-gray-400 leading-relaxed">Practice deep-dive questions with branching scenarios</p>
            </Link>

            <Link href="/demos/debounce-throttle" className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-green-400 transition-colors">Interactive Demos</h3>
              <p className="text-gray-400 leading-relaxed">Hands-on coding exercises with real-time feedback</p>
            </Link>

            <Link href="/playbooks/rippling" className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-accent-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-orange-400 transition-colors">Company Playbooks</h3>
              <p className="text-gray-400 leading-relaxed">Targeted strategies for FAANG+ interview patterns</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            Quick Access
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-400 ml-3">
              Learning Paths
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/topics/react" className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">⚛</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">React</h3>
              <p className="text-gray-400 mb-6">Hooks, performance, patterns, and advanced concepts for senior roles</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-accent-400 rounded-full mr-3"></span>
                  15 Mindmaps • 8 Question Trees
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  12 Interactive Demos
                </div>
              </div>
            </Link>

            <Link href="/topics/javascript" className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">JS</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-yellow-400 transition-colors">JavaScript</h3>
              <p className="text-gray-400 mb-6">Core concepts, async patterns, and ES6+ features that matter in interviews</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-accent-400 rounded-full mr-3"></span>
                  20 Mindmaps • 12 Question Trees
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  18 Interactive Demos
                </div>
              </div>
            </Link>

            <Link href="/playbooks/rippling" className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300 group cursor-pointer">
              <div className="w-12 h-12 bg-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-orange-400 transition-colors">Company Guides</h3>
              <p className="text-gray-400 mb-6">Interview processes, patterns, and preparation strategies</p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  5+ Company Playbooks
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Updated Monthly
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">FrontendQuestion</h3>
              <p className="text-gray-400 mb-4 max-w-md">
                The most comprehensive platform for frontend interview preparation,
                built by engineers for engineers.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/topics" className="hover:text-white transition-colors">Topics</Link></li>
                <li><Link href="/tree/usecallback" className="hover:text-white transition-colors">Question Trees</Link></li>
                <li><Link href="/demos/debounce-throttle" className="hover:text-white transition-colors">Interactive Demos</Link></li>
                <li><Link href="/playbooks/rippling" className="hover:text-white transition-colors">Rippling</Link></li>
                <li><Link href="/playbooks/swiggy" className="hover:text-white transition-colors">Swiggy</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Topics</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/topics/react" className="hover:text-white transition-colors">React</Link></li>
                <li><Link href="/topics/javascript" className="hover:text-white transition-colors">JavaScript</Link></li>
                <li><Link href="/topics/browser" className="hover:text-white transition-colors">Browser Internals</Link></li>
                <li><Link href="/topics/performance" className="hover:text-white transition-colors">Performance</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2026 frontendquestion.com. Built for frontend engineers.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}