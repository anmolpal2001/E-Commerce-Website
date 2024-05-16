import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    items : {
        type : [mongoose.Schema.Types.Mixed],
        required : true
    },
    totalAmount : {
        type : Number,
        required : true
    },
    totalItems : {
        type : Number,
        required : true
    },
    paymentStatus : {
        type : String,
        default : "pending",
        enum : ["pending","completed","failed"]    
    },
    paymentMethod : {
        type : String,
        required : true,
        enum : ["card","cash"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    orderStatus : {
        type : String,
        default : "ordered",
        enum : ["ordered","packed","shipped","delivered"],
    },
    selectedAddress : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    }
}, { timestamps: true });

const virtual = orderSchema.virtual("id");
virtual.get(function () {
  return this._id.toHexString();
});

orderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
