// One outline icon family (24px grid, 1.7 stroke) for the whole Franchise page.
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" };
 
const PATHS = {
  wallet: <><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v2" /><path d="M3 7.5V17a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-3" /><path d="M21 9h-4a2 2 0 0 0 0 4h4V9Z" /></>,
  area: <path d="M4 9V5a1 1 0 0 1 1-1h4M20 9V5a1 1 0 0 0-1-1h-4M4 15v4a1 1 0 0 0 1 1h4M20 15v4a1 1 0 0 1-1 1h-4" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  trend: <path d="m3 17 6-6 4 4 8-8M15 7h6v6" />,
  cap: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11.2V16c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.8M22 9v6" /></>,
  layout: <><rect x="3" y="3" width="18" height="7" rx="1.5" /><rect x="3" y="14" width="8" height="7" rx="1.5" /><path d="M15 14h6M15 18h6" /></>,
  box: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="M4 7.5 12 12l8-4.5M12 12v9" /></>,
  megaphone: <><path d="m3 11 15-6v14L3 13v-2Z" /><path d="M7 13.5V18a2 2 0 0 0 4 0v-3M21 9v6" /></>,
  monitor: <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></>,
  form: <><rect x="8" y="3" width="8" height="4" rx="1.5" /><path d="M8 5H6.5A1.5 1.5 0 0 0 5 6.5v13A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-13A1.5 1.5 0 0 0 17.5 5H16M9 12h6M9 16h4" /></>,
  chat: <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.5L3 20.5l1.6-5.3A8.5 8.5 0 1 1 21 11.5ZM8.5 10.5h7M8.5 13.5h4" />,
  doc: <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5M9 14.5l2 2 4-4" />,
  store: <path d="M4 9.5 5.5 4h13L20 9.5M4 9.5a2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0 2.5 2.5 0 0 0 5 0M5 12v8h14v-8M10 20v-4.5h4V20" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  cake: <><path d="M4 20h16v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6Z" /><path d="M4 16c2 1.4 4 1.4 6 0s4-1.4 6 0 3 1 4 0M12 12V8.5M12 6c.9-1 .9-1.8 0-2.6-.9.8-.9 1.6 0 2.6Z" /></>,
  chevron: <path d="m6 9 6 6 6-6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v4.5M12 16h.01" /></>,
  leaf: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19c2-4 5-7 9-9" /></>,
  pin: <><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  menu: <><path d="M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M8 3v5M17 21V3c-2 1.5-3 4-3 7s1 4 3 4" /></>,
  calc: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8.5 7.5h7M9 12h.01M12 12h.01M15 12h.01M9 16h.01M12 16h.01M15 16h.01" /></>,
};
 
export default function Icon({ name, size = 22 }) {
  return <svg {...base} width={size} height={size}>{PATHS[name]}</svg>;
}