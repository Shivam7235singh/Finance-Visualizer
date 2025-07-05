import mongoose , {Schema, model , models} from "mongoose";

export interface ITransaction {
    userId: string;
    amount: number;
    date?: Date;
}

const transactionSchema = new Schema({
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },

}, { timestamps: true });

const Transaction = models.Transaction || model("Transaction", transactionSchema);

export default Transaction;
