// Copy and form rules for the Login and Track pages.
// Both pages are front-end only for now: there are no customer accounts and no order records to look up.
// Every success message says so plainly, so nobody believes they are logged in or that an order was found.
import { email, phone, required } from "@/utils/validators";

const BROWSE = ["cake", "Browse the menu", "Cakes, desserts, pizza and sandwiches.", "/products"];
const HELP = ["headset", "Talk to our team", "Questions about an order? Send us a message.", "/contact"];

export const LOGIN_PAGE = {
  idPrefix: "lg",
  title: "Login",
  kicker: "Your account",
  heading: "Welcome Back",
  lead: "Log in to see your details and speed up checkout. Accounts are being set up, so for now you can browse the menu and order as a guest.",
  links: [BROWSE, HELP],
  formTitle: "Log in to your account",
  submitLabel: "Log in",
  initial: { email: "", password: "" },
  schema: {
    email: [email({ required: "Enter your email", invalid: "Enter a valid email, like name@example.com" })],
    password: [required("Enter your password")],
  },
  // [field name, label, input props]
  fields: [
    ["email", "Email", { type: "email", autoComplete: "email" }],
    ["password", "Password", { type: "password", autoComplete: "current-password" }],
  ],
  doneTitle: "Login is not available yet",
  doneText: "Customer accounts are not live, so nothing was checked and you are not logged in. You can still browse the menu and order as a guest.",
  doneAction: ["Browse the menu", "/products"],
};

export const TRACK_PAGE = {
  idPrefix: "tr",
  title: "Track Order",
  kicker: "Order status",
  heading: "Track Your Order",
  lead: "Enter your order ID and the phone number used for the order. Live tracking is being set up, so for now our team can tell you where your order is.",
  links: [HELP, BROWSE],
  formTitle: "Find your order",
  submitLabel: "Track order",
  initial: { orderId: "", phone: "" },
  schema: {
    orderId: [required("Enter your order ID")],
    phone: [phone({ required: "Enter the phone number used for the order", invalid: "Enter a valid phone number, like 98765 43210" })],
  },
  fields: [
    ["orderId", "Order ID", { autoComplete: "off" }],
    ["phone", "Phone number", { type: "tel", autoComplete: "tel" }],
  ],
  doneTitle: "Live tracking is not available yet",
  doneText: "We cannot look up orders online yet, so nothing was searched. Please contact our team with your order ID and we will tell you the status.",
  doneAction: ["Contact us", "/contact"],
};
