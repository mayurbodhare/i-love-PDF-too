// types.ts
type PlanFeature = {
  text: string;
};

type PricingPlan = {
  name: string;
  price: number;
  features: PlanFeature[];
  buttonText: string;
  isPopular?: boolean;
  animationClass?: string;
};

// components/CheckIcon.tsx
const CheckIcon: React.FC = () => (
  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
);

// components/PlanFeature.tsx
const PlanFeature: React.FC<PlanFeature> = ({ text }) => (
  <li className="flex items-center text-gray-300">
    <CheckIcon />
    {text}
  </li>
);

// components/PopularBadge.tsx
const PopularBadge: React.FC = () => (
  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
    Most Popular
  </div>
);

// components/GlowBorder.tsx
const GlowBorder: React.FC = () => (
  <div className="absolute inset-[-3px] rounded-2xl z-[-1] bg-gradient-to-r from-blue-600 to-blue-400 animate-pulse opacity-75" />
);

// components/PricingCard.tsx
const PricingCard: React.FC<PricingPlan> = ({
  name,
  price,
  features,
  buttonText,
  isPopular,
  animationClass
}) => (
  <div className={`
    bg-neutral-800 
    rounded-2xl 
    p-8 
    transform 
    hover:-translate-y-2 
    transition-all 
    duration-300 
    ${animationClass}
    relative
    ${isPopular ? 'shadow-lg shadow-blue-500/20' : ''}
  `}>
    {isPopular && (
      <>
        <PopularBadge />
        <GlowBorder />
      </>
    )}
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-4">{name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-white">${price.toFixed(2)}</span>
        <span className="text-gray-400">/month</span>
      </div>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, index) => (
        <PlanFeature key={index} {...feature} />
      ))}
    </ul>
    <button 
      className={`
        w-full 
        py-3 
        px-6 
        rounded-lg 
        bg-blue-600 
        hover:bg-blue-700 
        text-white 
        font-semibold 
        transition 
        duration-300
        ${isPopular ? 'animate-pulse' : ''}
        hover:shadow-lg
        hover:shadow-blue-500/20
      `}
    >
      {buttonText}
    </button>
  </div>
);

// components/PricingSection.tsx
const PricingSection: React.FC = () => {
  const pricingPlans: PricingPlan[] = [
    {
      name: 'Free',
      price: 0,
      features: [
        { text: 'Convert up to 2 files/day' },
        { text: 'Basic compression' },
        { text: 'File size up to 10MB' },
      ],
      buttonText: 'Get Started',
      animationClass: 'animate__animated animate__fadeInLeft'
    },
    {
      name: 'Pro',
      price: 9.99,
      features: [
        { text: 'Unlimited conversions' },
        { text: 'Advanced compression' },
        { text: 'File size up to 100MB' },
        { text: 'OCR Support' },
      ],
      buttonText: 'Try Pro Now',
      isPopular: true,
      animationClass: 'animate__animated animate__fadeInUp'
    },
    {
      name: 'Enterprise',
      price: 29.99,
      features: [
        { text: 'Everything in Pro' },
        { text: 'Priority support' },
        { text: 'Unlimited file size' },
        { text: 'API Access' },
      ],
      buttonText: 'Contact Sales',
      animationClass: 'animate__animated animate__fadeInRight'
    }
  ];

  return (
    <section id="pricing" className="bg-neutral-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate__animated animate__fadeIn">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-300">Choose the perfect plan for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;