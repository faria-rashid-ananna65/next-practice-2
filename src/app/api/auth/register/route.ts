import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../../config/db";
import User from "../../../model/user.model";
import bcrypt from "bcryptjs";
export async function POST(req: NextRequest, res:NextResponse) {
    const {name, email, password} = await req.json()
    await connectDB()

    try{
        const exist = await User.findOne({email})
        if(exist){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password:hashedPassword})
        return NextResponse.json({user}, {status: 201})
    }catch(err){
        return NextResponse.json({error: "Failed to create user"}, {status: 500})
    }
}