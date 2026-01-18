import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractiveMindmap } from "@/components/ui/interactive-mindmap";
import { TopicChip } from "@/components/ui/topic-chip";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";

interface TopicPageProps {
  params: {
    topic: string;
  };
}

// Sample mindmap data for React
const reactMindmapData = {
  title: "React Ecosystem",
  nodes: [
    {
      id: "central",
      title: "React",
      description: "Component-based library for building user interfaces",
      type: "central" as const,
      position: { x: 400, y: 300 },
      connections: ["hooks", "rendering", "state", "lifecycle"],
    },
    {
      id: "hooks",
      title: "Hooks",
      description: "useState, useEffect, useCallback, useMemo, custom hooks",
      type: "branch" as const,
      position: { x: 200, y: 150 },
      connections: ["central"],
    },
    {
      id: "rendering",
      title: "Rendering",
      description: "Virtual DOM, reconciliation, fiber architecture",
      type: "branch" as const,
      position: { x: 600, y: 150 },
      connections: ["central"],
    },
    {
      id: "state",
      title: "State Management",
      description: "Context API, Redux, Zustand, component state",
      type: "branch" as const,
      position: { x: 200, y: 450 },
      connections: ["central"],
    },
    {
      id: "lifecycle",
      title: "Lifecycle",
      description: "Mount, update, unmount phases and side effects",
      type: "branch" as const,
      position: { x: 600, y: 450 },
      connections: ["central"],
    },
  ],
};

const topicData: Record<string, any> = {
  react: {
    title: "React",
    description: "Master React concepts from basics to advanced patterns for senior frontend interviews",
    icon: "⚛",
    color: "blue",
    difficulty: "intermediate",
    mindmap: reactMindmapData,
    resources: [
      { type: "mindmap", title: "React Rendering Model", id: "react-rendering", difficulty: "advanced" },
      { type: "tree", title: "useCallback Interview Tree", id: "usecallback-tree", difficulty: "medium" },
      { type: "demo", title: "Hook Optimization", id: "hook-optimization", difficulty: "advanced" },
      { type: "mindmap", title: "Component Patterns", id: "component-patterns", difficulty: "intermediate" },
      { type: "tree", title: "State Management Questions", id: "state-management", difficulty: "medium" },
      { type: "demo", title: "Performance Profiling", id: "performance-profiling", difficulty: "advanced" },
    ],
  },
  javascript: {
    title: "JavaScript",
    description: "Core JavaScript concepts, async patterns, and ES6+ features essential for technical interviews",
    icon: "JS",
    color: "yellow",
    difficulty: "beginner",
    mindmap: {
      title: "JavaScript Core",
      nodes: [
        {
          id: "central",
          title: "JavaScript",
          description: "Dynamic programming language for web development",
          type: "central" as const,
          position: { x: 400, y: 300 },
          connections: ["async", "closures", "prototypes", "es6"],
        },
        {
          id: "async",
          title: "Async Programming",
          description: "Promises, async/await, event loop, callbacks",
          type: "branch" as const,
          position: { x: 200, y: 150 },
          connections: ["central"],
        },
        {
          id: "closures",
          title: "Closures",
          description: "Function scope, lexical scoping, memory management",
          type: "branch" as const,
          position: { x: 600, y: 150 },
          connections: ["central"],
        },
        {
          id: "prototypes",
          title: "Prototypes",
          description: "Prototype chain, inheritance, constructor functions",
          type: "branch" as const,
          position: { x: 200, y: 450 },
          connections: ["central"],
        },
        {
          id: "es6",
          title: "ES6+ Features",
          description: "Arrow functions, destructuring, modules, classes",
          type: "branch" as const,
          position: { x: 600, y: 450 },
          connections: ["central"],
        },
      ],
    },
    resources: [
      { type: "mindmap", title: "Event Loop Explained", id: "event-loop", difficulty: "intermediate" },
      { type: "tree", title: "Closure Deep Dive", id: "closures-tree", difficulty: "medium" },
      { type: "demo", title: "Promises vs Async/Await", id: "async-demo", difficulty: "beginner" },
      { type: "mindmap", title: "Prototype Chain", id: "prototype-chain", difficulty: "intermediate" },
    ],
  },
  browser: {
    title: "Browser Internals",
    description: "Understanding how browsers work: rendering pipeline, performance, and optimization",
    icon: "🌐",
    color: "purple",
    difficulty: "advanced",
    mindmap: {
      title: "Browser Architecture",
      nodes: [
        {
          id: "central",
          title: "Browser",
          description: "Multi-process architecture for web rendering",
          type: "central" as const,
          position: { x: 400, y: 300 },
          connections: ["rendering", "js-engine", "networking", "storage"],
        },
        {
          id: "rendering",
          title: "Rendering Pipeline",
          description: "Parse, Style, Layout, Paint, Composite",
          type: "branch" as const,
          position: { x: 200, y: 150 },
          connections: ["central"],
        },
        {
          id: "js-engine",
          title: "JavaScript Engine",
          description: "V8, JIT compilation, garbage collection",
          type: "branch" as const,
          position: { x: 600, y: 150 },
          connections: ["central"],
        },
        {
          id: "networking",
          title: "Networking",
          description: "HTTP, caching, service workers, CDN",
          type: "branch" as const,
          position: { x: 200, y: 450 },
          connections: ["central"],
        },
        {
          id: "storage",
          title: "Storage",
          description: "LocalStorage, IndexedDB, cookies, cache API",
          type: "branch" as const,
          position: { x: 600, y: 450 },
          connections: ["central"],
        },
      ],
    },
    resources: [
      { type: "mindmap", title: "Critical Rendering Path", id: "rendering-path", difficulty: "advanced" },
      { type: "tree", title: "Performance Optimization", id: "perf-optimization", difficulty: "advanced" },
      { type: "demo", title: "Paint & Composite Demo", id: "paint-demo", difficulty: "intermediate" },
    ],
  },
};

export default function TopicPage({ params }: TopicPageProps) {
  const topic = topicData[params.topic];

  if (!topic) {
    notFound();
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "mindmap": return "M";
      case "tree": return "T";
      case "demo": return "D";
      default: return "?";
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case "mindmap": return "bg-primary-500";
      case "tree": return "bg-accent-500";
      case "demo": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 font-inter">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-accent-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/topics" className="hover:text-accent-400 transition-colors">Topics</Link>
          <span>/</span>
          <span className="text-gray-200">{topic.title}</span>
        </nav>

        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-start gap-6 mb-6">
            <div className={`w-16 h-16 bg-${topic.color}-500 rounded-3xl flex items-center justify-center`}>
              <span className="text-white font-bold text-2xl">{topic.icon}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-4xl lg:text-5xl font-bold">{topic.title}</h1>
                <DifficultyBadge level={topic.difficulty} />
              </div>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                {topic.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TopicChip
              label={topic.title}
              category={params.topic as any}
              variant="solid"
            />
            <span className="text-gray-500 text-sm">
              {topic.resources.length} resources available
            </span>
          </div>
        </header>

        {/* Overview Mindmap */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-primary-500 rounded-full mr-3"></div>
            Topic Overview
          </h2>

          <InteractiveMindmap
            data={topic.mindmap}
          />
        </section>

        {/* Learning Resources */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-accent-400 rounded-full mr-3"></div>
            Learning Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topic.resources.map((resource: any, index: number) => (
              <Link
                key={resource.id}
                href={`/${resource.type}/${resource.id}`}
                className="bg-dark-800 rounded-2xl p-6 border border-gray-700 hover:border-primary-500 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-8 h-8 ${getResourceColor(resource.type)} rounded-lg flex items-center justify-center mr-3`}>
                    <span className="text-white text-sm font-semibold">
                      {getResourceIcon(resource.type)}
                    </span>
                  </div>
                  <span className={`text-${resource.type === 'mindmap' ? 'primary' : resource.type === 'tree' ? 'accent' : 'green'}-400 text-sm font-medium uppercase tracking-wide`}>
                    {resource.type}
                  </span>
                  <div className="ml-auto">
                    <DifficultyBadge level={resource.difficulty} size="sm" />
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                  {resource.title}
                </h3>

                <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
                  <span>Click to explore</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { topic: 'react' },
    { topic: 'javascript' },
    { topic: 'browser' },
    { topic: 'performance' },
    { topic: 'system-design' },
    { topic: 'testing' },
  ];
}