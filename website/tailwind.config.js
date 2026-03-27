/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FBF9F4',
        primary: '#031632',
        accent: '#FFBF00',
        secondary: '#f0eee9',
        success: '#94A744',
        danger: '#EC0B43',
        muted: '#E5E7EB',
        faint: '#F3F4F6',
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'body': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'sans': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'chunky': '4px 4px 0px 0px #031632',
        'chunky-lg': '8px 8px 0px 0px #031632',
        'chunky-accent': '4px 4px 0px 0px #FFBF00',
      },
      animation: {
        'led-pulse': 'ledPulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        ledPulse: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 4px #94A744' },
          '50%': { opacity: '0.5', boxShadow: '0 0 12px #94A744' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
