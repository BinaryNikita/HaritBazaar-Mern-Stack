import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';

class CartService {
  static async addToCart(userId, productId, quantity) {
    try {
      let cart = await Cart.findOne({ user_id: userId });

      if (!cart) {
        cart = new Cart({
          user_id: userId,
          cartItems: [{ product_id: productId, quantity }],
        });
      } else {
        const existingProduct = cart.cartItems.find(
          (item) => item.product_id.toString() === productId
        );

        if (existingProduct) {
          existingProduct.quantity += quantity;
        } else {
          cart.cartItems.push({ product_id: productId, quantity });
        }
      }

      const updatedCart = await cart.save();
      return { message: 'Cart updated successfully!', cart: updatedCart };
    } catch (error) {
      throw new Error(`Error adding to cart: ${error.message}`);
    }
  }

  static async getCart(userId) {
    try {
      const cart = await Cart.findOne({ user_id: userId }).populate(
        'cartItems.product_id'
      );

      if (!cart) {
        return { message: 'Cart is empty!', items: [], totalAmount: 0 };
      }

      const totalAmount = cart.items.reduce((acc, item) => {
        return acc + cartItems.product_id.price * cartItems.quantity;
      }, 0);

      return {
        message: 'Cart retrieved successfully!',
        items: cart.items,
        totalAmount,
      };
    } catch (error) {
      throw new Error(`Error retrieving cart: ${error.message}`);
    }
  }

  static async deleteCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ user_id: userId });
      if (!cart) {
        return { message: 'Cart not found!' };
      }

      cart.items = cart.items.filter(
        (item) => cartItems.product_id.toString() !== productId
      );

      await cart.save();
      return { message: 'Product removed from cart successfully!', cart };
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

export default CartService;
