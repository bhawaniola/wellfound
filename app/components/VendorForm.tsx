"use client";
import { useAtom } from "jotai";
import { vendorFormAtom } from "../atoms/vendorState";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type { VendorDocument } from "@/lib/models/Vendor";

export default function VendorForm({ initial, vendorId }: { initial?: Partial<VendorDocument>, vendorId?: string }) {
  const [form, setForm] = useAtom(vendorFormAtom);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (initial) setForm(initial);
    else setForm({
      vendorName: "",
      bankAccountNo: "",
      bankName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: "",
      zipCode: "",
    });
    // eslint-disable-next-line
  }, [initial]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.vendorName || !form.bankAccountNo || !form.bankName) {
      setError("Vendor Name, Bank Account No. and Bank Name are required");
      return;
    }
    try {
      if (vendorId) {
        await fetch(`/api/vendors/${vendorId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/vendors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      router.push("/");
      router.refresh();
    } catch {
      setError("Error saving vendor.");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <h2>{vendorId ? "Edit" : "Create"} Vendor</h2>
      <input name="vendorName" placeholder="Vendor Name*" value={form.vendorName || ""} onChange={handleChange} required />
      <input name="bankAccountNo" placeholder="Bank Account No.*" value={form.bankAccountNo || ""} onChange={handleChange} required />
      <input name="bankName" placeholder="Bank Name*" value={form.bankName || ""} onChange={handleChange} required />
      <input name="addressLine1" placeholder="Address Line 1" value={form.addressLine1 || ""} onChange={handleChange} />
      <input name="addressLine2" placeholder="Address Line 2" value={form.addressLine2 || ""} onChange={handleChange} />
      <input name="city" placeholder="City" value={form.city || ""} onChange={handleChange} />
      <input name="country" placeholder="Country" value={form.country || ""} onChange={handleChange} />
      <input name="zipCode" placeholder="Zip Code" value={form.zipCode || ""} onChange={handleChange} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" style={{ marginTop: 10 }}>
        {vendorId ? "Update" : "Create"}
      </button>
    </form>
  );
}
