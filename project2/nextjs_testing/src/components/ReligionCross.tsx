const ReligiousCrossIcon = ({ className = "" }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="square"
    strokeLinejoin="miter"
    className={`w-8 h-8 ${className}`}
  >
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="5" y1="10" x2="19" y2="10" />
  </svg>
);

export default ReligiousCrossIcon;