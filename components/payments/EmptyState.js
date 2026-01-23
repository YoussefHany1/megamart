export default function EmptyState() {
  return (
    <div className="text-center py-10 bg-gray-50 rounded-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mx-auto text-gray-400 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
        />
      </svg>
      <p className="text-xl text-gray-600 mb-2">No payment methods saved</p>
      <p className="text-gray-500">Add a card to make checkout faster</p>
    </div>
  );
}
