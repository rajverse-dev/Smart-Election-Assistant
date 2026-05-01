import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to VoteMate AI",
      "voting_guide": "Voting Guide",
      "timeline": "Election Timeline",
      "find_booth": "Find Polling Booth",
      "ask_assistant": "Ask Assistant",
      "document_guide": "Document Guide",
      "home": "Home",
      "dashboard": "Dashboard",
      "simulation": "Mock EVM",
      "language": "Language",
      "theme": "Theme"
    }
  },
  ta: {
    translation: {
      "welcome": "ஸ்மார்ட் தேர்தல் உதவியாளருக்கு வரவேற்கிறோம்",
      "voting_guide": "வாக்களிப்பு வழிகாட்டி",
      "timeline": "தேர்தல் காலவரிசை",
      "find_booth": "வாக்குச்சாவடியைக் கண்டறியவும்",
      "ask_assistant": "உதவியாளரிடம் கேளுங்கள்",
      "document_guide": "ஆவண வழிகாட்டி",
      "home": "முகப்பு",
      "dashboard": "கட்டுப்பாட்டகம்",
      "simulation": "போலி வாக்குப்பதிவு இயந்திரம்",
      "language": "மொழி",
      "theme": "தீம்"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
