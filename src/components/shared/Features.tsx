import React from 'react';

export default function Features() {
  return (
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
  );
}
