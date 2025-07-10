import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function POST(req: NextRequest) {
  await connectToDatabase();
  console.log("db is connected ")
  try {
    const body = await req.json();
    const transaction = await Transaction.create(body);
    return NextResponse.json({ success: true, data: transaction }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: "POST failed" }, { status: 500 });
  }
}

export async function GET() {
  await connectToDatabase();
  try {
    const transactions = await Transaction.find();
    return NextResponse.json({ success: true, data: transactions });
  } catch (err) {
    return NextResponse.json({ success: false, error: "GET failed" }, { status: 500 });
  }
}
