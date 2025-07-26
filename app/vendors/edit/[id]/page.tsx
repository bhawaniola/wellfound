import VendorForm from "@/app/components/VendorForm";

async function getVendor(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vendors/${id}`, { cache: "no-store" });
  return await res.json();
}

// Server Component - NO "use client" directive here
export default async function EditVendorPage({ params }: { params: { id: string } }) {
  const vendor = await getVendor(params.id);
  return <VendorForm vendorId={params.id} initial={vendor} />;
}
