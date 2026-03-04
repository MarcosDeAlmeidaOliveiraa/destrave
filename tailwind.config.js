/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Premium & Modern Lilac Palette for Destrave
        'brand-primary': '#8B5CF6', // Medium Purple (Violet 500)
        'brand-secondary': '#A78BFA', // Soft Lilac (Violet 400)
        'brand-dark': '#4C1D95', // Deep Purple (Violet 900)
        'brand-accent': '#DDD6FE', // Very Light Lilac (Violet 200)
        'move-gray-light': '#1E293B', 
        'move-gray-dark': '#F8FAFC', 
        'move-gold': '#F59E0B', 
        'move-green': '#10B981', 
        'move-beige': '#FAF5FF', // Lilac tinted white
        // System Base Colors
        night: '#2E1065', // Deepest Purple
        surface: '#FFFFFF',
        accent: '#8B5CF6',
        meadow: '#10B981',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
        'lilac-gradient': 'linear-gradient(135deg, #FAF5FF 0%, #F5F3FF 100%)',
        'metallic-purple': 'linear-gradient(145deg, #8B5CF6, #6D28D9)',
        'metallic-light': 'linear-gradient(145deg, #FFFFFF, #FAF5FF)',
        'metallic-dark': 'linear-gradient(145deg, #4C1D95, #2E1065)',
      },
      boxShadow: {
        'lilac': '0 4px 14px 0 rgba(139, 92, 246, 0.15)',
        'metallic': 'inset 0 1px 0 0 rgba(255,255,255,0.15), 0 2px 8px -2px rgba(0,0,0,0.1)',
        'metallic-hover': 'inset 0 1px 0 0 rgba(255,255,255,0.2), 0 3px 10px -2px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
