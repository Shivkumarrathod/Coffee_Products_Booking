import { Schema ,model } from "mongoose";

const orderSchema = new Schema({
    product:{type:Schema.Types.ObjectId,required:true,ref:'product'},
    user:{type:Schema.Types.ObjectId,required:true,ref:'User'},
    toAddress:{
      address:{type:String,required:true},
      city:{type:String,required:true},
      postalCode:{type:String,required:true},
      country:{type:String,required:true}
    },
    paymentMethod :{
        type:String,required:true,
    },
    paymentReesult :{
        id :{type:String},
        status :{type:String},
        update_time :{type:String},
        email_address :{type:String},
    },
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