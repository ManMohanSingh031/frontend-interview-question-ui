"use client";

import { useState, useEffect, useRef } from "react";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setLastUpdated(new Date().toLocaleTimeString());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, lastUpdated };
}

function useThrottle(value: string, limit: number) {
  const [throttledValue, setThrottledValue] = useState(value);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        setLastUpdated(new Date().toLocaleTimeString());
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return { throttledValue, lastUpdated };
}

export function DebounceThrottleDemo() {
  const [inputValue, setInputValue] = useState("");
  const [showCode, setShowCode] = useState(false);

  const { debouncedValue, lastUpdated: debounceTime } = useDebounce(inputValue, 500);
  const { throttledValue, lastUpdated: throttleTime } = useThrottle(inputValue, 300);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-dark-900 border border-gray-800 rounded-xl">
      {/* Explanation */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Debounce vs Throttle</h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          <strong>Debounce:</strong> Waits for pause in activity, then executes once.
          <strong className="ml-4">Throttle:</strong> Executes at regular intervals during activity.
        </p>
      </div>

      {/* Input Section */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Type here to see the difference:
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full px-4 py-3 bg-dark-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
          placeholder="Start typing..."
        />
      </div>

      {/* Output Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Debounce Output */}
        <div className="bg-dark-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-blue-400">Debounce (500ms)</h3>
            {debounceTime && (
              <span className="text-xs text-gray-500 font-mono">{debounceTime}</span>
            )}
          </div>
          <div className="bg-dark-950 border border-gray-600 rounded p-3 min-h-[60px] flex items-center">
            <code className="text-green-400 font-mono text-sm">
              {debouncedValue || "// waiting for pause..."}
            </code>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Updates only after you stop typing for 500ms
          </p>
        </div>

        {/* Throttle Output */}
        <div className="bg-dark-800 border border-gray-700 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-cyan-400">Throttle (300ms)</h3>
            {throttleTime && (
              <span className="text-xs text-gray-500 font-mono">{throttleTime}</span>
            )}
          </div>
          <div className="bg-dark-950 border border-gray-600 rounded p-3 min-h-[60px] flex items-center">
            <code className="text-yellow-400 font-mono text-sm">
              {throttledValue || "// waiting for input..."}
            </code>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Updates at most every 300ms while typing
          </p>
        </div>
      </div>

      {/* Code Toggle */}
      <div className="border-t border-gray-800 pt-6">
        <button
          onClick={() => setShowCode(!showCode)}
          className="flex items-center text-accent-400 hover:text-accent-300 transition-colors text-sm font-medium"
        >
          <svg
            className={`w-4 h-4 mr-2 transition-transform ${showCode ? 'rotate-90' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {showCode ? 'Hide' : 'Show'} Implementation
        </button>

        {showCode && (
          <div className="mt-4 space-y-4">
            {/* Debounce Code */}
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-2">useDebounce Hook</h4>
              <pre className="bg-dark-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}`}</code>
              </pre>
            </div>

            {/* Throttle Code */}
            <div>
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">useThrottle Hook</h4>
              <pre className="bg-dark-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`function useThrottle(value, limit) {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
}`}</code>
              </pre>
            </div>

            {/* Usage Example */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Usage</h4>
              <pre className="bg-dark-950 border border-gray-700 rounded-lg p-4 overflow-x-auto text-sm">
                <code className="text-gray-300">{`// In component
const [input, setInput] = useState('');
const debouncedValue = useDebounce(input, 500);
const throttledValue = useThrottle(input, 300);

// Use cases:
// Debounce: Search API calls, form validation
// Throttle: Scroll events, resize handlers`}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}