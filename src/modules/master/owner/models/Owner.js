const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OwnerSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
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

module.exports = mongoose.model("Owners", OwnerSchema);
