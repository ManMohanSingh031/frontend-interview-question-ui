"use client";

import { useState, useRef, useCallback, useMemo, memo, useTransition, useDeferredValue } from "react";

// Component that tracks render count
const RenderCounter = ({ name, color = "blue" }: { name: string; color?: string }) => {
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className={`inline-block px-3 py-2 rounded-lg text-sm border-2 font-mono font-semibold ${
      color === 'red' ? 'bg-red-50 border-red-300 text-red-700' :
      color === 'green' ? 'bg-green-50 border-green-300 text-green-700' :
      color === 'blue' ? 'bg-blue-50 border-blue-300 text-blue-700' :
      'bg-gray-50 border-gray-300 text-gray-700'
    }`}>
      {name}: <span suppressHydrationWarning>{renderCount.current}</span> renders
    </div>
  );
};

// Child component to demonstrate prop changes
const ChildComponent = ({ onClick, user, style }: {
  onClick: () => void;
  user: { name: string };
  style: React.CSSProperties;
}) => {
  return (
    <div className="p-3 border border-gray-600 rounded bg-dark-800">
      <RenderCounter name="Child" color="green" />
      <div className="mt-2">
        <p className="text-gray-300">User: {user.name}</p>
        <button
          onClick={onClick}
          style={style}
          className="mt-2 px-3 py-1 text-white rounded hover:opacity-80"
        >
          Child Button
        </button>
      </div>
    </div>
  );
};

// Memoized version of child component
const MemoizedChild = memo(ChildComponent);

export function ReactRerenderDemo() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: "John" });
  const [useMemoization, setUseMemoization] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, startTransition] = useTransition();

  // React 18+ concurrent features demo
  const deferredSearchTerm = useDeferredValue(searchTerm);

  // Example of stable vs unstable references
  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []);

  const unstableHandleClick = () => {
    console.log("Unstable button clicked");
  };

  // Example of memoized vs inline objects
  const memoizedUser = useMemo(() => ({ name: user.name }), [user.name]);
  const memoizedStyle = useMemo(() => ({
    backgroundColor: "#3b82f6",
    color: "white"
  }), []);

  const inlineUser = { name: user.name };
  const inlineStyle = { backgroundColor: "#3b82f6", color: "white" };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-dark-900 border border-gray-800 rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          React Re-render Demo
        </h2>

        <div className="mb-6">
          <RenderCounter name="Parent" color="red" />
        </div>

        {/* Controls */}
        <div className="space-y-4 mb-8">
          <div className="space-y-4">
            <div className="flex gap-4">
              <button
                onClick={() => setCount(c => c + 1)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Increment Count ({count})
              </button>

              <button
                onClick={() => startTransition(() => {
                  setUser({ name: user.name === "John" ? "Jane" : "John" });
                })}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={isPending}
              >
                {isPending ? "Transitioning..." : "Toggle User Name"}
              </button>
            </div>

            <div className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Search (React 18 useDeferredValue demo)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded text-gray-900"
              />
              <span className="text-sm text-gray-600">
                Deferred: "{deferredSearchTerm}" {deferredSearchTerm !== searchTerm && "(lagging)"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={useMemoization}
                onChange={(e) => setUseMemoization(e.target.checked)}
                className="rounded"
              />
              <span>Use Memoization (useMemo + useCallback + React.memo)</span>
            </label>
          </div>
        </div>

        {/* Demonstration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Without Memoization */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-200">
              Without Memoization
            </h3>
            <ChildComponent
              onClick={unstableHandleClick}
              user={inlineUser}
              style={inlineStyle}
            />
          </div>

          {/* With Memoization (conditionally shown) */}
          {useMemoization && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-200">
                With Memoization
              </h3>
              <MemoizedChild
                onClick={handleClick}
                user={memoizedUser}
                style={memoizedStyle}
              />
            </div>
          )}
        </div>

        {/* Explanation Section */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-200">Explanation</h3>
          <div className="text-sm text-gray-300 space-y-4">
            {/* Always show unoptimized explanation */}
            <div>
              <p><strong>❌ Unoptimized Version:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>New function created every render: <code>unstableHandleClick</code></li>
                <li>New object created every render: <code>{'{ name: user.name }'}</code></li>
                <li>New style object every render: <code>{'{ backgroundColor: "..." }'}</code></li>
                <li>Child re-renders on every parent state change</li>
              </ul>
            </div>

            {/* Show optimized explanation when checkbox is checked */}
            {useMemoization && (
              <div>
                <p><strong>✅ Optimized Version:</strong></p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code>React.memo</code> prevents re-renders when props haven't changed</li>
                  <li><code>useCallback</code> creates stable function reference</li>
                  <li><code>useMemo</code> creates stable object references</li>
                  <li>Child only re-renders when user name actually changes</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Key Concepts */}
        <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-xl">
          <h4 className="font-semibold text-yellow-400 mb-2">Key Re-render Triggers:</h4>
          <ul className="text-sm text-yellow-200 space-y-1">
            <li>• <strong>State changes:</strong> useState, useReducer updates</li>
            <li>• <strong>Prop changes:</strong> Parent passes new values</li>
            <li>• <strong>Reference changes:</strong> New objects/functions even with same content</li>
            <li>• <strong>Context updates:</strong> useContext value changes</li>
            <li>• <strong>Parent re-renders:</strong> Unless child is memoized</li>
          </ul>
        </div>

        {/* Interview Tips */}
        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600/30 rounded-xl">
          <h4 className="font-semibold text-blue-400 mb-2">Interview Insights:</h4>
          <ul className="text-sm text-blue-200 space-y-1">
            <li>• **Concurrent rendering still re-renders** - useTransition makes them non-blocking, not fewer</li>
            <li>• **useDeferredValue vs useMemo**: Deferred values lag behind, memoization prevents recalculation</li>
            <li>• **useTransition for expensive updates** - not for every state change, input fields should stay immediate</li>
            <li>• Object.is() comparison used by React for prop changes</li>
            <li>• DevTools Profiler shows time-slicing in concurrent mode</li>
          </ul>
        </div>
      </div>
    </div>
  );
}