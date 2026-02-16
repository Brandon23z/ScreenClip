"use client";

import { useState, useEffect } from "react";
import ScreenshotEditor from "@/components/ScreenshotEditor";
import { markAsPaid } from "@/utils/freebie";

export default function Home() {
  const [showEditor, setShowEditor] = useState(false);

  // Handle Stripe success redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === 'true') {
      // Mark user as paid
      markAsPaid();
      
      // Remove query param from URL (clean up)
      window.history.replaceState({}, '', '/');
      
      // Show success message
      alert('🎉 Welcome to AppShot Pro! You now have unlimited exports and no watermark.');
      
      // Reload to update UI
      window.location.reload();
    }
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {!showEditor ? (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          {/* Hero Section */}
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                AppShot Pro
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Transform your screenshots into stunning visuals
              </p>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Add beautiful gradients, device mockups, and professional frames to your screenshots. 
                Perfect for presentations, social media, and portfolios.
              </p>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 mt-12">
              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-lg font-semibold mb-2">Beautiful Templates</h3>
                <p className="text-gray-400 text-sm">Gradients, solids, and custom backgrounds</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-lg font-semibold mb-2">Device Mockups</h3>
                <p className="text-gray-400 text-sm">iPhone, MacBook, and browser frames</p>
              </div>
              <div className="bg-gray-800/50 backdrop-blur p-6 rounded-xl border border-gray-700">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-lg font-semibold mb-2">Instant Export</h3>
                <p className="text-gray-400 text-sm">Download high-quality PNG in one click</p>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() => setShowEditor(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-purple-600 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
            >
              Start Creating Free
            </button>
            
            <p className="text-gray-500 mt-4 text-sm">
              3 free screenshots per month • No credit card required
            </p>
          </div>
        </div>
      ) : (
        <ScreenshotEditor onBack={() => setShowEditor(false)} />
      )}
    </main>
  );
}
