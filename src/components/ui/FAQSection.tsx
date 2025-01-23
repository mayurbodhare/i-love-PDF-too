'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Types
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQItemProps {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

// FAQ Item Component
const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onClick }) => {
  return (
    <div className="bg-neutral-50 rounded-xl overflow-hidden animate-fadeIn">
      <button 
        onClick={onClick}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-neutral-100 transition-colors"
      >
        <span className="text-lg font-semibold text-gray-900">{item.question}</span>
        <ChevronDown 
          className={`w-6 h-6 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div 
        className={`px-6 py-4 bg-neutral-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'block animate-fadeIn' : 'hidden'
        }`}
      >
        <p className="text-gray-600">{item.answer}</p>
      </div>
    </div>
  );
};

// Sample FAQ data
const sampleFAQs: FAQItem[] = [
    {
      question: "How secure are my documents?",
      answer: "Your documents are automatically deleted from our servers after processing. We use enterprise-grade encryption and never store your sensitive information."
    },
    {
      question: "What file formats are supported?",
      answer: "We support PDF, Word, Excel, PowerPoint, JPG, PNG, and many other formats. You can convert between these formats seamlessly."
    },
    {
      question: "Can I use the service offline?",
      answer: "Currently, our service requires an internet connection. However, we're working on a desktop application for offline use."
    },
    {
      question: "What's the maximum file size?",
      answer: "Free users can process files up to 10MB, Pro users up to 100MB, and Enterprise users have unlimited file size support."
    }
  ];

// Main FAQ Section Component
const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const title = "Frequently Asked Questions";
  const subtitle = "Have questions? We've got answers.";
  const items = sampleFAQs;
  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600">{subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {items.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};



export default FAQSection;