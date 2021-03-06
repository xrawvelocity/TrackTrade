const { Schema, model } = require("mongoose");
const PLM = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

const userSchema = new Schema(
  {
    username: String,
    password: String,
    avatar: String,
    connections: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.plugin(PLM);
userSchema.plugin(findOrCreate);

module.exports = model("User", userSchema);
