import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    // Add additional login options as needed
    // phone: true,
    // social: ['google', 'facebook'],
  },
  // Customize verification methods
  verification: {
    email: {
      required: true,
    },
  },
});
