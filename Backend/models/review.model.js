import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }], 
    videos: [{ type: String }],
    author: {type: String, require:true},
    comments: { type: String },
    rating: { type: Number },
    publishedDate: { type: Date, default: Date.now }
});


export const Review = mongoose.model('Review', ReviewSchema);
