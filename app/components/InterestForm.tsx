"use client";

import { useState, useEffect, useRef } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  numberOfCars: string;
  carModels: string;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  numberOfCars: "",
  carModels: "",
};

export default function InterestForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // Close on backdrop click
  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) {
      setIsOpen(false);
    }
  }

  // Close on Escape (native dialog behavior, but reset state)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    function handleCancel(e: Event) {
      e.preventDefault();
      setIsOpen(false);
    }

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleClose() {
    setIsOpen(false);
    // Reset after close animation
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      setFormData(initialFormData);
    }, 200);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-lg font-semibold text-zinc-900 transition-colors hover:bg-zinc-100 cursor-pointer"
      >
        Get Notified
      </button>

      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="m-auto w-full max-w-lg rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      >
        <div className="px-8 py-8 sm:px-10 sm:py-10">
          {submitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zinc-900">
                Thank you for your interest!
              </h2>
              <p className="mt-3 text-base text-zinc-600">
                We&apos;ll notify you when BidaWash launches near you.
              </p>
              <button
                onClick={handleClose}
                className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-8 text-base font-semibold text-white transition-colors hover:bg-zinc-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-zinc-900">
                Join the Interest List
              </h2>
              <p className="mt-2 text-base text-zinc-600">
                Be the first to know when BidaWash opens near you.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {/* Required fields */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none"
                    placeholder="Juan dela Cruz"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none"
                    placeholder="juan@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-zinc-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none"
                    placeholder="+63 917 123 4567"
                  />
                </div>

                {/* Optional fields */}
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-zinc-700">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none"
                    placeholder="City, Province"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="numberOfCars" className="block text-sm font-medium text-zinc-700">
                      Number of Cars
                    </label>
                    <input
                      id="numberOfCars"
                      name="numberOfCars"
                      type="number"
                      min="1"
                      value={formData.numberOfCars}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none"
                      placeholder="2"
                    />
                  </div>

                  <div>
                    <label htmlFor="carModels" className="block text-sm font-medium text-zinc-700">
                      Car Model(s)
                    </label>
                    <input
                      id="carModels"
                      name="carModels"
                      type="text"
                      value={formData.carModels}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 focus:outline-none"
                      placeholder="Toyota Vios, Honda City"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-zinc-900 text-base font-semibold text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
