// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-4">
      <div className="max-w-6xl mx-auto px-2 sm:px-3">
        <div className="text-xs text-paragraph space-y-1">
          <p>&copy; {currentYear} Construct. All rights reserved.</p>
          <p>
            Powered by{" "}
            <Link 
              href="https://sysfoc.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Sysfoc
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}