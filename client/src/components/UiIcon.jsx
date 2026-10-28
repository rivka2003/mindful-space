const paths = {
  leaf: "M20 4C10 3 3 7 5 14c2 7 13 5 15-10ZM5 20l10-10M9 16v-5m0 5h5",
  heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z",
  sun: "M12 3v1m0 16v1M3 12h1m16 0h1M5.6 5.6l.7.7m11.4 11.4.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  headphones: "M4 14v-3a8 8 0 0 1 16 0v3M4 12h3v8H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Zm16 0h-3v8h3a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Z",
  book: "M12 5v16M3 3c4 0 7 0 9 2 2-2 5-2 9-2v15c-4 0-7 0-9 3-2-3-5-3-9-3V3Z",
  check: "m5 12 4 4L19 6",
};

export default function UiIcon({ name, className = "", filled = false }) {
  return (
    <svg className={`ui-icon ${className}`} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name] || paths.leaf} />
    </svg>
  );
}
