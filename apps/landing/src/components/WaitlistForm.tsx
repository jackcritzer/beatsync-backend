'use client';
import { useState } from "react";

import FormCTAButton from "./FormCTAButton";

export default function WaitlistForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("https://api.sheetmonkey.io/form/7MNHJeXp2BRahRkE52hSfk", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => setShowSuccess(true), 100); // give it a frame for smooth mount
        form.reset(); // Optional: clears the input field
      } else {
        console.log(res.body)
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success" && showSuccess) {
    return (
      <div className="text-center text-green-400 font-semibold animate-fade-in transition-opacity duration-500">
        🎉 You&apos;re on the waitlist! We&apos;ll keep you posted.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-8">
      <label htmlFor="email" className="text-nase text-white">
        Email
      </label>
      <input
        id="email"
        name="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        required
        className="bg-transparent border border-white px-4 py-2 text-m text-white rounded"
      />
      <input type="hidden" name="Created" value="x-sheetmonkey-current-date-time" />
      <FormCTAButton status={status}/>
      {status === "error" && (
        <p className="text-red-400 text-sm w-full">Something went wrong. Try again later.</p>
      )}
    </form>
  );
}
