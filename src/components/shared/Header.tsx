'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/store/userStore';

export default function Header() {
  const pathname = usePathname();
  const { streak, totalPoints } = useUserStore();
  const currentStreak = streak?.currentStreak || 0;

  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center">
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
          </Link>

          <nav className="hidden ml-10 space-x-4 md:flex">
            <NavLink href="/dashboard" current={pathname === '/dashboard'}>Dashboard</NavLink>
            <NavLink href="/modules" current={pathname.startsWith('/modules')}>Modules</NavLink>
            <NavLink href="/practice" current={pathname.startsWith('/practice')}>Practice</NavLink>
            <NavLink href="/challenges" current={pathname.startsWith('/challenges')}>Challenges</NavLink>
            <NavLink href="/leaderboard" current={pathname === '/leaderboard'}>Leaderboard</NavLink>
            <NavLink href="/auth/login" current={pathname === '/auth/login'}>Login</NavLink>
            <NavLink href="/auth/signup" current={pathname === '/auth/signup'}>Sign Up</NavLink>
            <NavLink href="/profile" current={pathname === '/profile'}>Profile</NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* Streak indicator */}
          <div className="hidden sm:flex items-center px-2 py-1 bg-amber-50 rounded-full">
            <svg
              width="20"
              height="20"
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
            <span className="ml-1 text-sm font-semibold text-amber-700">{currentStreak}</span>
          </div>

          {/* Points indicator */}
          <div className="hidden sm:flex items-center px-2 py-1 bg-green-50 rounded-full">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-green-500"
            >
              <path
                d="M12 2L14.4 9.09L22 9.9L16.6 15.1L18.18 22.58L12 18.5L5.82 22.58L7.4 15.1L2 9.9L9.6 9.09L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="ml-1 text-sm font-semibold text-green-700">{totalPoints}</span>
          </div>

          {/* Profile menu */}
          <Link href="/profile">
            <Avatar>
              <AvatarImage src="/avatars/user1.png" />
              <AvatarFallback>CD</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  current: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, current, children }) => {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md ${
        current
          ? 'bg-green-50 text-green-700'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );
};
