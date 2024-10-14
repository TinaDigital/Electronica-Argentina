import {model, models, Schema} from "mongoose";

const BannerSchema = new Schema({
    image: {type: String, required: true},
}, {timestamps: true});

export const Banner = models?.Banner || model('Banner', BannerSchema);

