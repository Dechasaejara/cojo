import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Master coding through gamified learning
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Learn to code with bite-sized interactive challenges, earn points, compete on leaderboards, and track your progress with our proven methodology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="py-6 text-base">
                  Start Learning for Free
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex items-center text-sm text-gray-500">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center font-medium"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span>Join over 10,000+ developers who've leveled up their skills</span>
            </div>
          </div>

          <div className="flex-shrink-0 w-full max-w-lg">
            <div className="bg-white rounded-xl shadow-xl border p-1">
              <div className="rounded-lg overflow-hidden border">
                <div className="bg-gray-100 px-4 py-2 border-b flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <div className="mx-auto text-sm text-gray-600">CodeDojo Quiz</div>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium mb-2">Fix the bug in the following code:</h3>
                    <div className="bg-gray-800 text-gray-100 p-4 rounded-md font-mono text-sm">
                      <div>function multiplyNumbers(a, b) {'{'}</div>
                      <div className="ml-4 text-red-400">return a - b;</div>
                      <div>{'}'}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <button className="w-full py-3 px-4 border rounded-md text-left hover:bg-gray-50">
                      return a / b;
                    </button>
                    <button className="w-full py-3 px-4 border rounded-md text-left hover:bg-gray-50">
                      return a + b;
                    </button>
                    <button className="w-full py-3 px-4 border border-green-500 bg-green-50 rounded-md text-left">
                      return a * b;
                    </button>
                    <button className="w-full py-3 px-4 border rounded-md text-left hover:bg-gray-50">
                      return a ** b;
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button className="px-6 py-2 bg-green-600 text-white rounded-md font-medium">
                      Submit Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
