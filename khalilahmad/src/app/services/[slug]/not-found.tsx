import Link from 'next/link';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function ServiceNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <AlertTriangle className="h-16 w-16 text-amber-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
        <p className="text-gray-300 mb-8">
          Sorry, the service you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/#services"
          className="inline-flex items-center gap-2 bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Services
        </Link>
      </div>
    </div>
  );
}
