import mongoose, { Schema, model, models } from "mongoose";

export interface ITransaction {
  userId: string;
  amount: number;
  date?: Date;
  category: string; // kept string, but validated via enum below
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    category: {
      type: String,
      required: true,
      enum: ['Food', 'Transport', 'Rent', 'Health', 'Shopping', 'Utilities', 'Entertainment'],
    },
  },
  { timestamps: true }
);

const Transaction = models.Transaction || model("Transaction", transactionSchema);

export default Transaction;
