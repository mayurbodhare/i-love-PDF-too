import React from "react";
import { JSX } from "react/jsx-runtime";

// Define the type for feature data
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: JSX.Element;
  bgColor: string;
  animationDelay: string;
}

// Reusable FeatureCard component
const FeatureCard: React.FC<Feature> = ({ title, description, icon, bgColor, animationDelay }) => {
  return (
    <div
      className="p-6 bg-neutral-50 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 animate__animated animate__fadeInUp"
      style={{ animationDelay }}
    >
      <div className={`h-16 w-16 ${bgColor} rounded-lg flex items-center justify-center mb-6`}>{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Main FeaturesSection component
const FeaturesSection: React.FC = () => {
  const features: Feature[] = [
    {
      id: "file-conversion",
      title: "File Conversion",
      description: "Convert PDFs to and from multiple formats including Word, Excel, and PowerPoint",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
        </svg>
      ),
      bgColor: "bg-blue-600",
      animationDelay: "0s",
    },
    {
      id: "compression",
      title: "Smart Compression",
      description: "Reduce file size while maintaining quality for easier sharing and storage",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      ),
      bgColor: "bg-green-600",
      animationDelay: "0.2s",
    },
    {
      id: "merge-split",
      title: "Merge & Split",
      description: "Combine multiple PDFs into one or split large documents into smaller parts",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2"></path>
        </svg>
      ),
      bgColor: "bg-purple-600",
      animationDelay: "0.4s",
    },
    {
      id: "password-protection",
      title: "Password Protection",
      description: "Secure your sensitive documents with strong encryption and password protection",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
      bgColor: "bg-red-600",
      animationDelay: "0.6s",
    },
    {
      id: "ocr",
      title: "OCR Technology",
      description: "Extract text from scanned documents with advanced OCR technology",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      bgColor: "bg-yellow-600",
      animationDelay: "0.8s",
    },
    {
      id: "page-organization",
      title: "Page Organization",
      description: "Rearrange, rotate, and delete pages with intuitive drag-and-drop interface",
      icon: (
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
        </svg>
      ),
      bgColor: "bg-indigo-600",
      animationDelay: "1s",
    },
  ];

  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful PDF Tools at Your Fingertips</h2>
          <p className="text-xl text-gray-600">Everything you need to manage your PDF documents in one place</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.id} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
