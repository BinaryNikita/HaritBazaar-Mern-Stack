import mongoose from 'mongoose';

export const connection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/haritBazaardb');
    console.log("mongodb connected.......")
  } catch (err) {
    console.log(err);
  }
};

connection();
