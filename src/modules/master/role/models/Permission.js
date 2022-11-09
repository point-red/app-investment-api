const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PermissionSchema = new Schema(
  {
    name: { type: String, unique: true, dropDups: true },
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

module.exports = mongoose.model("Permissions", PermissionSchema);
