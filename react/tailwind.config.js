const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
    // You are missing this block that defines what files tailwind should scan for usage
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  })