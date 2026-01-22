import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractiveMindmap } from "@/components/ui/interactive-mindmap";
import fs from "fs";
import path from "path";

interface MindmapPageProps {
  params: {
    id: string;
  };
}

async function getMindmapData(id: string) {
  try {
    const filePath = path.join(process.cwd(), "src/data/mindmaps", `${id}.json`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

export default async function MindmapPage({ params }: MindmapPageProps) {
  const mindmapData = await getMindmapData(params.id);

  if (!mindmapData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 font-inter">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-accent-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/topics" className="hover:text-accent-400 transition-colors">Topics</Link>
          <span>/</span>
          <span className="text-gray-200">Mindmap</span>
        </nav>

        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">M</span>
            </div>
            <span className="text-primary-400 text-sm font-medium tracking-wide">MINDMAP</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {mindmapData.title}
          </h1>

          {mindmapData.summary && (
            <div className="bg-dark-900 border border-gray-800 rounded-xl p-6 max-w-4xl">
              <p className="text-gray-300 text-lg leading-relaxed">
                {mindmapData.summary}
              </p>
            </div>
          )}
        </header>

        {/* Mindmap Viewer */}
        <section className="mb-16">
          <InteractiveMindmap
            data={mindmapData}
          />
        </section>

        {/* Key Concepts */}
        {mindmapData.traps && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-2 h-6 bg-red-400 rounded-full mr-3"></div>
              Interview Traps to Avoid
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mindmapData.traps.map((trap: any, index: number) => (
                <div key={index} className="bg-red-900/20 border border-red-700/30 rounded-xl p-6">
                  <div className="flex items-start">
                    <span className="text-red-400 mr-3 mt-1 flex-shrink-0">⚠️</span>
                    <div className="text-gray-300 leading-relaxed">
                      {typeof trap === 'string' ? (
                        <p>{trap}</p>
                      ) : (
                        <div>
                          <p className="font-semibold text-red-300 mb-2">❌ {trap.misconception}</p>
                          <p className="font-semibold text-green-300 mb-2">✅ {trap.correction}</p>
                          <p className="text-sm text-gray-400">{trap.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Follow-up Questions */}
        {mindmapData.followups && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-2 h-6 bg-yellow-400 rounded-full mr-3"></div>
              Common Follow-up Questions
            </h2>
            <div className="space-y-4">
              {mindmapData.followups.map((question: any, index: number) => (
                <div key={index} className="bg-dark-800 border border-gray-700 rounded-xl p-6">
                  <div className="flex items-start">
                    <span className="text-yellow-400 mr-3 mt-1 flex-shrink-0">❓</span>
                    <div className="text-gray-300 leading-relaxed">
                      {typeof question === 'string' ? (
                        <p className="font-medium">{question}</p>
                      ) : (
                        <div>
                          <p className="font-semibold text-white mb-2">{question.question}</p>
                          <p className="text-sm text-gray-400 mb-2">
                            <span className="text-yellow-400">Intent:</span> {question.intent}
                          </p>
                          <p className="text-sm text-gray-400 mb-1">
                            <span className="text-green-400">Good signal:</span> {question.signal}
                          </p>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            question.difficulty === 'hard' ? 'bg-red-500 text-white' :
                            question.difficulty === 'medium' ? 'bg-yellow-500 text-black' :
                            'bg-green-500 text-white'
                          }`}>
                            {question.difficulty}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Use Cases */}
        {mindmapData.usecases && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-2 h-6 bg-green-400 rounded-full mr-3"></div>
              Real-world Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mindmapData.usecases.map((usecase: any, index: number) => (
                <div key={index} className="bg-green-900/20 border border-green-700/30 rounded-xl p-6">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1 flex-shrink-0">💡</span>
                    <div className="text-gray-300 leading-relaxed">
                      {typeof usecase === 'string' ? (
                        <p>{usecase}</p>
                      ) : (
                        <div>
                          <h3 className="font-semibold text-green-300 mb-2">{usecase.title}</h3>
                          <p className="mb-3">{usecase.description}</p>
                          <div className="bg-green-900/30 p-3 rounded-lg">
                            <p className="text-sm text-green-200">
                              <span className="font-medium">Example:</span> {usecase.example}
                            </p>
                          </div>
                          {usecase.complexity && (
                            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                              usecase.complexity === 'high' ? 'bg-red-500 text-white' :
                              usecase.complexity === 'medium' ? 'bg-yellow-500 text-black' :
                              'bg-green-500 text-white'
                            }`}>
                              {usecase.complexity} complexity
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { id: 'react-rendering' },
    { id: 'browser-rendering-pipeline' },
  ];
}