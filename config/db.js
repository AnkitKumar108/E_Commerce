import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {

    //used to establish a connection to a MongoDB database.
    try {

// to establish a connection to a MongoDB database. It uses the MONGO_URL 
//environment variable to determine the URL of the MongoDB server to 
//connect to.        
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conneted To Mongodb Databse ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log('Error in Mongodb ${error}'.bgRed.white);
        
    }
};

export default connectDB;