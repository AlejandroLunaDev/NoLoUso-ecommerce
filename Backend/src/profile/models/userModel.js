import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../../auth/utils/jwt.js";
import Token from "../../auth/utils/token.js";
import getUserInfo from "../../auth/utils/getUserInfo.js";

const userCollection = "users";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  last_connection: {
    type: Date,
  },
  online: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  avatar: {
    type: String,
  },
  conversations: [
    {
      withUser: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      lastMessageAt: { type: Date, default: Date.now },
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);

    // Encriptar el password con el salt
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this)) 
}
userSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this))
  try {
    await new Token({token: refreshToken}).save()
    return refreshToken
  } catch (error) {
    console.log(error)
  }
}

export const userModel = model(userCollection, userSchema);
