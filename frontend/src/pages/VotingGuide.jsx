import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  {
    title: "Eligibility Check",
    content: "You must be an Indian citizen, 18 years of age or older on January 1st of the year of revision of electoral roll, and an ordinary resident of the polling area.",
    icon: "👤"
  },
  {
    title: "Voter Registration",
    content: "Apply online via the National Voters' Service Portal (NVSP) or Voter Helpline App using Form 6. You can also apply offline by submitting Form 6 to the Electoral Registration Officer.",
    icon: "📝"
  },
  {
    title: "ID Verification",
    content: "Keep your EPIC (Voter ID) ready. If you don't have it, you can use other approved IDs like Aadhaar, PAN Card, Passport, or Driving License.",
    icon: "🪪"
  },
  {
    title: "Polling Booth Check",
    content: "Check your name in the electoral roll and find your designated polling station online or via SMS. Your booth is usually within 2km of your residence.",
    icon: "📍"
  },
  {
    title: "Voting Day Process",
    content: "1. Polling official checks your name and ID. 2. Second official inks your finger, gives a slip, and takes your signature. 3. Third official takes the slip and allows you to vote on EVM. 4. Press the button against your chosen candidate and verify the VVPAT slip.",
    icon: "🗳️"
  }
];

const VotingGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Voting Guide</h1>
        <p className="text-gray-600 dark:text-gray-400">Follow these steps to ensure a smooth voting experience.</p>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-primary-500 transition-all duration-500 ease-in-out -z-10" 
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 transition-colors duration-300 ${
                index <= currentStep 
                  ? 'bg-primary-500 border-primary-200 text-white dark:border-primary-900' 
                  : 'bg-white border-gray-200 text-gray-400 dark:bg-gray-800 dark:border-gray-700'
              }`}
            >
              {index < currentStep ? <CheckCircle2 className="w-6 h-6" /> : index + 1}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          {steps.map((step, index) => (
            <div key={index} className="text-xs font-medium text-center w-20 text-gray-500 hidden md:block">
              {step.title}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 min-h-[300px] flex flex-col relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-grow flex flex-col items-center justify-center text-center"
          >
            <div className="text-6xl mb-6">{steps[currentStep].icon}</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{steps[currentStep].title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {steps[currentStep].content}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={prevStep}
            aria-label="Previous step"
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 0 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' 
                : 'bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" /> Previous
          </button>
          
          <button
            onClick={nextStep}
            aria-label="Next step"
            disabled={currentStep === steps.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === steps.length - 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500' 
                : 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg'
            }`}
          >
            Next <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingGuide;
