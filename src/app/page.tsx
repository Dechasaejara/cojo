import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b py-4">
        <div className="container px-4 mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <rect width="32" height="32" rx="8" fill="#4ADE80" />
              <path
                d="M10 16.5L14 20.5L22 12.5"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xl font-bold text-gray-900">CodeDojo</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/auth/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero section */}
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

        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">
                Designed for effective learning through play
              </h2>
              <p className="text-gray-600">
                Our platform combines proven learning techniques with gamification elements
                to create an engaging and effective coding education experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {[
                {
                  title: 'Interactive Quizzes',
                  description: 'Learn by doing with hands-on coding challenges, multiple choice questions, and debugging exercises.',
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-green-500"
                    >
                      <path
                        d="M9 5H7C4.79086 5 3 6.79086 3 9V17C3 19.2091 4.79086 21 7 21H17C19.2091 21 21 19.2091 21 17V9C21 6.79086 19.2091 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M12 12H15M12 16H15M9 12H9.01M9 16H9.01"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Points & Streaks',
                  description: 'Earn points for completing challenges and maintain streaks to build consistent learning habits.',
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-amber-500"
                    >
                      <path
                        d="M12 1V4M12 20V23M4.2 4.2L6.3 6.3M17.7 17.7L19.8 19.8M1 12H4M20 12H23M4.2 19.8L6.3 17.7M17.7 6.3L19.8 4.2M12 6C8.7 6 6 8.7 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 8.7 15.3 6 12 6Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  title: 'Badges & Rewards',
                  description: 'Collect badges for achievements and unlock new modules as you progress through your coding journey.',
                  icon: (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-indigo-500"
                    >
                      <path
                        d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 15V23M12 23L7 20M12 23L17 20"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to start your coding journey?</h2>
            <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are improving their skills and advancing their careers with CodeDojo.
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 py-6 px-8 text-base">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 border-t py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <rect width="32" height="32" rx="8" fill="#4ADE80" />
                  <path
                    d="M10 16.5L14 20.5L22 12.5"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl font-bold text-gray-900">CodeDojo</span>
              </div>
              <p className="text-gray-600 max-w-xs">
                Master coding through gamified learning and interactive challenges.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Features</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">For Teams</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Blog</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Help Center</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Careers</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} CodeDojo. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
