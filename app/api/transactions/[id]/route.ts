import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  try {
    const { id, ...updateData } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const updatedTxn = await Transaction.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTxn) {
      return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedTxn });
  } catch (err) {
    return NextResponse.json({ success: false, error: "PUT failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });
    }

    const deletedTxn = await Transaction.findByIdAndDelete(id);

    if (!deletedTxn) {
      return NextResponse.json({ success: false, error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Transaction deleted" });
  } catch (err) {
    return NextResponse.json({ success: false, error: "DELETE failed" }, { status: 500 });
  }
}
