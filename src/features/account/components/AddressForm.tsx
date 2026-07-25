import { useAddressForm } from "../hooks/useAddressForm";
import { TextField, CircularProgress, Button } from "@mui/material";

export default function AddressForm({ initialData, onSave, loading }) {
  const { formData, handleChange, handleSubmit } = useAddressForm(
    initialData,
    onSave,
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="pt-6 mt-6 border-t border-gray-100 space-y-6 bg-white p-6 rounded-lg shadow-md border"
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
    </form>
  );
}
