import { request, response } from "express";
import { reviewServices } from "../services/review.services.js";

export const getReviews=async(request,response)=>
{
    try{
         const{productId}=request.params;
         const reviews=await reviewServices.getReviews(productId)
         return response.status(200).json({message:"get all data from product",data:reviews})
    }
    catch(error)
    {
    //  console.log(error);
    return response.status(404).json({ error: error.message });
    }
};

export const addToReviews =async(request,response)=>
{
    try{
      const review=request.body;
      const result= await reviewServices.addToReviews(review)
      return res.status(201).json({ message: 'data add in reviws succesfully',result});
    }
    catch(error)
    {
      return response.status(400).json({message:"error.message"});
    }
};

export const updateReviews =async(request,response)=>
{
    try{ 
        const {reviewId}  =request.params;
        const updateData=request.body;  
     const result =await reviewServices.updateReviews(reviewId,updateData);
     return response.status(200).json(result)
    }
    catch(error)
    {
     return response.status(500).json({message:"error.message"});
    }
};

export const removeReviews =async(request,response)=>
{
    try
    {
      const {reviewId}=request.params;
      const result=await reviewServices.deleteReviews(reviewId);
      return response.status(201).json({message:"detele success",data:result})

    }
    catch(error)
    {
     return response.status(500).json({message:"error.message"});
    }
};