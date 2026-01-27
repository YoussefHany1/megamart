export default function MessageAlert({ message }) {
  if (!message.text) return null;

  return (
    <div
      className={`p-4 mb-4 rounded ${
        message.type === "success"
          ? "bg-green-100 text-green-700 border border-green-300"
          : "bg-red-100 text-red-700 border border-red-300"
      }`}
    >
      {message.text}
    </div>
  );
}
