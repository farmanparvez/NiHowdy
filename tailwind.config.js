/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        csBG: "#333652",
        csBGSmoke: "#F8F8F8",
        csYellow: "#FAD02C",
        csLight: " #F8F8F8",
        "csTextColor-1": " #313131",
        "csTextColor-2": " #616161",
        "csTextColor-3": "#4599F3",
        "csTextColor-4": "#838383",
        "csTextColor-5": "#333652",
        "csTextColor-6": "#6C6E6E",
        "csTextColor-7": "#FAA300",
        "csTextColor-8": "#33BA28",
        "csTextColor-9": "#555875",
        "csTextColor-10": "#4F4F4F",
      },
      boxShadow: {
        "main-logo-shadow": "0px 0px 3px #Ffff",
        "main-header-bottom-line-shadow": "1px 1px 4px 1px rgba(255, 255, 255, 0.5)",
      },
      fontSize: {
        12: "12px",
        14: "14px",
        16: "16px",
        18: "18px",
        20: "20px",
        24: "24px",
        32: "32px",
        36: "36px",
        40: "40px",
        48: "48px",
      },
    }
  },
  plugins: [],
}
