const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RoleSchema = new Schema(
  {
    name: { type: String, unique: true, dropDups: true },
    permissions: [{ type: Schema.Types.ObjectId, ref: "Permissions" }],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.updatedAt;
        delete ret.__v;
      },
    },
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Roles", RoleSchema);
