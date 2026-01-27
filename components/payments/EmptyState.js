import CreditCardIcon from "@mui/icons-material/CreditCard";

export default function EmptyState() {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg">
      <CreditCardIcon />
      <p className="text-xl text-gray-600 mb-2">No payment methods saved</p>
      <p className="text-gray-500">Add a card to make checkout faster</p>
    </div>
  );
}
