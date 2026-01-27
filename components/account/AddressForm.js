import { useState } from "react";
import {
  Alert,
  Snackbar,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";

export default function AddressForm({ initialData, onSave, loading }) {
  const [formData, setFormData] = useState({
    addressCountry: initialData.addressCountry || "",
    addressFullName: initialData.addressFullName || "",
    addressMobile: initialData.addressMobile || "",
    streetName: initialData.streetName || "",
    buildingName: initialData.buildingName || "",
    city: initialData.city || "",
    district: initialData.district || "",
    governorate: initialData.governorate || "",
    landmark: initialData.landmark || "",
  });

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // close toast handler
  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setToast({ ...toast, open: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // save operation from the parent
      await onSave(formData);

      // success message
      setToast({
        open: true,
        message: "Address saved successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      // error message
      setToast({
        open: true,
        message: "Failed to save address. Please try again.",
        severity: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-6 mt-6 border-t border-gray-100 space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
        Address Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country Input */}
        <TextField
          label="Country / Region"
          name="addressCountry"
          value={formData.addressCountry}
          onChange={handleChange}
          placeholder="e.g. Egypt"
          variant="outlined"
        />
        {/* Governorate Input */}
        <TextField
          label="Governorate"
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
          placeholder="e.g. Cairo"
          variant="outlined"
        />
        {/* Name Input */}
        <TextField
          label="Full Name (Recipient)"
          name="addressFullName"
          value={formData.addressFullName}
          onChange={handleChange}
          variant="outlined"
        />
        {/* Mobile Number Input */}
        <TextField
          label="Mobile Number (Address)"
          name="addressMobile"
          value={formData.addressMobile}
          onChange={handleChange}
          type="tel"
          placeholder="e.g. 0 123 456 7890"
          variant="outlined"
          helperText="For delivery contact"
        />
        {/* City Input */}
        <TextField
          label="City / Area"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="e.g. Nasr City"
          variant="outlined"
        />
        {/* District Input */}
        <TextField
          label="District"
          name="district"
          value={formData.district}
          onChange={handleChange}
          placeholder="e.g. 7th District"
          variant="outlined"
        />
        {/* Street Name Input */}
        <TextField
          label="Street Name"
          name="streetName"
          value={formData.streetName}
          onChange={handleChange}
          variant="outlined"
        />
        {/* Building Name Input */}
        <TextField
          label="Building Name / No"
          name="buildingName"
          placeholder="e.g. Building 12, Apartment 24"
          value={formData.buildingName}
          onChange={handleChange}
          variant="outlined"
        />
      </div>

      {/* Nearest Landmark Input */}
      <TextField
        label="Nearest Landmark"
        name="landmark"
        value={formData.landmark}
        onChange={handleChange}
        placeholder="e.g. Near Al-Ahly Club"
        variant="outlined"
        fullWidth
      />

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Save Address"
          )}
        </Button>
      </div>

      {/* alert */}
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </form>
  );
}
