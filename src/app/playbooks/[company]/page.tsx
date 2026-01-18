import Link from "next/link";
import { notFound } from "next/navigation";
import { CompanyPlaybookCard } from "@/components/ui/company-playbook-card";
import { TopicChip } from "@/components/ui/topic-chip";
import { DifficultyBadge } from "@/components/ui/difficulty-badge";
import fs from "fs";
import path from "path";

interface PlaybookPageProps {
  params: {
    company: string;
  };
}

async function getPlaybookData(company: string) {
  try {
    const filePath = path.join(process.cwd(), "src/data/playbooks", `${company}.json`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

export default async function PlaybookPage({ params }: PlaybookPageProps) {
  const playbookData = await getPlaybookData(params.company);

  if (!playbookData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-dark-950 text-gray-100 font-inter">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-accent-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/playbooks" className="hover:text-accent-400 transition-colors">Playbooks</Link>
          <span>/</span>
          <span className="text-gray-200">{playbookData.company}</span>
        </nav>

        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">P</span>
            </div>
            <span className="text-orange-400 text-sm font-medium tracking-wide">COMPANY PLAYBOOK</span>
          </div>

          <div className="flex items-start gap-6 mb-6">
            {playbookData.logo ? (
              <img
                src={playbookData.logo}
                alt={`${playbookData.company} logo`}
                className="w-16 h-16 rounded-xl"
              />
            ) : (
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-400 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {playbookData.company.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl lg:text-5xl font-bold mb-3">
                {playbookData.company} Frontend Guide
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
                {playbookData.summary}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">
              Updated {new Date(playbookData.lastUpdated).toLocaleDateString()}
            </span>
            <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
            <span className="text-gray-500 text-sm">
              {playbookData.levels.length} role levels • {playbookData.rounds.length} interview rounds
            </span>
          </div>
        </header>

        <div className="space-y-16">
          {/* Role Levels */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <div className="w-2 h-8 bg-primary-500 rounded-full mr-4"></div>
              Role Levels & Expectations
            </h2>

            <div className="space-y-6">
              {playbookData.levels.map((level: any) => (
                <div key={level.id} className="bg-dark-900 border border-gray-800 rounded-xl p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg
                        ${level.level === 'L3' ? 'bg-green-500' :
                          level.level === 'L4' ? 'bg-blue-500' :
                          'bg-purple-500'}
                      `}>
                        {level.level}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{level.title}</h3>
                        <p className="text-gray-400">{level.experience} experience</p>
                      </div>
                    </div>
                    {level.salary && (
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-400">{level.salary}</p>
                        <p className="text-gray-500 text-sm">Total compensation</p>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-4">Technical Focus</h4>
                      <ul className="space-y-2">
                        {level.focus.map((item: string, index: number) => (
                          <li key={index} className="flex items-start text-gray-300 text-sm">
                            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full mr-3 mt-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-200 mb-4">Role Expectations</h4>
                      <ul className="space-y-2">
                        {level.expectations.map((item: string, index: number) => (
                          <li key={index} className="flex items-start text-gray-300 text-sm">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 mt-2"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Interview Rounds */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <div className="w-2 h-8 bg-yellow-500 rounded-full mr-4"></div>
              Interview Process
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {playbookData.rounds.map((round: any, index: number) => (
                <div key={round.name} className="bg-dark-900 border border-gray-800 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                      <h3 className="font-bold text-xl text-white">{round.name}</h3>
                    </div>
                    <DifficultyBadge level={round.difficulty} size="sm" />
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <span>⏱ {round.duration}</span>
                      <span>📋 {round.format.replace('-', ' ')}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {round.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-200 mb-2 text-sm">Preparation Focus:</h4>
                    <ul className="space-y-1">
                      {round.preparation.map((item: string, prepIndex: number) => (
                        <li key={prepIndex} className="text-xs text-gray-400 flex items-start">
                          <span className="w-1 h-1 bg-accent-400 rounded-full mr-2 mt-1.5"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Topic Patterns */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <div className="w-2 h-8 bg-red-500 rounded-full mr-4"></div>
              Common Question Patterns
            </h2>

            <div className="space-y-8">
              {playbookData.patterns.map((pattern: any) => (
                <div key={pattern.category} className="bg-dark-900 border border-gray-800 rounded-xl p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <TopicChip
                        label={pattern.category}
                        category={pattern.category}
                        variant="solid"
                      />
                      <span className={`
                        px-3 py-1 rounded-full text-xs font-medium
                        ${pattern.frequency === 'high' ? 'bg-red-500 text-white' :
                          pattern.frequency === 'medium' ? 'bg-yellow-500 text-black' :
                          'bg-gray-500 text-white'}
                      `}>
                        {pattern.frequency} frequency
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-4">Common Questions</h4>
                      <ul className="space-y-2 text-sm">
                        {pattern.questions.map((question: string, qIndex: number) => (
                          <li key={qIndex} className="text-gray-300 flex items-start">
                            <span className="text-red-400 mr-2 mt-1">❯</span>
                            "{question}"
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-200 mb-4">Example Scenarios</h4>
                      <ul className="space-y-2 text-sm">
                        {pattern.examples.map((example: string, eIndex: number) => (
                          <li key={eIndex} className="text-gray-300 flex items-start">
                            <span className="text-blue-400 mr-2 mt-1">▸</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-200 mb-4">Strong Signals</h4>
                      <ul className="space-y-2 text-sm">
                        {pattern.signals.map((signal: string, sIndex: number) => (
                          <li key={sIndex} className="text-gray-300 flex items-start">
                            <span className="text-green-400 mr-2 mt-1">✓</span>
                            {signal}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Preparation Strategy */}
          <section>
            <h2 className="text-3xl font-bold mb-8 flex items-center">
              <div className="w-2 h-8 bg-orange-500 rounded-full mr-4"></div>
              Preparation Timeline
            </h2>

            <div className="space-y-8">
              {playbookData.prep.map((phase: any) => (
                <div key={phase.phase} className="bg-dark-900 border border-gray-800 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center font-bold
                      ${phase.phase === 'week-before' ? 'bg-orange-500' :
                        phase.phase === 'day-before' ? 'bg-yellow-500' :
                        'bg-green-500'}
                    `}>
                      {phase.phase === 'week-before' ? '1W' :
                       phase.phase === 'day-before' ? '1D' : '0D'}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{phase.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {phase.tasks.map((task: any, taskIndex: number) => (
                      <div
                        key={taskIndex}
                        className={`
                          p-4 rounded-lg border-l-4
                          ${task.priority === 'high' ? 'bg-red-900/20 border-red-400' :
                            task.priority === 'medium' ? 'bg-yellow-900/20 border-yellow-400' :
                            'bg-gray-800 border-gray-600'}
                        `}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium text-gray-200 leading-tight">{task.task}</h4>
                          <span className={`
                            text-xs px-2 py-1 rounded
                            ${task.priority === 'high' ? 'bg-red-500 text-white' :
                              task.priority === 'medium' ? 'bg-yellow-500 text-black' :
                              'bg-gray-600 text-white'}
                          `}>
                            {task.priority}
                          </span>
                        </div>

                        <div className="text-sm text-gray-400 mb-3">
                          ⏱ {task.timeRequired}
                        </div>

                        {task.resources && (
                          <div>
                            <h5 className="text-xs font-medium text-gray-300 mb-2">Resources:</h5>
                            <ul className="space-y-1">
                              {task.resources.map((resource: string, rIndex: number) => (
                                <li key={rIndex} className="text-xs text-gray-400 flex items-start">
                                  <span className="w-1 h-1 bg-accent-400 rounded-full mr-2 mt-1.5"></span>
                                  {resource}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-900/50 to-accent-900/50 border border-primary-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Practice?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Put your knowledge to the test with interactive demos and question trees
              based on real {playbookData.company} interview patterns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/topics/react"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                Practice React Questions
              </Link>
              <Link
                href="/tree/usecallback-tree"
                className="px-6 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Question Trees
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { company: 'rippling' },
    { company: 'meta' },
    { company: 'google' },
    { company: 'netflix' },
    { company: 'airbnb' },
  ];
}