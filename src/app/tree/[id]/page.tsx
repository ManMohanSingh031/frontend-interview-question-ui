import Link from "next/link";
import { notFound } from "next/navigation";
import { InteractiveTree } from "@/components/ui/interactive-tree";
import fs from "fs";
import path from "path";

interface TreePageProps {
  params: {
    id: string;
  };
}

async function getTreeData(id: string) {
  try {
    const filePath = path.join(process.cwd(), "src/data/trees", `${id}.json`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    return null;
  }
}

// Transform flat tree structure to hierarchical
function transformTreeData(data: any) {
  // Handle both 'branches' and 'questions' data structures
  const items = data.branches || data.questions;
  if (!items) return null;

  const nodeMap = new Map();

  // Create node map
  items.forEach((item: any) => {
    nodeMap.set(item.id, {
      ...item,
      children: []
    });
  });

  // Find root node
  const rootId = data.root || "root" || "q1";
  let rootNode = nodeMap.get(rootId);

  // If no explicit root found, try common root patterns
  if (!rootNode) {
    rootNode = nodeMap.get("root") || nodeMap.get("q1") || items[0];
  }

  if (!rootNode) return null;

  // Connect children to parents
  items.forEach((item: any) => {
    if (item.parent && item.parent !== rootId) {
      const parent = nodeMap.get(item.parent);
      if (parent) {
        parent.children.push(nodeMap.get(item.id));
      }
    } else if (item.parent === rootId) {
      rootNode.children.push(nodeMap.get(item.id));
    } else if (item.followUpIds && item.followUpIds.length > 0) {
      // Handle followUpIds structure (for question-based trees)
      item.followUpIds.forEach((followUpId: string) => {
        const followUp = nodeMap.get(followUpId);
        if (followUp) {
          rootNode.children.push(followUp);
        }
      });
    }
  });

  return {
    title: data.title || `${data.id} Question Tree`,
    description: data.summary || "Interactive interview question tree",
    root: {
      id: rootNode.id,
      question: rootNode.q || rootNode.question,
      intent: rootNode.intent,
      expectedSignal: rootNode.signal || rootNode.expectedSignal,
      type: "root" as const,
      children: rootNode.children.map((child: any) => transformNode(child)),
      metadata: rootNode.metadata
    }
  };
}

function transformNode(node: any): any {
  return {
    id: node.id,
    question: node.q || node.question,
    intent: node.intent,
    expectedSignal: node.signal || node.expectedSignal,
    type: node.children && node.children.length > 0 ? "branch" : "leaf",
    children: node.children ? node.children.map(transformNode) : undefined,
    metadata: node.metadata
  };
}

export default async function TreePage({ params }: TreePageProps) {
  const treeData = await getTreeData(params.id);

  if (!treeData) {
    notFound();
  }

  const transformedData = transformTreeData(treeData);

  if (!transformedData) {
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
          <span className="text-gray-200">Question Tree</span>
        </nav>

        {/* Page Header */}
        <header className="mb-12">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm font-semibold">T</span>
            </div>
            <span className="text-primary-400 text-sm font-medium tracking-wide">QUESTION TREE</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {transformedData.title}
          </h1>

          {transformedData.description && (
            <div className="bg-dark-900 border border-gray-800 rounded-xl p-6 max-w-4xl">
              <p className="text-gray-300 text-lg leading-relaxed">
                {transformedData.description}
              </p>
            </div>
          )}
        </header>

        {/* Tree Viewer */}
        <section className="mb-16">
          <InteractiveTree
            data={transformedData}
            expandAll={false}
          />
        </section>

        {/* Interview Flow Guide */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-accent-400 rounded-full mr-3"></div>
            Interview Flow Guide
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-dark-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-green-400 mb-4">Strong Response Indicators</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  Provides specific examples from experience
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  Explains reasoning behind decisions
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  Considers edge cases and trade-offs
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  Demonstrates deep understanding
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 mt-1">✓</span>
                  Asks clarifying questions
                </li>
              </ul>
            </div>

            <div className="bg-dark-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-yellow-400 mb-4">Follow-up Triggers</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">→</span>
                  Surface-level answer → Dig deeper
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">→</span>
                  Good theory → Ask for practical example
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">→</span>
                  Mentions optimization → Performance branch
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">→</span>
                  Shows expertise → Advanced scenarios
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2 mt-1">→</span>
                  Makes mistake → Guide to correction
                </li>
              </ul>
            </div>

            <div className="bg-dark-900 border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold text-red-400 mb-4">Red Flags</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">✗</span>
                  Cannot explain basic concepts
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">✗</span>
                  No real-world examples
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">✗</span>
                  Memorized answers without understanding
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">✗</span>
                  Cannot handle follow-up questions
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 mt-1">✗</span>
                  Avoids discussing trade-offs
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <div className="w-2 h-6 bg-primary-500 rounded-full mr-3"></div>
            Related Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/topics/react" className="bg-dark-800 rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">M</span>
                </div>
                <span className="text-accent-400 text-sm font-medium">MINDMAP</span>
              </div>
              <h3 className="font-semibold text-gray-200 group-hover:text-primary-400 transition-colors">
                React Rendering Model
              </h3>
              <p className="text-gray-400 text-sm mt-2">Visual explanation of React's rendering process</p>
            </Link>

            <Link href="/demos/debounce-throttle" className="bg-dark-800 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 group">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-semibold">D</span>
                </div>
                <span className="text-green-400 text-sm font-medium">DEMO</span>
              </div>
              <h3 className="font-semibold text-gray-200 group-hover:text-green-400 transition-colors">
                Interactive Demo
              </h3>
              <p className="text-gray-400 text-sm mt-2">Hands-on practice with real examples</p>
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
              <p className="text-gray-400 text-sm mt-2">Interview patterns from top companies</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return [
    { id: 'usecallback' },
    { id: 'usememo-vs-usecallback' },
    { id: 'react-concurrent-features' },
  ];
}