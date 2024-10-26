import User from "../models/User.js"
import jwt from "jsonwebtoken"
import Blacklist from "../models/Blacklist.js";

export const register  = async (req,res)=>{
 
    const {userName , email , password , role} = req.body;

    try {
        let user = await User.findOne({email});
        if(user) return res.status(400).json({msg:"Email already exists"})

        user =  new User({ userName, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });


    } catch (error) {
        res.status(400).json({ error: error.message });
    }


}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



  export const logout = async (req, res) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
  
    try {
      // Calculate token expiry date 
      const expiresAt = new Date(Date.now() + 3600000);
  
      // Add the token to the blacklist
      await Blacklist.create({ token, expiresAt });
  
      res.status(200).json({ message: "User logged out" });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };
  


