import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      enum : ["user","admin"],
      required : true,
    },
    avatar: {
      type: String,
      default: "https://api.dicebear.com/8.x/avataaars/svg?seed=person",
    },
    addresses : {
        type : [mongoose.Schema.Types.Mixed],
    },
    orders : [
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Order"
      }
    ]
  },
  { timestamps: true }
);

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const User = mongoose.model("User", userSchema);

export default User;
