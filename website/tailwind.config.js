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
        // Accessible text variants for use on light (#FBF9F4) backgrounds
        'primary-sub': '#3A4D65',    // secondary text — 8.2:1 contrast
        'primary-muted': '#5E6E8A',  // tertiary/muted text — 4.9:1 contrast
        'accent-text': '#7A5500',    // accent text on light bg — 6.4:1 contrast
        'success-text': '#4A6A00',   // success text on light bg — 5.9:1 contrast
        'danger-text': '#C8003A',    // danger text on light bg — 5.7:1 contrast
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
