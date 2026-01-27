// Danger Zone Block
import { CircularProgress, Button } from "@mui/material";
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
        <Button
          type="button"
          variant="contained"
          color="error"
          disabled={loading}
          onClick={onDelete}
        >
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Delete Account"
          )}
        </Button>
      </div>
    </div>
  );
}
