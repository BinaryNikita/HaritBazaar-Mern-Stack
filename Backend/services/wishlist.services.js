import { request, response } from "express";
import {Whislist} from "../models/whislist.model.js";
  export  class WishlistService{
     static async addToWishlist(data) {
        try{
            const {userId,productId}=data;

            // whilist check same name
            let wishlist=await Whislist.exists({user_id:userId,product_id:productId});
            if(wishlist)
            {
                //exists  add item
               return response.status(403).json({error:" this product is already present in wishlist",
                data:null,code:403});
            }
            const newwishlist =new Whislist({
                product_id:productId,
                user_id:userId
            });
            await newwishlist.save();
            return { message: "Product added to wishlist successfully" };
        } catch(err)
        {
            console.log(" Error adding item to wishlist",err)
            return response.status(500).json({err:"error data add in wishlist",data:null,code:500})
        }
    }

    static async getWishlist(userID)
    {
        try{
            // const wishlist=await Whislist.find({user_id:userID}).populate('product_id');
            let wishlist = await Whislist.find({user_id:userID});
          if(Whislist.length>0)
          {
             return response.status(200).json({message:"data found succesfully", mydata:wishlist,code:200})
          }
          else{
            return response.status(404).json({message:"data not found",data:null,code:404})
          }
        }
        catch(err)
        {
        //console.log(err);
        return response.status(500).json({err:" error fetching data",data:null,code:500})
        }
    }

     static async removeWishlist(id)    
    {
        try{
            let isIdExist = await Whislist.findById({_id:id});  
            if(!isIdExist)
            {
               return response.status(404),json({message:" id not found",code:401})
            }
            let wishlist= await Whislist.deleteOne({_id:id});    
            if(wishlist)
            {
              return response.status(200).json({message:"whishlist delete",code:200});
            }
            else
            {
                   return response.status(500).json({error:" somthing went wrong",data:null,code:500});
            }
        }
        catch(err)
        {
          return response.status(401).json({err:"delete server error",data:null,code:401});
        }
    }

    
}





