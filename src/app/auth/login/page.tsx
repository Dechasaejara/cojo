import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6">Log In</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="text-green-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
