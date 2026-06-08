import User from "../modal/user_modal.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";








export const changePassword = async (req, res) => {
  try {

    const {
      userId,
      oldPassword,
      newPassword,
    } = req.body;

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch =
      await bcryptjs.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Old password is incorrect",
      });
    }

    const hashedPassword =
      await bcryptjs.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    res.status(200).json({
      message:
        "Password changed successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Internal server error",
    });

  }
};


export const updateProfile = async (
  req,
  res
) => {
  try {

    const {
      userId,
      fullname,
      email,
    } = req.body;

    const user =
      await User.findByIdAndUpdate(
        userId,
        {
          fullname,
          email,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      message:
        "Profile updated successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Internal server error",
    });

  }
};





export const updateAddress = async (
  req,
  res
) => {
  try {

    const {
      userId,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    const user =
      await User.findByIdAndUpdate(
        userId,
        {
          phone,
          address,
          city,
          state,
          pincode,
        },
        {
          new: true,
        }
      );

    res.status(200).json({
      message:
        "Address updated successfully",
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Internal server error",
    });

  }
};



export const signup=async(req,res)=>{
    try {
        const{fullname,email,password}=req.body;
        const user= await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        const hashPassword=await bcryptjs.hash(password,10);
        const createdUser=new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
        })

       await createdUser.save();
        res.status(201).json({message:"User created successfully",user:{
         _id: createdUser._id,
         fullname:createdUser.fullname,
         email:createdUser.email,
         isAdmin:createdUser.isAdmin,
        }});
        
    } catch (error) {
        console.log("Error: " + error.message)
        res.status(500).json({message:"Internal server error"})
        
    }
};



export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // JWT token (admin-only protection ke liye)
        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
