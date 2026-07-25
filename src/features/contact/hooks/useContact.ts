import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export function useContact() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        form.current as HTMLFormElement,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string,
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("success");
          (e.target as HTMLFormElement).reset();
        },
        (error) => {
          console.log(error.text);
          setStatus("error");
        },
      )
      .finally(() => {
        setLoading(false);
        setTimeout(() => setStatus(null), 5000);
      });
  };

  return {
    form,
    loading,
    status,
    sendEmail,
  };
}
