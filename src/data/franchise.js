// Franchise page content and calculator assumptions.
// Everything marked "estimate" or "placeholder" is carried over from the previous site copy or is an illustrative
// default. None of it has been verified against supplied business data: confirm or replace before launch.

import { CATEGORIES, PRODUCTS } from "./products";
import { CITIES } from "./constants";
import donuts from "@/assets/franchise/why-donuts.webp";
import croissant from "@/assets/franchise/why-croissant.webp";
import chefDessert from "@/assets/franchise/why-chef-dessert.webp";
import storefront from "@/assets/franchise/why-storefront.webp";

export const DEMO_FORM = true; // true: the enquiry form is front-end only and nothing is sent anywhere yet

export const SNAPSHOT = [
  { label: "Estimated investment", value: "₹25–60 L", note: "Total setup investment. Varies with shop size, location and fit-out." },
  { label: "Typical shop size", value: "600–1,200 sq ft", note: "We help you check whether a location you have in mind suits the model." },
  { label: "Indicative break-even", value: "18–24 months", note: "Varies with location, footfall and how the store is run." },
  { label: "Indicative return", value: "22–30%", note: "Basis and period to be confirmed by the franchise team." },
];

// Benefits listed in the closing enquiry section (wording carried over from the original page).
export const BENEFITS = [
  ["cake", "Proven menu", "Best-selling cakes, bakes and savouries"],
  ["cap", "Full training", "Recipes, hygiene and store operations"],
  ["megaphone", "Brand & marketing", "Launch campaigns and ready-made creatives"],
  ["box", "Steady supply", "Quality ingredients delivered to your store"],
];

// icon: shown on a cocoa panel beside the step. image: optional photo that replaces the panel (base path without
// size/extension; the page serves -828 and -1280 in avif and webp from /public).
export const STEPS = [
  { image: { src: "/franchise/step-enquiry.webp", alt: "A man browsing franchise information on a tablet at a table" }, title: "Enquiry", text: "Share your details and the city you want to open in.", icon: "form" },
  { image: { src: "/franchise/step-discovery.webp", alt: "A man and a woman reviewing documents together at a marble table" }, title: "Discovery discussion", text: "Our team walks you through the model, costs and what to expect.", icon: "chat" },
  { image: { src: "/franchise/step-location.webp", alt: "A blue map pin standing on a street map" }, title: "Location assessment", text: "We help you evaluate and approve the right shop location.", icon: "pin" },
  { image: { src: "/franchise/step-agreement.webp", alt: "Two business partners shaking hands in a high-rise office at sunset" }, title: "Agreement & planning", text: "Sign the franchise agreement and complete your onboarding.", icon: "doc" },
  { image: { src: "/franchise/step-setup.webp", alt: "Isometric view of a bakery cafe being set up, with staff, a display cabinet and seating" }, title: "Store setup & training", text: "Store fit-out, equipment and hands-on training for you and your team.", icon: "cap" },
  {
    title: "Launch & ongoing support",
    text: "Open with our marketing support, and we stay by your side after.",
    icon: "store",
    image: {
      base: "/franchise/storefront",
      alt: "A Brunch Bakers storefront with a cream awning and an open shopfront filled with cakes",
      position: "45% 40%",
    },
  },
];

export const SUPPORT = [
  ["cap", "Training & onboarding", "Recipes, baking standards, food safety and day-to-day store management."],
  ["layout", "Store design & branding", "Layout guidance, signage and packaging so every outlet looks like Brunch Bakers."],
  ["box", "Ingredients & supply", "Reliable supply of quality ingredients and packaging, with consistent standards."],
  ["megaphone", "Marketing & launch", "Opening campaigns, offers, social media content and local promotion ideas."],
  ["monitor", "Billing & online ordering", "Help setting up billing and getting your store onto delivery and ordering channels."],
  ["headset", "Ongoing support", "A point of contact for questions, new menu launches and operational help."],
];

// Answers reuse the wording already on the site. Fees, supply terms and agreement terms have no confirmed figures,
// so those answers say where the details are shared instead of stating any.
export const FAQS = [
  ["How much investment is needed to open a store?", "The total investment typically ranges from ₹25–60 lakh, depending on shop size, location and fit-out. Partners usually reach break-even in about 18–24 months, though this is an indicative estimate and varies with location, footfall and how the store is run. Our team shares a detailed cost breakup in the discovery discussion."],
  ["What shop size and location do I need?", "Most of our stores are between 600 and 1,200 sq ft. If you already have a location in mind, we will help you check whether it suits the model."],
  ["Are there recurring fees?", "Ongoing fees and commercial terms are not published on this page. Our franchise team shares them in the discovery discussion, before you sign anything."],
  ["Do I need prior experience, and what training is provided?", "No food background is needed. We provide training on recipes, baking standards, food safety and store operations."],
  ["Will you help me find and approve a location?", "Yes. Our team reviews your proposed shop and helps you evaluate footfall, visibility and accessibility before you sign anything."],
  ["How does supply work?", "We support a reliable supply of quality ingredients and packaging with consistent standards. Specific supply terms are shared in the discovery discussion."],
  ["What does the franchise agreement cover?", "The franchise agreement is signed after the location assessment, and the team goes through its terms with you first. Specific terms are shared during the discovery discussion rather than listed here."],
  ["How long does it take to open?", "From your first enquiry to launch, the timeline depends mainly on finding the location and the store fit-out. We will give you a clear schedule in the discovery discussion."],
];

// Calculator. PLACEHOLDER assumptions: replace with business-confirmed figures.
// Setup cost per sq ft is chosen so the result stays inside the ₹25–60 L range shown on the page
// (600 sq ft x Tier-3 = ₹25.2 L, 1,200 sq ft x Metro = ₹60 L). Revenue per sq ft and operating cost % are round-number placeholders.
export const CALC = {
  sizeMin: 600, sizeMax: 1200, sizeStep: 50, sizeDefault: 900,
  cityDefault: "tier2",
  opexPct: 75,
  cityTypes: [
    { id: "metro", label: "Metro", costPerSqft: 5000, revenuePerSqft: 900 },
    { id: "tier2", label: "Tier-2 city", costPerSqft: 4500, revenuePerSqft: 800 },
    { id: "tier3", label: "Tier-3 city", costPerSqft: 4200, revenuePerSqft: 700 },
  ],
};

// "Why Brunch Bakers" (franchise page). Only figures that already live in the site data are shown, so nothing is invented.
export const WHY_STATS = [
  [String(CITIES.length), "cities across India"],
  [`${PRODUCTS.length}+`, `items on the menu, in ${CATEGORIES.length} categories`],
  ["100%", "pure veg, baked fresh every day"],
  ["2017", "the first Brunch Bakers kitchen opens in Jamshedpur"],
];

// Four image cards under the figures. `pos` is the CSS object-position crop. Wording is descriptive only:
// no awards, rankings or reviews are claimed.
export const WHY_HIGHLIGHTS = [
  { img: donuts, pos: "50% 50%", title: "Crafted to delight", text: "Rich, indulgent bakes made with care, from chocolate-glazed treats to everyday favourites." },
  { img: croissant, pos: "50% 50%", title: "Baked fresh, every day", text: "Flaky, golden pastries and a menu built around freshness and quality." },
  { img: chefDessert, pos: "50% 50%", title: "Built by skilled hands", text: "A bakery run on craft and consistency, so every outlet delivers the same taste." },
  { img: storefront, pos: "50% 50%", title: "Ready for your city", text: "A warm, modern pure veg bakery format designed to feel welcoming from day one." },
];
