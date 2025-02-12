import { Request, Response } from "express";
import { Users } from "../models/userModels";
import bcrypt from "bcrypt";


export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      res.status(400).json({ success: false,msg: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({success: false, msg: "Invalid credentials" });
      return;
    }
    res.json({
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

export const registerUser=async(req:Request,res:Response)=>{
try {
    const {email,password,name}=req.body;
    const user=await Users.findOne({email});
    if(user){

        res.status(400).json({ success: false, message: "User already exists" });
    }
    const salt =await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=await Users.create({
       name,
       email,
       password:hashedPassword

    });
    if(!newUser){
        res.status(400).json({ success: false, message: "failed  to register a new user,Try again" });
}

    await newUser.save();
    res.status(201).json({success: true, msg: "User registered successfully" });
} catch (error) {
  res.status(500).json({ success: false, message: error });
}
}



