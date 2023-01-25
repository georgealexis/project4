import("tailwindcss").Config;
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        1800: "1800px",
        100: "100px",
        1900: "1900px",
      },
      margin: {
        100: "100px",
      },

      height: {
        1605: "1605px",
      },
    },
  },
  plugins: [],
};
