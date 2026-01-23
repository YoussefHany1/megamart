// Danger Zone Block
export default function DeleteAccount({ onDelete, loading }) {
  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-red-200">
      <h2 className="text-xl font-semibold text-red-600 mb-4 border-b border-red-100 pb-2">
        Danger Zone
      </h2>
      <div className="p-4 bg-red-50 border border-red-500 rounded-md flex flex-col sm:flex-row justify-between items-center">
        <div>
          <h3 className="font-bold text-red-700">Delete Account</h3>
          <p className="text-sm text-red-600">
            Once you delete your account, there is no going back. Please be
            certain.
          </p>
        </div>
        <button
          type="button"
          onClick={onDelete}
          disabled={loading}
          className="mt-3 sm:mt-0 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200 text-sm disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
}
