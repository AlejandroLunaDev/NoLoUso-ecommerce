import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
  conversations: [
    {
      withUser: {
        type: Schema.Types.ObjectId,
        ref: "Users",
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
  
}
userSchema.methods.createRefreshToken = function () {
  
}

export const userModel = model(userCollection, userSchema);
