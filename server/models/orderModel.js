import { Schema ,model } from "mongoose";

const orderSchema = new Schema({
    product:{type:Schema.Types.ObjectId,required:true,ref:'product'},
    user:{type:Schema.Types.ObjectId,required:true,ref:'User'},
    toAddress:{type:String,required:true},
    paymentMethod :{
        type:String,required:true,
    },
    paymentResult: { type: Schema.Types.Mixed, required: true },
    isPaid :{
        type:Boolean,
        required:true,
        default:false,
    },
    paidAt:{
      type:Date,
    },
    isDelivered :{
        type:Boolean,
        required:true,
        default:false,
    },
    deliveredAt:{
        type:Date,
    },
})
const Order = model('order',orderSchema)

export default Order