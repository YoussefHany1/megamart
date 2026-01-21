import React from "react";
import ContactContent from "../../../components/contact/contact"; // استيراد المكون الجديد

export const metadata = {
  title: "Contact Us | MegaMart",
  description:
    "Get in touch with the MegaMart team. We are here to answer any questions you may have.",
};

export default function ContactPage() {
  return (
    <>
      <ContactContent />
    </>
  );
}
