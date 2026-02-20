import React, { ReactNode } from "react";

interface BaseLayoutProps {
  children: ReactNode;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Studio Ghibli Collection</h1>
          <nav></nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-6">
        {children}
      </main>

      <footer className="bg-white shadow-inner p-4 text-center text-sm text-gray-500">
        &copy; 2026 Studio Ghibli App
      </footer>
    </div>
  );
};