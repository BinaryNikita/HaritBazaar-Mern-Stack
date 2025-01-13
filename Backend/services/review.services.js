import { response } from "express"
import { Review } from "../models/review.model.js"
export class reviewServices {
    static async getReviews(productId) {
        try {
            let reviews = await Review.find({ product_id: productId })
            if (reviews.length > 0) {
                return response.status(200).json({ message: "reviews succesfully", mydata: reviews, code: 200 })
            }
            else {
                return response.status(404).json({ message: "not found", data: null, code: 404 })
            }
        }
        catch (error) {
            return response.status(500).json({ err: " error review data", data: null, code: 500 })
        }
    }

    static async addToReviews(data) {
        const { productId, userId, comments, author, rating, images, videos, tags } = data;
        try {
            const newReview = new Review({
                product_id: productId,
                user_id: userId,
                comments,
                author,
                rating,
                images,
                videos,
                tags,
            })
            await newReview.save();
            return response.status(201).json({ message: "review added succesfully", data: newReview, code: 201 })
        }
        catch (error) {
            return response.status(500).json({ message: "error adding review" })
        }
    }

    static async updateReviews(reviewId, updateData) {
        try {
            const updateReview = await Review.findByIdAndUpdate(reviewId, updateData);
            if (!updateReview) {
                return response.status(404).json({ message: "not found" })
            }
            return response.status(200).json({ message: "upadte succes", data: updateReview })
        }
        catch (error) {
            return response.status(500).json({ message: "error" })
        }
    }

    static async deleteReviews(reviewId) {
        try {

            const deleteReview = await Review.findByIdAndDelete(reviewId);
            if (!deleteReview) {
                return response.status(404).json({ message: "not found" })
            }
            return response.status(200).json({ message: "delete succes" })

        }
        catch (error) {
            return response.status(500).json({ message: "error" })
        }
    }

}