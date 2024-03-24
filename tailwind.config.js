/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        text: 'var(--text)', // Whiteish text color
        'text-muted': 'var(--text-muted)', // Light gray for muted text
        'text-inverted': 'var(--text-inverted)', // Dark brown for inverted text

        background: 'var(--background)', // Dark brown background color
        'background-alt': 'var(--background-alt)', // Slightly darker alternative background
        'background-overlay': 'var(--background-overlay)', // Semi-transparent overlay for backgrounds

        primary: 'var(--primary)', // Orange primary color
        'primary-dark': 'var(--primary-dark)', // Darker shade of orange
        'primary-light': 'var(--primary-light)', // Lighter shade of orange

        secondary: 'var(--secondary)', // Green secondary color
        'secondary-dark': 'var(--secondary-dark)', // Darker shade of green
        'secondary-light': 'var(--secondary-light)', // Lighter shade of green

        accent: 'var(--accent)', // Bright orange accent color
        'accent-dark': 'var(--accent-dark)', // Darker shade of orange for accent
        'accent-light': 'var(--accent-light)', // Lighter shade of orange for accent

        border: 'var(--border)', // Light gray border color
        'border-dark': 'var(--border-dark)', // Darker shade of gray for borders
        'border-light': 'var(--border-light)', // Lighter shade of gray for borders

        'button-background': 'var(--button-background)', // Default button background color
        'button-text': 'var(--button-text)', // Default button text color
        'button-hover-background': 'var(--button-hover-background)', // Background color on button hover
        'button-hover-text': 'var(--button-hover-text)', // Text color on button hover

        link: 'var(--link)', // Default link color
        'link-hover': 'var(--link-hover)', // Link color on hover

        loading: 'var(--loading)', // Dark olive loading color
        'loading-background': 'var(--loading-background)', // Semi-transparent background for loading indicators

        error: 'var(--error)', // Red color for error messages
        warning: 'var(--warning)', // Orange color for warning messages
        success: 'var(--success)', // Green color for success messages
        info: 'var(--info)', // Blue color for informational messages
      },
    },
  },
  plugins: [],
}

