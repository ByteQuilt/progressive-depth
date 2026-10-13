/** Three nested octagons, one per layer. */
export function LayeredMark() {
  return (
    <svg className="mark" viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <path d="M12 31 31 12h58l19 19v58l-19 19H31L12 89Z" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M25 42 42 25h36l17 17v36L78 95H42L25 78Z" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M39 53 53 39h14l14 14v14L67 81H53L39 67Z" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="60" cy="60" r="4" fill="currentColor" />
    </svg>
  );
}
