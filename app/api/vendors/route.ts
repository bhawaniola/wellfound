import { dbConnect } from "@/lib/dbConnect";
import Vendor from "@/lib/models/Vendor";
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/middleware/withAuth";

export const POST = withAuth(async (req) => {
  await dbConnect();
  const data = await req.json();
  if (!data.vendorName || !data.bankAccountNo || !data.bankName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const vendor = await Vendor.create(data);
  return NextResponse.json(vendor);
});

export const GET = withAuth(async (req) => {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 5;
  const skip = (page - 1) * limit;
  const vendors = await Vendor.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
  const total = await Vendor.countDocuments();
  return NextResponse.json({ vendors, total });
});
