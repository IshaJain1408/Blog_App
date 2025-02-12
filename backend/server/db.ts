
const mongoose=require('mongoose')

const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb+srv://ishajain1408:isha1408@cluster0.jj8hd.mongodb.net/', {

      });
      console.log(`MongoDB Connected`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred');
      }
    }
  };
  
module.exports=connectDB