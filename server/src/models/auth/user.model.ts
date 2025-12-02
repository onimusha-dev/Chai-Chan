import { Schema, Document, Types, Model, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  fullName: string;
  email: string;
  username: string;
  password: string;
  refreshToken: string;
  termsAccept: boolean;
  tokenWallet?: {
    inputTokens: number;
    outputTokens: number;
    purchasedTokens: number;
    freeTierTokens: number;
  }
}

export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId,
  isPasswordCorrect(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument, Model<IUserDocument>>(
  {
    fullName: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },

    password: { type: String, required: true },
    refreshToken: { type: String, default: '' },

    termsAccept: { type: Boolean, default: false },

    tokenWallet: {
      inputTokens: { type: Number, default: 50000 },
      outputTokens: { type: Number, default: 20000 },
      purchasedTokens: { type: Number, default: 0 },
      freeTierTokens: { type: Number, default: 70000 },
    }
  },
  { timestamps: true }
);

userSchema.method('isPasswordCorrect', async function (password: string) {
  return await bcrypt.compare(password, this.password);
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('refreshToken')) return next();

  const salt = await bcrypt.genSalt(10);
  this.refreshToken = await bcrypt.hash(this.refreshToken, salt);
  next();
});

export const User = model<IUserDocument, Model<IUserDocument>>("User", userSchema);
