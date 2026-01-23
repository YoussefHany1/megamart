export default function CardIcon({ brand }) {
  const icons = {
    visa: (
      <svg viewBox="0 0 48 32" className="h-8 w-12">
        <rect width="48" height="32" rx="4" fill="#1434CB" />
        <text
          x="24"
          y="20"
          fill="white"
          fontSize="10"
          textAnchor="middle"
          fontWeight="bold"
        >
          VISA
        </text>
      </svg>
    ),
    mastercard: (
      <svg viewBox="0 0 48 32" className="h-8 w-12">
        <rect width="48" height="32" rx="4" fill="#EB001B" />
        <circle cx="18" cy="16" r="8" fill="#FF5F00" />
        <circle cx="30" cy="16" r="8" fill="#F79E1B" />
      </svg>
    ),
    default: (
      <svg viewBox="0 0 48 32" className="h-8 w-12">
        <rect width="48" height="32" rx="4" fill="#6B7280" />
        <rect x="4" y="8" width="40" height="4" fill="white" opacity="0.5" />
        <rect x="4" y="20" width="12" height="4" fill="white" opacity="0.5" />
      </svg>
    ),
  };

  return icons[brand] || icons.default;
}
