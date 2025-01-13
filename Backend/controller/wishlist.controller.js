// import express from "express";
import {WishlistService} from "../services/wishlist.services.js";
export const addToWishlist = async (request,response) => {
    try {
        const wishlist = req.body; 
        // console.log(req.body);
        const newwishlist = await WishlistService.addToWishlist(wishlist);
         return res.status(201).json({ message: 'data add in wishlist succesfully',newwishlist});
    } catch (error) {
         return res.status(500).json({ message: error.message });
    }
};

export const getWishlist=async(request,response)=>
{
    try{
        const userID=request.body.user_id;
        const getlist = await WishlistService.getWishlist(userID);
        return response.status(200).json({message:"get data succesfully",data:getlist}); 
    }
    catch(error)
    {
        return response.status(500).json({message:error.message});
    }
};

export const removeWishlist = async(request,response)=>
{
    try
    {
        let {id} = request.params;
        let result =await WishlistService.removeWishlist(id);
       return response.status(200).json({message:"list delete succes"})
    }
    catch(err)
    {
     console.log(err)
     return response.status(401).json({err:"delete server error"})
    }
}

