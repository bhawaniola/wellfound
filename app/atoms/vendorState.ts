import { atom } from "jotai";
import type { VendorDocument } from "@/lib/models/Vendor";

export const vendorListAtom = atom<VendorDocument[]>([]);
export const vendorTotalAtom = atom<number>(0);
export const vendorPageAtom = atom<number>(1);
export const vendorFormAtom = atom<Partial<VendorDocument>>({
  vendorName: "",
  bankAccountNo: "",
  bankName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "",
  zipCode: "",
});
