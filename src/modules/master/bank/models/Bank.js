const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BankSchema = new Schema(
  {
    name: { type: String, unique: true, dropDups: true },
    branch: { type: String },
    address: { type: String },
    phone: { type: String },
    fax: { type: String },
    code: { type: String },
    notes: { type: String },
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "BankAccounts" }],
    status: { type: String, enum: ["active", "archived"], default: "active" },
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

module.exports = mongoose.model("Banks", BankSchema);
