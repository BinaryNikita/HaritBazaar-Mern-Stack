import { request, response } from "express";
import { Cart } from "../models/cart.model.js";
export class cartServices
{
    static async addToCart(user_id,product_id,quantity)
    {
      try
      {
            let cart = await Cart.findOne({user_id});
            if(cart)
            {
                const status =cart.cartItems.some((item)=>
                {
                    return item.product_id === product_id && item.quantity === quantity;
                });
                if(status)
                {
                    return response.status(200).json({message:"Item is already added in cart"});
                } else
                    {
                        cart.cartItems.puch({product_id});
                    await cart.save();
                    return response.status(201).json({message:"Item successfully added to cart"});  
                    }
        
                 } 
                 else{
                    let userCart=await Cart.create({user_id,cartItems:[{product_id,quantity}]});
                    return response.status(201).json({message:"Item successfully added to cart",userCart});
                }
            }
      catch(err)
      {
        return response.status(500).json({error: "Internal Server Error"});
      }
    }
    static async getCart(user_id)
    {
        try{
            let user_id=request.params.id;
            let cart = await Cart.findOne({user_id:user_id}).populate("cartItems.product_id");
            return response.status(200).json({cartDetails:cart});
        }
        catch(err)
        {
            return response.status(500).json({err:"Internal error"})
        }
    }
    
    static async deleteCart(user_id,product_id)
    {
        try{
            let {user_id,product_id}=request.params;
            let result=await Cart.updateOne({user_id},{$pull:{cartItems:{product_id}}});
            if(result.modifiedCount)
            {
                return response.status(200).json({message:"Item removed"})
            }  
            else{
                return response.status(404).json({error: "Requested resouce not found | Id not found"}); 
            }
            }
        
        catch(err)
        {
            return response.status(500).json({error: "Internal Server Error"});
        }
    }
}