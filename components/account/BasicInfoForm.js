import dayjs from "dayjs";
import { useState } from "react";
import {
  Alert,
  Snackbar,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  CircularProgress,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function BasicInfoForm({
  initialData,
  onSave,
  onResetPassword,
  loading,
}) {
  const [formData, setFormData] = useState({
    displayName: initialData.displayName || "",
    email: initialData.email || "",
    gender: initialData.gender || "",
    birthDate: initialData.birthDate ? dayjs(initialData.birthDate) : null,
    phoneNumber: initialData.phoneNumber || "",
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

  // update form data handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await onSave(formData);

      setToast({
        open: true,
        message: "Basic info updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: "Failed to update info. Please try again.",
        severity: "error",
      });
    }
  };

  // Password reset button click handler
  const handleResetClick = async () => {
    try {
      await onResetPassword();
      setToast({
        open: true,
        message: "Password reset link sent to your email!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setToast({
        open: true,
        message: "Failed to send reset link.",
        severity: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
    >
      <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
        Basic Info
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name Input */}
        <TextField
          label="Full Name"
          name="displayName"
          value={formData.displayName || ""}
          onChange={handleChange}
          variant="outlined"
        />
        {/* Email Input */}
        <TextField
          label="Email Address"
          name="email"
          value={formData.email || ""}
          disabled={true}
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "var(--color-primary)",
              },
            },
          }}
          required
        />
      </div>

      {/* Password Reset Block */}
      <div className="p-4 bg-blue-50 rounded-md border border-blue-100 flex flex-col sm:flex-row justify-between items-center my-4">
        <div>
          <h3 className="font-bold text-gray-700">Password</h3>
          <p className="text-sm text-gray-500">
            Do you want to change your password?
          </p>
        </div>
        <Button
          type="button"
          variant="contained"
          onClick={handleResetClick}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
          sx={{
            backgroundColor: "#4a5565",
            "&:hover": {
              backgroundColor: "#2d3748",
            },
          }}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gender Input */}
        <div>
          <FormControl fullWidth>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              name="gender"
              value={formData.gender || ""}
              label="Gender"
              onChange={handleChange}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Birth Date Input */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Birth Date"
            name="birthDate"
            value={formData.birthDate || null}
            onChange={(newValue) =>
              setFormData({ ...formData, birthDate: newValue })
            }
          />
        </LocalizationProvider>
      </div>

      {/* Phone Number Input */}
      <TextField
        label="Primary Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber || ""}
        onChange={handleChange}
        type="tel"
        fullWidth
        variant="outlined"
      />
      {/* Save Button */}
      <div className="flex justify-end mt-5">
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            "Save Basic Info"
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
