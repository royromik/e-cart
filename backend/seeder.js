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

    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
    
        const createdUser = await User.insertMany(users);
    
        const adminUser = createdUser[0]._id;
    
        const sampleProducts = products.map(product=>{
            return {...product, user:adminUser}
        })
    
        await Product.insertMany(sampleProducts);
    
        console.log("data imported".green.underline);
        process.exit(1);    
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);  
    }
  
}

const destroyData = async()=>{

    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
    
        console.log("data destroyed".green.underline);
        process.exit(1);    
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);  
    }
  
}


if(process.argv[2] == "-d"){
    destroyData()
}else{
    importData()
}