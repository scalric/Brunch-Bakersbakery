// One icon family (Lucide-style outlines), drawn inline so no dependency is added.
const icon = { viewBox: "0 0 24 24", width: 20, height: 20, fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false" };
export const SearchIcon = () => <svg {...icon}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
export const CloseIcon = () => <svg {...icon}><path d="M18 6 6 18M6 6l12 12" /></svg>;
export const MenuIcon = () => <svg {...icon}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const PinIcon = ({ size = 18 }) => <svg {...icon} width={size} height={size}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
export const ChevronIcon = () => <svg {...icon} width="14" height="14" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>;
export const MicIcon = () => <svg {...icon} width="18" height="18"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v3" /></svg>;
export const TrackIcon = () => <svg {...icon}><circle cx="6" cy="19" r="3" /><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" /><circle cx="18" cy="5" r="3" /></svg>;
export const UserIcon = () => <svg {...icon}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
