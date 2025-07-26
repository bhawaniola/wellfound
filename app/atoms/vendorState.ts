import { atom } from 'jotai';

export const vendorListAtom = atom<any[]>([]);
export const vendorTotalAtom = atom(0);
export const vendorPageAtom = atom(1);
export const vendorFormAtom = atom({
  vendorName: "",
  bankAccountNo: "",
  bankName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "",
  zipCode: "",
});
