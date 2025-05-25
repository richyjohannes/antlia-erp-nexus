
import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-600">
          © {currentYear} Antlia ERP. All rights reserved. | Powered by{' '}
          <span className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-middle)] bg-clip-text text-transparent font-semibold">
            Antlia Technology
          </span>
        </div>
      </div>
    </footer>
  );
}
