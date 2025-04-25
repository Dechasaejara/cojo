import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function CTA() {
  return (
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
  );
}
