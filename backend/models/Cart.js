import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
      items : [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          size: {
            type: mongoose.Schema.Types.Mixed,
          },
          color: {
            type: mongoose.Schema.Types.Mixed,
          },
        },
      ],
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    { timestamps: true }
  );

// Define a virtual field 'id' for the schema
// cartSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

// const virtual = cartSchema.virtual("id");
// virtual.get(function () {
//   return this._id.toHexString();
// });
// cartSchema.set("toJSON", {
//   virtuals: true,
//   versionKey: false,
//   transform: function (doc, ret) {
//     // Convert the '_id' field to 'id'
//     ret.id = ret._id.toHexString();
//     // Delete the '_id' field
//     delete ret._id;

//     // Convert each item's '_id' field to 'id'
//     ret.items.forEach(item => {
//       item.id = item._id.toHexString();
//       delete item._id;
//     });
//   },
// });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
