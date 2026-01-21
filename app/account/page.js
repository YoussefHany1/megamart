"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { db, auth } from "../../lib/firebase";
import Loading from "../loading";

export default function AccountPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    // Basic Info Data
    displayName: "",
    email: "",
    gender: "",
    birthDate: "",
    phoneNumber: "", // رقم الهاتف الأساسي للحساب

    // Detailed Address Data
    addressCountry: "",
    addressFullName: "",
    addressMobile: "", // رقم الموبايل الخاص بالعنوان
    streetName: "",
    buildingName: "",
    city: "",
    district: "",
    governorate: "",
    landmark: "",
  });

  // جلب البيانات
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async () => {
      try {
        const initialData = {
          displayName: user.displayName || "",
          email: user.email || "",
          gender: "",
          birthDate: "",
          phoneNumber: "",

          // Address Defaults
          addressCountry: "",
          addressFullName: "",
          addressMobile: "",
          streetName: "",
          buildingName: "",
          city: "",
          district: "",
          governorate: "",
          landmark: "",
        };

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const firestoreData = docSnap.data();
          setFormData({ ...initialData, ...firestoreData, email: user.email });
        } else {
          setFormData(initialData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // حماية الصفحة
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!user && !loading) {
        router.push("/");
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [user, loading, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      setMessage({
        type: "success",
        text: `تم إرسال رابط تغيير كلمة المرور إلى ${user.email}. يرجى التحقق من بريدك الوارد.`,
      });
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "حدث خطأ أثناء إرسال البريد الإلكتروني.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!user) return;

    try {
      const promises = [];

      // تحديث الاسم في Authentication
      if (formData.displayName !== user.displayName) {
        promises.push(
          updateProfile(user, { displayName: formData.displayName }),
        );
      }

      // تحديث البيانات في Firestore
      const userRef = doc(db, "users", user.uid);

      const additionalData = {
        // Basic Info
        gender: formData.gender,
        birthDate: formData.birthDate,
        phoneNumber: formData.phoneNumber, // حفظ رقم الحساب
        displayName: formData.displayName,
        email: user.email,

        // Address Details
        addressCountry: formData.addressCountry,
        addressFullName: formData.addressFullName,
        addressMobile: formData.addressMobile, // حفظ رقم العنوان
        streetName: formData.streetName,
        buildingName: formData.buildingName,
        city: formData.city,
        district: formData.district,
        governorate: formData.governorate,
        landmark: formData.landmark,
      };

      promises.push(setDoc(userRef, additionalData, { merge: true }));

      await Promise.all(promises);

      setMessage({ type: "success", text: "Data updated successfully!" });
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Error updating profile." });
      window.scrollTo(0, 0);
    }
  };

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-(--primary)">
        Account Settings
      </h1>

      {message.text && (
        <div
          className={`p-4 mb-4 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {message.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        {/* BASIC INFO  */}
        <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
          Basic Info
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled={true}
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
              title="Email cannot be changed"
            />
          </div>
        </div>

        {/* Password Reset Block */}
        <div className="p-4 bg-blue-50 rounded-md border border-blue-100 flex flex-col sm:flex-row justify-between items-center my-4">
          <div>
            <h3 className="font-bold text-gray-700">Password</h3>
            <p className="text-sm text-gray-500">
              Do you want to change your password?
            </p>
          </div>
          <button
            type="button"
            onClick={handlePasswordReset}
            className="mt-3 sm:mt-0 text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm transition duration-200"
          >
            Send Password Reset Link
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Birth Date
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
            />
          </div>
        </div>

        {/* Account Phone Number (Basic Info) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Primary Phone number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Primary Phone number"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
            />
          </div>
        </div>

        {/* ADDRESS DETAILS */}
        <div className="pt-6 mt-6 border-t border-gray-100">
          <h2 className="text-xl font-semibold border-b pb-2 mb-4 text-gray-800">
            Address Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2">
            {/* Country & Governorate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country / Region
              </label>
              <input
                type="text"
                name="addressCountry"
                value={formData.addressCountry}
                onChange={handleChange}
                placeholder="e.g. Egypt"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Governorate
              </label>
              <input
                type="text"
                name="governorate"
                value={formData.governorate}
                onChange={handleChange}
                placeholder="e.g. Cairo"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
              />
            </div>

            {/* Recipient Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name (Recipient)
              </label>
              <input
                type="text"
                name="addressFullName"
                value={formData.addressFullName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number (Address)
              </label>
              <input
                type="tel"
                name="addressMobile"
                value={formData.addressMobile}
                onChange={handleChange}
                placeholder="For delivery contact"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
              />
            </div>

            {/* City & District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City / Area
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Nasr City"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g. 7th District"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
              />
            </div>

            {/* Street & Building */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Name
              </label>
              <input
                type="text"
                name="streetName"
                value={formData.streetName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Building Name / No
              </label>
              <input
                type="text"
                name="buildingName"
                value={formData.buildingName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
              />
            </div>
          </div>

          {/* Landmark - Full Width */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nearest Landmark
            </label>
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="e.g. Near Al-Ahly Club"
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-(--primary) outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="bg-(--primary) text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
