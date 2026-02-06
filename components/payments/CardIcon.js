import CreditCardIcon from "@mui/icons-material/CreditCard";

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
    default: <CreditCardIcon />,
  };

  return icons[brand] || icons.default;
}
