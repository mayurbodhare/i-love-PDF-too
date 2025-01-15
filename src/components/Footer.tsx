'use client';
import React, { useState } from 'react';
import { Facebook, Twitter, Linkedin } from 'lucide-react';
import { JSX } from 'react/jsx-runtime';

// Types
interface FooterLink {
  text: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: JSX.Element;
  href: string;
  ariaLabel: string;
}

// Configuration
const socialLinks: SocialLink[] = [
  {
    icon: <Facebook className="w-6 h-6" />,
    href: "#",
    ariaLabel: "Visit our Facebook page"
  },
  {
    icon: <Twitter className="w-6 h-6" />,
    href: "#",
    ariaLabel: "Follow us on Twitter"
  },
  {
    icon: <Linkedin className="w-6 h-6" />,
    href: "#",
    ariaLabel: "Connect with us on LinkedIn"
  }
];

const footerSections: FooterSection[] = [
  {
    title: "Quick Links",
    links: [
      { text: "Features", href: "#features" },
      { text: "Pricing", href: "#pricing" },
      { text: "Testimonials", href: "#testimonials" },
      { text: "FAQ", href: "#faq" }
    ]
  },
  {
    title: "Legal",
    links: [
      { text: "Privacy Policy", href: "#" },
      { text: "Terms of Service", href: "#" },
      { text: "Cookie Policy", href: "#" },
      { text: "GDPR Compliance", href: "#" }
    ]
  }
];

// Reusable Components
const SocialIcon: React.FC<{ link: SocialLink }> = ({ link }) => (
  <a 
    href={link.href}
    aria-label={link.ariaLabel}
    className="text-gray-400 hover:text-blue-500 transition duration-300"
  >
    {link.icon}
  </a>
);

const FooterLinkList: React.FC<{ section: FooterSection; delay: string }> = ({ section, delay }) => (
  <div className="animate__animated animate__fadeIn" style={{ animationDelay: delay }}>
    <h3 className="text-lg font-semibold text-white mb-6">{section.title}</h3>
    <ul className="space-y-4">
      {section.links.map((link, index) => (
        <li key={index}>
          <a 
            href={link.href}
            className="text-gray-400 hover:text-blue-500 transition duration-300"
          >
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      // Here you would typically send the email to your backend
      console.log('Subscribed:', email);
      
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 2000);
    }
  };

  return (
    <div className="animate__animated animate__fadeIn" style={{ animationDelay: "0.6s" }}>
      <h3 className="text-lg font-semibold text-white mb-6">Stay in the Loop!</h3>
      <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and tips.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-blue-500 transition duration-300"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isSubscribed ? 'Subscribed!' : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Footer Component
const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-neutral-900 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="animate__animated animate__fadeIn">
            <h3 className="text-2xl font-bold text-white mb-6">i-Love-PDF-too</h3>
            <p className="text-gray-400 mb-6">
              Your all-in-one PDF solution for managing, converting, and securing documents online.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <SocialIcon key={index} link={link} />
              ))}
            </div>
          </div>

          {/* Quick Links and Legal Sections */}
          {footerSections.map((section, index) => (
            <FooterLinkList 
              key={section.title}
              section={section}
              delay={`${(index + 1) * 0.2}s`}
            />
          ))}

          {/* Newsletter Section */}
          <Newsletter />
        </div>

        {/* Copyright */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="text-center text-gray-400">
            <p>© {new Date().getFullYear()} i-Love-PDF-too. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;