import mongoose from "mongoose";
import dns from "dns";

// Use Google DNS and prefer IPv4 to fix SRV lookup issues on Windows
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "", {
            family: 4  // Force IPv4
        })
        console.log("✅MongoDB connected successfully");
    } catch (error) {
        console.error("❌MongoDB connection error",error)
        process.exit(1)
    }
}


export default connectDB;