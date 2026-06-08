import express from 'express';
import{signup, login , changePassword, updateProfile,
  updateAddress} from "../controller/user.controller.js"
const router=express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post(
  "/change-password",
  changePassword
);


router.put(
  "/update-profile",
  updateProfile
);

router.put(
  "/update-address",
  updateAddress
);


export default router;
