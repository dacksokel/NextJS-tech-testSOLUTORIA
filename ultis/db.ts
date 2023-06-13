//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"
import Test from './model/uf'


// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
    console.log(DATABASE_URL);
  console.log("Mongoose Connection Established")

  return { conn, Test }
}