import {model, models, Schema} from "mongoose";

const UserSchema = new Schema({
  nombre: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  admin: {type: Boolean, default: false},
  resetPasswordToken: {type: String, default: "vacio"},
  resetPasswordExpires: {type: Date, default: "0"},
}, {timestamps: true});

export const User = models?.User || model('User', UserSchema);
