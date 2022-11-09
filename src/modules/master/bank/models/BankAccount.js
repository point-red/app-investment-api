const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BankAccountSchema = new Schema(
  {
    accountName: { type: String },
    accountNumber: { type: Number },
    notes: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("BankAccounts", BankAccountSchema);
