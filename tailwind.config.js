/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-red-600',
    'bg-green-600',
    'bg-blue-600',
    'bg-zinc-600',
    'bg-slate-600',
    'bg-black',
    'bg-white',
    'hover:bg-zinc-800',
    'hover:bg-zinc-600',
    'hover:bg-red-400',
    'hover:bg-red-300',
  ]
}

