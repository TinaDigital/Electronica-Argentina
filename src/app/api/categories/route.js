import {Category} from "../../../models/Category";
import mongoose from "mongoose";


export async function POST(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {name} = await req.json();
    const category = await Category.create({name});
    return Response.json(category);
}

export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);
    const categories = await Category.find();
    return Response.json(categories);
}

export async function DELETE(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id} = await req.json();
    await Category.findByIdAndDelete(_id);
    return Response.json({message: "Categoria eliminada"});
}

export async function PUT(req) {
    mongoose.connect(process.env.MONGO_URL);
    const {_id, name} = await req.json();
    await Category.findByIdAndUpdate(_id, {name});
    return Response.json({message: "Categoria actualizada"});
}

