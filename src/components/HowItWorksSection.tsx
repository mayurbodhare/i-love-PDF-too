// types.ts
type StepProps = {
    number: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    animationDelay?: string;
  };
  
  // Step.tsx
  const Step: React.FC<StepProps> = ({ number, title, description, icon, animationDelay }) => {
    return (
      <div 
        className="relative p-8 bg-neutral-800 rounded-xl text-center animate__animated animate__fadeInLeft"
        style={{ animationDelay }}
      >
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-2xl font-bold text-white">
            {number}
          </div>
        </div>
        <div className="mt-8 mb-6">
          <div className="w-20 h-20 mx-auto bg-neutral-700 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    );
  };
  
  // Icons.tsx
  const Icons = {
    Upload: () => (
      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    Settings: () => (
      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    Download: () => (
      <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
  };
  
  // HowItWorks.tsx
  const HowItWorksSection: React.FC = () => {
    const steps = [
      {
        number: 1,
        title: "Upload Your Document",
        description: "Drag and drop your PDF file or click to browse from your device",
        icon: <Icons.Upload />,
        animationDelay: "0s",
      },
      {
        number: 2,
        title: "Choose Your Action",
        description: "Select from our wide range of PDF tools and features",
        icon: <Icons.Settings />,
        animationDelay: "0.2s",
      },
      {
        number: 3,
        title: "Download Result",
        description: "Get your processed PDF file instantly, ready to use",
        icon: <Icons.Download />,
        animationDelay: "0.4s",
      },
    ];
  
    return (
      <section id="howitworks" className="bg-neutral-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate__animated animate__fadeIn">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-300">Three simple steps to manage your PDFs</p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <Step key={step.number} {...step} />
            ))}
          </div>
  
          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105 animate__animated animate__pulse animate__infinite">
              Try It Now - It's Free!
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default HowItWorksSection;