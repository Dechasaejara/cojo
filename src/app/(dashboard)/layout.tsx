import React from 'react';
import MainNav from '@/components/shared/MainNav';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 py-6">
        {children}
      </main>
    </div>
  );
}
