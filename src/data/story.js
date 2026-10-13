// Content for the Our Story page: the timeline, brand pillars, key figures, map pins and the "How a bake is born" steps.
// Copy and image choices live here so the components only deal with layout and behaviour.
import { CATEGORIES, PRODUCTS } from "./products";
import { CITIES } from "./constants";

import firstBakery from "@/assets/story/2017-first-bakery.webp";
import storefront2020 from "@/assets/story/2020-storefront.webp";
import qutub2021 from "@/assets/story/2021-qutub-minar.webp";
import brownie2021 from "@/assets/story/2021-brownie-stack.webp";
import cake2021 from "@/assets/story/2021-chocolate-cake.webp";
import spread2021 from "@/assets/story/2021-brand-spread.webp";
import rebar2023 from "@/assets/story/2023-rebar-floor.webp";
import card2023 from "@/assets/story/2023-brand-card.webp";
import logo2023 from "@/assets/story/2023-logo.webp";
import interior2023 from "@/assets/story/2023-store-interior.webp";
import storefront2025 from "@/assets/story/2025-storefront.webp";
import cookies2025 from "@/assets/story/2025-cookies.webp";
import counter2026 from "@/assets/story/2026-store-counter.webp";
import cake2026 from "@/assets/story/2026-black-forest.webp";
import idea from "@/assets/story/process-idea-cake.webp";
import trials from "@/assets/story/process-trials-frosting.webp";
import finish from "@/assets/story/process-finish-chef.webp";
import series from "@/assets/story/process-series-cupcakes.webp";

const SIGNATURE = import.meta.glob("../assets/signature/*.webp", { eager: true, import: "default" });

// The photo beside the map ("One bakery. One city.").
export const ROAD_PHOTO = {
  src: SIGNATURE["../assets/signature/cakes.webp"],
  alt: "A selection of Brunch Bakers cakes",
};

/*
  OUR STORY TIMELINE
  ------------------
  Each step has a `pics` list. Leave an entry as `null` for an empty placeholder tile, or drop in
  an imported image: [image, "Alt text"] (import the file at the top of this module).
  2017 is one wide photo (add a third item "wide" to span both columns; "land" spans both columns at 3:2 for landscape photos, as in 2020; "sq" is a square tile; "r43" is a 4:3 tile, add "fit" ("r43 fit") to show the whole image on white; an optional fourth item sets the crop, e.g. "40% 50%"), 2020 uses 2 tiles, 2021-22 and 2023-24 use 4 (2x2), 2025 and 2026 use 2. "Today" has none.
*/
export const MILESTONES = [
  {
    year: "2017",
    title: "It all begins at Jamshedpur",
    text: [
      "The first Brunch Bakers kitchen opens its doors in Jamshedpur.",
      "From day one, everything is baked fresh with honest ingredients. The classics we started with are still here today.",
    ],
    pics: [[firstBakery, "The first Brunch Bakers bakery in Jamshedpur, 2017", "wide"]],
  },
  {
    year: "2020",
    title: "Thinking bigger",
    text: [
      "A small kitchen starts to dream bigger. The menu grows, and so does the ambition.",
      "Brunch Bakers is no longer just a neighbourhood bakery: the brand states a new ambition.",
    ],
    pics: [
      [storefront2020, "A Brunch Bakers store with its red wordmark sign, glowing display counter and wall shelves of baked goods", "land"],
    ],
  },
  {
    year: "2021\u20132022",
    title: "India is not enough",
    text: [
      "The kitchen steps beyond its home city and sets its sights on a much bigger map.",
      "Cakes, desserts and savouries find new tables, and more people discover what fresh really tastes like.",
    ],
    pics: [
      [qutub2021, "The Qutub Minar and its gardens in Delhi under a blue sky", "sq", "50% 50%"],
      [brownie2021, "A stack of fudgy chocolate brownies with glossy chocolate sauce pouring over them on a dark plate", "sq", "50% 40%"],
      [cake2021, "A square layered chocolate and vanilla mousse cake with chocolate garnish", "sq", "50% 50%"],
      [spread2021, "A Brunch Bakers menu on a marble table among croissants, madeleines and a cappuccino", "sq", "40% 50%"],
    ],
  },
  {
    year: "2023\u20132024",
    title: "Changing scale. Not our craft",
    text: [
      "Production grows so that more people can be served, without ever giving up baking fresh.",
      "Teams, kitchens and systems scale up. Recipes and standards stay exactly the same.",
    ],
    pics: [
      [rebar2023, "Steel reinforcement laid across a huge indoor hall floor as a new production space is built", "r43", "50% 50%"],
      [card2023, "The Brunch Bakers wordmark in cream on a red background, with the Pure Veg Bakery mark", "r43", "50% 50%"],
      [logo2023, "The Brunch Bakers script logo in red with the Pure Veg Bakery mark", "r43 fit"],
      [interior2023, "A bright Brunch Bakers store with wood slat walls, shelving, a counter and cafe seating", "r43", "65% 50%"],
    ],
  },
  {
    year: "2025",
    title: "Recognition",
    text: [
      "Guests, partners and the wider community begin to take notice.",
      "Brunch Bakers earns its place as a name people look for, and keeps raising the bar.",
    ],
    pics: [
      [storefront2025, "A cream Brunch Bakers storefront with a red wordmark on the awning, pastry shelves in the windows and cafe stools outside", "pano"],
      [cookies2025, "A stack of chocolate chip cookies", "land fit tight"],
    ],
  },
  {
    year: "2026",
    title: "Accelerating",
    text: [
      "New openings and new partnerships pick up pace as more people are invited to the table.",
      "Pure veg, baked fresh, and now growing across more cities than ever.",
    ],
    pics: [
      [counter2026, "A Brunch Bakers store with a glowing red sign, a glass display counter of baked goods and pendant lights", "", "50% 20%"],
      [cake2026, "A slice of black forest cake with cherries, whipped cream and chocolate shards on a dark plate", "", "50% 50%"],
    ],
  },
  {
    year: "Today",
    title: "And this is only the beginning",
    text: ["Pure veg, baked fresh every day, and ready to welcome more people to the table. Growing without compromising our craft. And baking Brunch Bakers even further."],
    pics: [],
  },
];

export const PILLARS = [
  ["Handmade, always", "Everything is baked fresh by our own teams, with recipes we keep simple and true."],
  ["Honest, always", "Fresh ingredients, fair prices and quality that comes first, from our kitchen to your doorstep."],
  ["Open to all, always", "A pure veg bakery with something sweet for every occasion and every table."],
];

export const STORY_STATS = [
  [`${PRODUCTS.length}+`, "Items on the menu"],
  [String(CATEGORIES.length), "Categories to explore"],
  [`${CITIES.length}`, "Cities we bake for"],
  ["100%", "Pure veg"],
];

/* Map points: real lat/lon, projected onto a plain dotted grid (no outline). `d` nudges the label. */
export const MAP_HOME = { name: "Jamshedpur", lat: 22.8, lon: 86.2, dx: 12, dy: 20, home: true };
export const MAP_PINS = [
  { name: "Delhi", lat: 28.61, lon: 77.21, dx: -12, dy: -10, end: "end" },
  { name: "Chandigarh", lat: 30.73, lon: 76.78, dx: -12, dy: -8, end: "end" },
  { name: "Jaipur", lat: 26.91, lon: 75.79, dx: -12, dy: 4, end: "end" },
  { name: "Lucknow", lat: 26.85, lon: 80.95, dx: 12, dy: -6 },
  { name: "Kolkata", lat: 22.57, lon: 88.36, dx: 12, dy: 6 },
  { name: "Ranchi", lat: 23.34, lon: 85.31, dx: -12, dy: -8, end: "end" },
  { name: "Mumbai", lat: 19.08, lon: 72.88, dx: -12, dy: 4, end: "end" },
  { name: "Pune", lat: 18.52, lon: 73.86, dx: 12, dy: 14 },
  { name: "Hyderabad", lat: 17.39, lon: 78.49, dx: 12, dy: 0 },
  { name: "Bangalore", lat: 12.97, lon: 77.59, dx: -12, dy: 4, end: "end" },
  { name: "Chennai", lat: 13.08, lon: 80.27, dx: 12, dy: 4 },
];

/*
  HOW A BAKE IS BORN
  ------------------
  Four numbered steps, each with one photo and a one-line caption. [image, alt text, caption, optional crop "x% y%"].
*/
export const PROCESS_STEPS = [
  ["The Idea", idea, "A white cake with diagonal ridges, a chocolate drip and a tall white chocolate flame on top", "A craving, a flavour, a challenge.", "50% 20%"],
  ["The Trials", trials, "A baker smoothing a layered cream cake with floury hands on a wooden bench", "Test batches, small tweaks, useful failures.", "50% 65%"],
  ["The Finish", finish, "A chef placing a caramel shard on a swirl of cream over a small layered dessert", "Every last detail is placed by hand.", "55% 50%"],
  ["The Series", series, "Chocolate cupcakes topped with swirls of white and chocolate cream on a white cake stand", "From our kitchen to every store.", "50% 50%"],
];
