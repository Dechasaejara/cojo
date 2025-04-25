import React from 'react';
import Header from '../components/shared/Header';
import Hero from '../components/shared/Hero';
import Features from '../components/shared/Features';
import CTA from '../components/shared/CTA';
import Footer from '../components/shared/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
