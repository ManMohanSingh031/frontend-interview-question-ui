import Link from "next/link";
import { notFound } from "next/navigation";
import { DebounceThrottleDemo } from "@/components/demos/debounce-throttle-demo";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import { TopicChip } from "@/components/ui/topic-chip";
import { CopyButton } from "@/components/ui/copy-button";
import fs from "fs";
import path from "path";

interface DemoPageProps {
  params: {
    id: string;
  };
}

async function getDemoData(id: string) {
  try {
    const filePath = path.join(process.cwd(), "src/data/demos", `${id}.json`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

// Demo components registry
const demoComponents: Record<string, React.ComponentType> = {
  "debounce-throttle": DebounceThrottleDemo,
};

export default async function DemoPage({ params }: DemoPageProps) {
  const demoData = await getDemoData(params.id);

  if (!demoData) {
    notFound();
  }

  const DemoComponent = demoComponents[params.id];

  if (!DemoComponent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 font-inter">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-accent-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/demos" className="hover:text-accent-400 transition-colors">Demos</Link>
          <span>/</span>
          <span className="text-gray-200">{demoData.title}</span>
        </nav>

        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">D</span>
            </div>
            <span className="text-green-400 text-sm font-medium tracking-wide">INTERACTIVE DEMO</span>
          </div>

          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                {demoData.title}
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                {demoData.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <TopicChip
              label={demoData.category}
              category={demoData.category}
              variant="solid"
            />
            <DifficultyBadge level={demoData.difficulty} />
            <span className="text-gray-500 text-sm">
              Interactive demonstration
            </span>
          </div>

          {/* Concept Explanation */}
          <div className="bg-dark-900 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-3 text-accent-400">Core Concept</h2>
            <p className="text-gray-300 leading-relaxed">
              {demoData.concept}
            </p>
          </div>
        </header>

        {/* Interactive Demo */}
        <section className="mb-16">
          <DemoComponent />
        </section>

        {/* Detailed Explanation */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-blue-500 rounded-full mr-3"></div>
            How It Works
          </h2>

          <div className="bg-dark-900 border border-gray-800 rounded-xl p-8">
            <div className="prose prose-invert max-w-none">
              <div
                className="text-gray-300 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{
                  __html: demoData.explanation.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^/, '<p>')
                    .replace(/$/, '</p>')
                }}
              />
            </div>
          </div>
        </section>

        {/* Implementation Details */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-purple-500 rounded-full mr-3"></div>
            Implementation
          </h2>

          <div className="bg-dark-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="bg-dark-950 border-b border-gray-800 px-6 py-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400">React Implementation</span>
                <CopyButton
                  textToCopy={demoData.implementation}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  Copy Code
                </CopyButton>
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <pre className="text-sm text-gray-300">
                <code>{demoData.implementation}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* Variations */}
        {demoData.variations && demoData.variations.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-2 h-6 bg-orange-500 rounded-full mr-3"></div>
              Advanced Variations
            </h2>

            <div className="space-y-6">
              {demoData.variations.map((variation: any, index: number) => (
                <div key={index} className="bg-dark-900 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{variation.name}</h3>
                      <p className="text-gray-400 text-sm">{variation.description}</p>
                    </div>
                    <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${variation.complexity === 'higher' ? 'bg-red-500 text-white' :
                        variation.complexity === 'similar' ? 'bg-yellow-500 text-black' :
                        'bg-green-500 text-white'}
                    `}>
                      {variation.complexity} complexity
                    </span>
                  </div>

                  <div className="bg-dark-950 border border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-dark-800 border-b border-gray-700 px-4 py-2">
                      <span className="text-xs font-medium text-gray-400">Advanced Implementation</span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-300">
                        <code>{variation.code}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Topics */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-accent-400 rounded-full mr-3"></div>
            Related Interview Topics
          </h2>

          <div className="flex flex-wrap gap-3">
            {demoData.relatedTopics.map((topic: string) => (
              <span
                key={topic}
                className="px-4 py-2 bg-dark-800 border border-gray-700 rounded-lg text-gray-300 text-sm hover:border-gray-600 transition-colors"
              >
                {topic}
              </span>
            ))}
          </div>
        </section>

        {/* Interview Questions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-red-500 rounded-full mr-3"></div>
            Common Interview Questions
          </h2>

          <div className="bg-dark-900 border border-gray-800 rounded-xl p-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-red-400 mb-3">❯ "Explain the difference between debounce and throttle"</h3>
                <p className="text-gray-300 text-sm leading-relaxed ml-4">
                  Focus on timing, use cases, and practical examples. Mention that debounce waits for quiet periods
                  while throttle executes at regular intervals.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-red-400 mb-3">❯ "When would you use debouncing in a real application?"</h3>
                <p className="text-gray-300 text-sm leading-relaxed ml-4">
                  API calls, search suggestions, form validation, resize events.
                  Emphasize performance benefits and user experience improvements.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-red-400 mb-3">❯ "Implement a debounce function from scratch"</h3>
                <p className="text-gray-300 text-sm leading-relaxed ml-4">
                  Show understanding of closures, setTimeout, and cleanup.
                  Bonus points for handling edge cases and making it reusable.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-red-400 mb-3">❯ "How does this work with React hooks?"</h3>
                <p className="text-gray-300 text-sm leading-relaxed ml-4">
                  Discuss custom hooks, dependency arrays, cleanup in useEffect,
                  and avoiding stale closures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
            Continue Learning
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/topics/javascript" className="bg-dark-800 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">JS</span>
                </div>
                <span className="text-yellow-400 text-sm font-medium">TOPIC</span>
              </div>
              <h3 className="font-semibold text-gray-200 group-hover:text-yellow-400 transition-colors">
                JavaScript Fundamentals
              </h3>
              <p className="text-gray-400 text-sm mt-2">Dive deeper into JavaScript concepts</p>
            </Link>

            <Link href="/tree/usecallback-tree" className="bg-dark-800 rounded-xl p-6 border border-gray-700 hover:border-accent-500 transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">T</span>
                </div>
                <span className="text-primary-400 text-sm font-medium">QUESTION TREE</span>
              </div>
              <h3 className="font-semibold text-gray-200 group-hover:text-accent-400 transition-colors">
                React Hooks Questions
              </h3>
              <p className="text-gray-400 text-sm mt-2">Practice follow-up questions on hooks</p>
            </Link>

            <Link href="/playbooks/rippling" className="bg-dark-800 rounded-xl p-6 border border-gray-700 hover:border-orange-500 transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">P</span>
                </div>
                <span className="text-orange-400 text-sm font-medium">PLAYBOOK</span>
              </div>
              <h3 className="font-semibold text-gray-200 group-hover:text-orange-400 transition-colors">
                Company Strategies
              </h3>
              <p className="text-gray-400 text-sm mt-2">Learn company-specific patterns</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { id: 'debounce-throttle' },
    { id: 'hook-optimization' },
    { id: 'async-demo' },
    { id: 'performance-profiling' },
    { id: 'paint-demo' },
  ];
}