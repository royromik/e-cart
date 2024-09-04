import products from "./data/products.js";
import users from "./data/users.js";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import colors from 'colors';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from "./models/orderModel.js";


dotenv.config();

connectDB();

const importData = async()=>{
    try{
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        const addedUsers = await User.insertMany(users);
        const adminUser = addedUsers[0]._id
        await Product.insertMany(products.map((product)=>{
            return {...product,user:adminUser}
        }));
        console.log("data imported");
        process.exit(1);
    }catch(error){
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}


const destroyData = async()=>{
    try{
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        console.log("data destroyed");
        process.exit(1);
    }catch(error){
        console.error(`Error:${error.message}`)
        process.exit(1);
    }
}


    if(process.argv[2] == "-d"){
        destroyData()
    }else{
        importData()
    }
