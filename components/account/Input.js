export default function Input({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
  placeholder,
  className = "",
}) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none ${
          disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
}
