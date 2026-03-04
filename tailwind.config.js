/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium & Modern Agency Palette
        'brand-primary': '#4F46E5', // Vibrant Indigo (Indigo 600)
        'brand-secondary': '#06B6D4', // Modern Cyan
        'brand-dark': '#0F172A', // Deep Navy/Slate (Slate 900)
        'brand-accent': '#8B5CF6', // Purple Accent
        'move-gray-light': '#1E293B', // Slate 800 (Text)
        'move-gray-dark': '#F8FAFC', // Slate 50 (Background)
        'move-gold': '#F59E0B', // Warm Amber for accents
        'move-green': '#10B981', // Emerald Success
        'move-beige': '#F1F5F9', 
        // System Base Colors
        night: '#020617', // Very dark slate
        surface: '#FFFFFF',
        accent: '#4F46E5',
        meadow: '#10B981',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%)',
        'metallic-green': 'linear-gradient(145deg, #4F46E5, #3730A3)',
        'metallic-light': 'linear-gradient(145deg, #FFFFFF, #F1F5F9)',
        'metallic-dark': 'linear-gradient(145deg, #F8FAFC, #FFFFFF)',
        'metallic-gold': 'linear-gradient(145deg, #F59E0B, #D97706)',
        'metallic-beige': 'linear-gradient(145deg, #F1F5F9, #E2E8F0)',
      },
      boxShadow: {
        'metallic': 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 2px 8px -2px rgba(0,0,0,0.1)',
        'metallic-hover': 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 3px 10px -2px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
