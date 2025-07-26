import { dbConnect } from "@/lib/dbConnect";
import Vendor from "@/lib/models/Vendor";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware/withAuth";

export const GET = withAuth<{ id: string }>(async (req, { params }) => {
  await dbConnect();
  const vendor = await Vendor.findById(params.id);
  if (!vendor) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(vendor);
});

export const PUT = withAuth<{ id: string }>(async (req, { params }) => {
  await dbConnect();
  const data = await req.json();
  const vendor = await Vendor.findByIdAndUpdate(params.id, data, { new: true });
  if (!vendor) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(vendor);
});

export const DELETE = withAuth<{ id: string }>(async (req, { params }) => {
  await dbConnect();
  const vendor = await Vendor.findByIdAndDelete(params.id);
  if (!vendor) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message: "Deleted" });
});
