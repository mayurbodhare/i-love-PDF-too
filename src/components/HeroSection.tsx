import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-neutral-900 min-h-[70vh] flex items-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Left Content */}
          <div className="flex-1 text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your All-in-One Document Management Solution
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Convert, Compress, Organize, and Secure your PDFs with Ease!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/try-now"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 text-center"
              >
                Try It Now
              </a>
              <a
                href="/learn-more"
                className="px-8 py-4 bg-transparent border-2 border-blue-600 text-blue-500 rounded-lg text-lg font-semibold hover:bg-blue-600 hover:text-white transition duration-300 text-center"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1">
            <div className="w-[80vw] sm:w-[75vw] md:w-[70vw] lg:w-full h-[400px] relative overflow-hidden rounded-xl bg-neutral-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
              <div className="animate-[rotateY_20s_linear_infinite] [transform-style:preserve-3d] p-8 [perspective:1000px]">
                <svg className="w-32 h-32 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-neutral-900 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;