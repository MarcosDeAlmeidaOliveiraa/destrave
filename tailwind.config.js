/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // High-Conversion Premium Palette
        'brand-primary': '#6B21A8', // Deep Rich Purple (Purple 800) - For Authority
        'brand-secondary': '#9333EA', // Vibrant Purple (Purple 600) - For Accents
        'brand-dark': '#3B0764', // Darkest Purple (Purple 900) - For Text/Headers
        'brand-accent': '#F59E0B', // Amber/Gold - For CTAs and urgency (High Contrast)
        'brand-accent-hover': '#D97706', // Darker Gold for hover states
        'move-gray-light': '#1E293B', 
        'move-gray-dark': '#F8FAFC', 
        'move-gold': '#F59E0B', 
        'move-green': '#10B981', 
        'move-beige': '#FAF5FF',
        night: '#2E1065',
        surface: '#FFFFFF',
        accent: '#F59E0B',
        meadow: '#10B981',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #4C1D95 0%, #6B21A8 100%)', // Deep luxury gradient
        'gold-gradient': 'linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)', // For buttons
        'lilac-gradient': 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
        'metallic-purple': 'linear-gradient(145deg, #6B21A8, #4C1D95)',
        'metallic-light': 'linear-gradient(145deg, #FFFFFF, #FAF5FF)',
        'metallic-dark': 'linear-gradient(145deg, #3B0764, #2E1065)',
      },
      boxShadow: {
        'luxury': '0 10px 25px -5px rgba(107, 33, 168, 0.3)',
        'gold-glow': '0 0 20px 2px rgba(245, 158, 11, 0.4)',
        'lilac': '0 4px 14px 0 rgba(107, 33, 168, 0.15)',
        'metallic': 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 2px 8px -2px rgba(0,0,0,0.1)',
        'metallic-hover': 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 3px 10px -2px rgba(0,0,0,0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
