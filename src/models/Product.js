import mongoose, {model, models, Schema} from "mongoose";

const ProductSchema = new Schema({
  images: [{type: String}],
  name: {type: String},
  description: {type: String},
  details: {type: String},
  category: {type: mongoose.Types.ObjectId},
}, {timestamps: true});

export const Product = models?.Product || model('Product', ProductSchema);