import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NAV } from "@/data/constants";
import logo from "@/assets/logo-header.webp"; // 640px wide: about 3x its display size (also used in the footer)
import { useCart } from "@/context/CartContext";
import { useDeliveryLocation } from "@/context/LocationContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import useVoiceSearch from "@/hooks/useVoiceSearch";
import PromoPopover from "./PromoPopover";
import { ChevronIcon, CloseIcon, MenuIcon, MicIcon, PinIcon, SearchIcon, TrackIcon, UserIcon } from "./HeaderIcons";
import { STORAGE_KEYS } from "@/utils/storage";

const ORDER_TYPES = ["Delivery", "Pickup"];
const isActive = (to, pathname) => pathname === to;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searching, setSearching] = useState(false);
  const [query, setQuery] = useState("");
  const input = useRef(null);
  const burger = useRef(null);
  const hdrRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { promo } = useCart();
  const { location, openModal } = useDeliveryLocation();
  const [orderType, setOrderType] = useLocalStorage(STORAGE_KEYS.orderType, "");
  const [orderOpen, setOrderOpen] = useState(false);
  const orderRef = useRef(null);
  const [applyOpen, setApplyOpen] = useState(false);
  const applyRef = useRef(null);

  useEffect(() => { if (searching) input.current?.focus(); }, [searching]);

  // sticky header: soften into a white bar with a shadow (and tighten up) once the page has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // side menu: close on Escape (focus returns to the button), lock page scroll while it is open
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") { setOpen(false); burger.current?.focus(); } };
    const onResize = () => { if (window.innerWidth > 1100) setOpen(false); };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // popovers (promo code, order type): close on outside click or Escape
  useEffect(() => {
    if (!applyOpen && !orderOpen) return undefined;
    const onDown = (e) => {
      if (applyOpen && !e.target.closest?.("[data-code-toggle]") && !applyRef.current?.contains(e.target)) setApplyOpen(false);
      if (orderOpen && !orderRef.current?.contains(e.target)) setOrderOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") { setApplyOpen(false); setOrderOpen(false); } };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [applyOpen, orderOpen]);

  const goSearch = (raw) => {
    const q = raw.trim();
    if (!q) return;
    navigate(`/products?q=${encodeURIComponent(q)}`);
    setSearching(false);
    setQuery("");
  };
  const submit = (e) => { e.preventDefault(); goSearch(query); };

  const voice = useVoiceSearch(goSearch);

  const toggleCode = () => { setApplyOpen((o) => !o); setSearching(false); setOpen(false); setOrderOpen(false); };
  const codeLabel = promo ? `${promo.code} applied` : "Have a promo code?";

  const links = NAV.map(([label, to]) => {
    if (!to) {
      return <button key={label} type="button" className="nav-link" onClick={() => { setOpen(false); openModal(); }}>{label}</button>;
    }
    const active = isActive(to, pathname);
    return <Link key={label} to={to} className={active ? "is-active" : undefined} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>;
  });

  return (
    <>
      <div className="hdr-ann">
        <p><strong>Upto ₹200 OFF</strong> on the first order. T&amp;C apply</p>
        <div className="ann-links">
          <button type="button" className="ann-btn" onClick={openModal}><PinIcon size={15} /><span>Our stores</span></button>
          <button type="button" className="ann-btn ann-code" data-code-toggle onClick={toggleCode} aria-expanded={applyOpen} aria-haspopup="dialog">{codeLabel}</button>
        </div>
      </div>

      <header className={`hdr${scrolled ? " is-scrolled" : ""}`} ref={hdrRef}>
        <div className="hdr-main">
          <Link className="logo" to="/" aria-label="Brunch Bakers - home">
            <img src={logo} alt="Brunch Bakers - Pure Veg Bakery" width="640" height="210" />
          </Link>

          <form className={`hdr-search${searching ? " is-open" : ""}`} role="search" onSubmit={submit} onKeyDown={(e) => e.key === "Escape" && setSearching(false)}>
            <span className="hdr-search-ico"><SearchIcon /></span>
            <input ref={input} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for cakes, brownies, flavours…" aria-label="Search products" />
            {voice.supported && (
              <button type="button" className={`mic-btn${voice.listening ? " is-live" : ""}`} onClick={voice.listen} aria-label="Search by voice" aria-pressed={voice.listening}><MicIcon /></button>
            )}
          </form>

          <div className="hdr-pick">
            <button type="button" className="pick-seg" onClick={() => { setOrderOpen(false); openModal(); }} aria-haspopup="dialog">
              <span className="pick-ico"><PinIcon /></span>
              <span className="pick-txt"><small>Deliver to</small><strong>{location || "Set location"}</strong></span>
              <ChevronIcon />
            </button>
            <div className="pick-seg-wrap" ref={orderRef}>
              <button type="button" className="pick-seg" onClick={() => setOrderOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={orderOpen}>
                <span className="pick-txt"><small>Order type</small><strong>{orderType || "Set order type"}</strong></span>
                <ChevronIcon />
              </button>
              {orderOpen && (
                <ul className="pick-menu" role="listbox" aria-label="Order type">
                  {ORDER_TYPES.map((t) => (
                    <li key={t} role="option" aria-selected={orderType === t}>
                      <button type="button" className={orderType === t ? "is-on" : undefined} onClick={() => { setOrderType(t); setOrderOpen(false); }}>{t}</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="hdr-tools">
            <button type="button" className="icon-btn search-toggle" onClick={() => { setSearching((s) => !s); setApplyOpen(false); setOpen(false); setOrderOpen(false); }} aria-label={searching ? "Close search" : "Search"} aria-expanded={searching}>
              {searching ? <CloseIcon /> : <SearchIcon />}
            </button>
            {/* Track and Login open their own front-end-only pages (no accounts or order lookup behind them yet) */}
            <Link to="/track" className="hdr-ghost" aria-label="Track order"><TrackIcon /><span>Track</span></Link>
            <Link to="/login" className="hdr-ghost" aria-label="Login"><UserIcon /><span>Login</span></Link>
            {/* Apply: takes people to the franchise enquiry form */}
            <Link to="/franchise#enquire" className="apply-btn">Apply</Link>
            <button ref={burger} type="button" className="icon-btn burger" onClick={() => { setOpen((o) => !o); setSearching(false); setApplyOpen(false); setOrderOpen(false); }} aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu">
              <MenuIcon />
            </button>
          </div>

          {applyOpen && <PromoPopover innerRef={applyRef} />}
        </div>

        <div className="hdr-navrow">
          <nav className="hdr-nav" aria-label="Primary">{links}</nav>
        </div>

        <div className={`mnav-scrim${open ? " open" : ""}`} onClick={() => setOpen(false)} aria-hidden="true" />
        <aside id="mobile-menu" className={`mnav${open ? " open" : ""}`} aria-label="Menu">
          <div className="mnav-head">
            <span>Menu</span>
            <button type="button" className="icon-btn" onClick={() => { setOpen(false); burger.current?.focus(); }} aria-label="Close menu"><CloseIcon /></button>
          </div>
          <nav aria-label="Mobile">{links}</nav>
          <div className="mnav-foot">
            <button type="button" className="mnav-loc" onClick={() => { setOpen(false); openModal(); }}>
              <PinIcon /><span><small>Deliver to</small><strong>{location || "Set location"}</strong></span>
            </button>
            <div className="mnav-row">
              <Link to="/track" className="hdr-ghost" aria-label="Track order" onClick={() => setOpen(false)}><TrackIcon /><span>Track</span></Link>
              <Link to="/login" className="hdr-ghost" aria-label="Login" onClick={() => setOpen(false)}><UserIcon /><span>Login</span></Link>
            </div>
            <button type="button" className="mnav-code" data-code-toggle onClick={toggleCode}>{codeLabel}</button>
          </div>
        </aside>
      </header>
    </>
  );
}
