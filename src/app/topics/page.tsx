import Link from "next/link";
import { TopicChip } from "@/components/ui/topic-chip";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";

export default function TopicsPage() {
  const topics = [
    {
      id: "react",
      title: "React",
      description: "Hooks, performance, patterns, and advanced concepts for senior frontend roles",
      icon: "⚛",
      color: "blue",
      items: 15,
      difficulty: "intermediate" as const,
    },
    {
      id: "javascript",
      title: "JavaScript",
      description: "Core concepts, async patterns, and ES6+ features that matter in interviews",
      icon: "JS",
      color: "yellow",
      items: 20,
      difficulty: "beginner" as const,
    },
    {
      id: "browser",
      title: "Browser Internals",
      description: "Rendering pipeline, performance optimization, and under-the-hood mechanics",
      icon: "🌐",
      color: "purple",
      items: 10,
      difficulty: "advanced" as const,
    },
    {
      id: "performance",
      title: "Performance",
      description: "Optimization techniques, Core Web Vitals, and scalability patterns",
      icon: "⚡",
      color: "green",
      items: 12,
      difficulty: "advanced" as const,
    },
    {
      id: "system-design",
      title: "System Design",
      description: "Frontend architecture, scalability, and component design patterns",
      icon: "🏗",
      color: "indigo",
      items: 8,
      difficulty: "advanced" as const,
    },
    {
      id: "testing",
      title: "Testing",
      description: "Unit, integration, and e2e testing strategies for frontend applications",
      icon: "🧪",
      color: "cyan",
      items: 6,
      difficulty: "intermediate" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 font-inter">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-400 hover:text-accent-400 transition-colors mb-8"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Page Header */}
        <header className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Interview Topics
          </h1>

          <div className="bg-dark-900 border border-gray-800 rounded-xl p-6 max-w-4xl">
            <p className="text-gray-300 text-lg leading-relaxed">
              Master frontend interview concepts through structured learning paths.
              Each topic includes mindmaps, question trees, and interactive demos
              tailored for different experience levels.
            </p>
          </div>
        </header>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="bg-gradient-to-br from-dark-800 to-dark-900 rounded-3xl p-8 border border-gray-700 hover:border-primary-500 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 bg-${topic.color}-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <span className="text-white font-bold text-xl">{topic.icon}</span>
                </div>
                <DifficultyBadge level={topic.difficulty} size="sm" />
              </div>

              <h3 className={`text-2xl font-bold mb-4 group-hover:text-${topic.color}-400 transition-colors`}>
                {topic.title}
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                {topic.description}
              </p>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-accent-400 rounded-full mr-3"></span>
                  {topic.items} Learning Resources
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Mindmaps & Question Trees
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Interactive Demos
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <TopicChip
                  label={topic.title}
                  category={topic.id as any}
                  size="sm"
                  variant="outline"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Coming Soon
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {["TypeScript", "CSS & Styling", "Node.js", "Security"].map((topic) => (
              <div
                key={topic}
                className="bg-dark-800 border border-gray-700 rounded-xl p-6 text-center opacity-60"
              >
                <h3 className="font-semibold text-gray-300 mb-2">{topic}</h3>
                <p className="text-gray-500 text-sm">In Development</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}