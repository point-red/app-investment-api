const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, unique: true, dropDups: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phone: { type: String },
    role: { type: Schema.Types.ObjectId, ref: "Roles" },
    image: { type: String },
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

module.exports = mongoose.model("Users", UserSchema);
