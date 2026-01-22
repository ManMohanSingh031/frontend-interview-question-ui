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
      { type: "tree", title: "useCallback Interview Tree", id: "usecallback", difficulty: "medium" },
      { type: "tree", title: "useMemo vs useCallback", id: "usememo-vs-usecallback", difficulty: "advanced" },
      { type: "tree", title: "React Concurrent Features", id: "react-concurrent-features", difficulty: "advanced" },
      { type: "demo", title: "React Re-render Demo", id: "react-rerender-demo", difficulty: "intermediate" },
      { type: "demo", title: "Debounce & Throttle", id: "debounce-throttle", difficulty: "intermediate" },
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
      { type: "demo", title: "Debounce & Throttle", id: "debounce-throttle", difficulty: "intermediate" },
    ],
  },
  browser: {
    title: "Browser Internals",
    description: "Understanding how browsers work: rendering pipeline, performance, and optimization",
    icon: "🌐",
    color: "purple",
    difficulty: "advanced",
    mindmap: {
      title: "Browser Rendering Pipeline",
      nodes: [
        {
          id: "central",
          title: "Browser Rendering Pipeline",
          description: "Deep-dive into browser rendering mechanics and performance optimization",
          type: "central" as const,
          position: { x: 400, y: 300 },
          connections: ["parsing", "cssom", "render-tree", "layout", "paint", "composite"],
        },
        {
          id: "parsing",
          title: "HTML Parsing & DOM",
          description: "Tokenization, tree construction, and script blocking behavior",
          type: "branch" as const,
          position: { x: 200, y: 100 },
          connections: ["central"],
        },
        {
          id: "cssom",
          title: "CSS Parsing & CSSOM",
          description: "Render-blocking CSS resolution and selector performance",
          type: "branch" as const,
          position: { x: 600, y: 100 },
          connections: ["central"],
        },
        {
          id: "render-tree",
          title: "Render Tree Construction",
          description: "DOM + CSSOM merge strategy and computed styles",
          type: "branch" as const,
          position: { x: 100, y: 300 },
          connections: ["central"],
        },
        {
          id: "layout",
          title: "Layout (Reflow)",
          description: "Box model calculations and layout thrashing prevention",
          type: "branch" as const,
          position: { x: 700, y: 300 },
          connections: ["central"],
        },
        {
          id: "paint",
          title: "Paint",
          description: "Paint complexity, layer creation, and overdraw analysis",
          type: "branch" as const,
          position: { x: 200, y: 500 },
          connections: ["central"],
        },
        {
          id: "composite",
          title: "Compositing",
          description: "GPU acceleration triggers and layer optimization",
          type: "branch" as const,
          position: { x: 600, y: 500 },
          connections: ["central"],
        },
      ],
    },
    resources: [
      { type: "mindmap", title: "Browser Rendering Pipeline", id: "browser-rendering-pipeline", difficulty: "advanced" },
    ],
  },
  performance: {
    title: "Web Performance",
    description: "Advanced performance optimization techniques, Core Web Vitals, and debugging strategies for senior frontend roles",
    icon: "⚡",
    color: "orange",
    difficulty: "advanced",
    mindmap: {
      title: "Performance Optimization",
      nodes: [
        {
          id: "central",
          title: "Web Performance",
          description: "Optimizing frontend applications for speed and user experience",
          type: "central",
          position: { x: 400, y: 300 },
          connections: ["metrics", "loading", "runtime", "monitoring"],
          color: "#f97316"
        },
        {
          id: "metrics",
          title: "Core Web Vitals",
          description: "LCP, FID, CLS - Google's user-centric performance metrics",
          type: "branch",
          position: { x: 200, y: 180 },
          connections: ["central"],
          color: "#3b82f6"
        },
        {
          id: "loading",
          title: "Loading Performance",
          description: "Bundle optimization, lazy loading, resource prioritization",
          type: "branch",
          position: { x: 600, y: 180 },
          connections: ["central"],
          color: "#10b981"
        },
        {
          id: "runtime",
          title: "Runtime Performance",
          description: "React optimization, memory management, main thread blocking",
          type: "branch",
          position: { x: 200, y: 420 },
          connections: ["central"],
          color: "#8b5cf6"
        },
        {
          id: "monitoring",
          title: "Performance Monitoring",
          description: "Real user monitoring, synthetic testing, DevTools profiling",
          type: "branch",
          position: { x: 600, y: 420 },
          connections: ["central"],
          color: "#ef4444"
        }
      ]
    },
    resources: [
      { type: "mindmap", title: "Browser Rendering Pipeline", id: "browser-rendering-pipeline", difficulty: "advanced" },
      { type: "demo", title: "Debounce & Throttle", id: "debounce-throttle", difficulty: "intermediate" },
    ],
  },
  "system-design": {
    title: "System Design",
    description: "Frontend architecture patterns, scalability solutions, and component design for large-scale applications",
    icon: "🏗",
    color: "indigo",
    difficulty: "advanced",
    mindmap: {
      title: "Frontend System Design",
      nodes: [
        {
          id: "central",
          title: "Frontend System Design",
          description: "Architectural patterns and scalability strategies for large frontend applications",
          type: "central",
          position: { x: 400, y: 300 },
          connections: ["architecture", "state", "routing", "performance", "deployment"],
          color: "#6366f1"
        },
        {
          id: "architecture",
          title: "Architecture Patterns",
          description: "Micro-frontends, component design, module federation",
          type: "branch",
          position: { x: 200, y: 150 },
          connections: ["central"],
          color: "#8b5cf6"
        },
        {
          id: "state",
          title: "State Management",
          description: "Global state, data flow, caching strategies",
          type: "branch",
          position: { x: 600, y: 150 },
          connections: ["central"],
          color: "#3b82f6"
        },
        {
          id: "routing",
          title: "Routing & Navigation",
          description: "Client-side routing, lazy loading, code splitting",
          type: "branch",
          position: { x: 150, y: 450 },
          connections: ["central"],
          color: "#10b981"
        },
        {
          id: "performance",
          title: "Scalability",
          description: "Bundle optimization, CDN, caching, load balancing",
          type: "branch",
          position: { x: 650, y: 450 },
          connections: ["central"],
          color: "#f59e0b"
        },
        {
          id: "deployment",
          title: "Deployment Strategy",
          description: "CI/CD, feature flags, A/B testing, monitoring",
          type: "branch",
          position: { x: 400, y: 500 },
          connections: ["central"],
          color: "#ef4444"
        }
      ]
    },
    resources: [
      { type: "demo", title: "Debounce & Throttle", id: "debounce-throttle", difficulty: "intermediate" },
    ],
  },
  testing: {
    title: "Frontend Testing",
    description: "Unit testing, integration testing, and test-driven development strategies for frontend applications",
    icon: "🧪",
    color: "cyan",
    difficulty: "intermediate",
    mindmap: {
      title: "Frontend Testing Strategy",
      nodes: [
        {
          id: "central",
          title: "Frontend Testing",
          description: "Comprehensive testing strategies for reliable frontend applications",
          type: "central",
          position: { x: 400, y: 300 },
          connections: ["unit", "integration", "e2e", "tools", "practices"],
          color: "#06b6d4"
        },
        {
          id: "unit",
          title: "Unit Testing",
          description: "Component testing, pure function testing, mocking strategies",
          type: "branch",
          position: { x: 200, y: 180 },
          connections: ["central"],
          color: "#3b82f6"
        },
        {
          id: "integration",
          title: "Integration Testing",
          description: "API testing, component integration, user flow testing",
          type: "branch",
          position: { x: 600, y: 180 },
          connections: ["central"],
          color: "#10b981"
        },
        {
          id: "e2e",
          title: "End-to-End Testing",
          description: "Browser automation, user journey testing, cross-browser testing",
          type: "branch",
          position: { x: 200, y: 420 },
          connections: ["central"],
          color: "#8b5cf6"
        },
        {
          id: "tools",
          title: "Testing Tools",
          description: "Jest, React Testing Library, Playwright, Cypress",
          type: "branch",
          position: { x: 600, y: 420 },
          connections: ["central"],
          color: "#f59e0b"
        },
        {
          id: "practices",
          title: "Best Practices",
          description: "TDD, test coverage, CI/CD integration, test maintenance",
          type: "branch",
          position: { x: 400, y: 500 },
          connections: ["central"],
          color: "#ef4444"
        }
      ]
    },
    resources: [
      { type: "demo", title: "Debounce & Throttle", id: "debounce-throttle", difficulty: "intermediate" },
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
                href={`/${resource.type === 'demo' ? 'demos' : resource.type === 'mindmap' ? 'mindmaps' : resource.type}/${resource.id}`}
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