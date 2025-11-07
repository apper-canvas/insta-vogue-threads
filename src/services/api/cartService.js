import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

class CartService {
  constructor() {
    this.tableName = 'cart_item_c';
  }

  async getCart() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "product_id_c"}},
          {"field": {"Name": "product_name_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "quantity_c"}},
          {"field": {"Name": "selected_size_c"}},
          {"field": {"Name": "selected_color_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error("Failed to fetch cart items:", response.message);
        return { success: false, error: response.message };
      }

      const cartItems = (response.data || []).map(item => ({
        id: item.Id,
        productId: item.product_id_c,
        productName: item.product_name_c || '',
        price: parseFloat(item.price_c) || 0,
        quantity: parseInt(item.quantity_c) || 1,
        selectedSize: item.selected_size_c || '',
        selectedColor: item.selected_color_c || ''
      }));

      return {
        success: true,
        data: cartItems
      };

} catch (error) {
      console.error("Error fetching cart items:", error?.response?.data?.message || error?.message || error);
      return { success: false, error: "Failed to load cart" };
    }
  }

  async addToCart(item) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      // Check if item already exists
      const existingItemsResult = await this.getCart();
      if (!existingItemsResult.success) {
        return existingItemsResult;
      }

      const existingItem = existingItemsResult.data.find(cartItem =>
        cartItem.productId === item.productId &&
        cartItem.selectedSize === item.selectedSize &&
        cartItem.selectedColor === item.selectedColor
      );

      if (existingItem) {
        // Update quantity of existing item
        return this.updateQuantity(existingItem.id, existingItem.quantity + item.quantity);
      } else {
        // Add new item
        const params = {
          records: [{
            product_id_c: item.productId,
            product_name_c: item.productName,
            price_c: item.price,
            quantity_c: item.quantity,
            selected_size_c: item.selectedSize,
            selected_color_c: item.selectedColor
          }]
        };

        const response = await apperClient.createRecord(this.tableName, params);

        if (!response.success) {
          console.error("Failed to add item to cart:", response.message);
          return { success: false, error: response.message };
        }

        return this.getCart();
      }

} catch (error) {
      console.error("Error adding to cart:", error?.response?.data?.message || error?.message || error);
      return { success: false, error: "Failed to add item to cart" };
    }
  }

  async updateQuantity(itemId, quantity) {
    try {
      if (quantity <= 0) {
        return this.removeFromCart(itemId);
      }

      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        records: [{
          Id: itemId,
          quantity_c: quantity
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error("Failed to update cart item:", response.message);
        return { success: false, error: response.message };
      }

      return this.getCart();

} catch (error) {
      console.error("Error updating cart item:", error?.response?.data?.message || error?.message || error);
      return { success: false, error: "Failed to update cart item" };
    }
  }

  async removeFromCart(itemId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        RecordIds: [itemId]
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error("Failed to remove cart item:", response.message);
        return { success: false, error: response.message };
      }

      return this.getCart();

} catch (error) {
      console.error("Error removing cart item:", error?.response?.data?.message || error?.message || error);
      return { success: false, error: "Failed to remove cart item" };
    }
  }

  async clearCart() {
    try {
      // Get all cart items first
      const cartResult = await this.getCart();
      if (!cartResult.success || cartResult.data.length === 0) {
        return { success: true, data: [] };
      }

      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const itemIds = cartResult.data.map(item => item.id);
      
      const params = {
        RecordIds: itemIds
      };

      const response = await apperClient.deleteRecord(this.tableName, params);

      if (!response.success) {
        console.error("Failed to clear cart:", response.message);
        return { success: false, error: response.message };
      }

      return {
        success: true,
        data: []
      };

} catch (error) {
      console.error("Error clearing cart:", error?.response?.data?.message || error?.message || error);
      return { success: false, error: "Failed to clear cart" };
    }
  }

  async getCartTotal() {
    try {
      const cartResult = await this.getCart();
      if (!cartResult.success) {
        return { success: false, error: "Failed to calculate total" };
      }

      const total = cartResult.data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        success: true,
        data: total
      };

} catch (error) {
      console.error("Error calculating cart total:", error?.response?.data?.message || error?.message || error);
      return { success: false, error: "Failed to calculate total" };
    }
  }

  async getCartItemCount() {
    try {
      const cartResult = await this.getCart();
      if (!cartResult.success) {
        return { success: false, error: "Failed to get item count" };
      }

      const count = cartResult.data.reduce((sum, item) => sum + item.quantity, 0);
      
      return {
        success: true,
        data: count
      };

} catch (error) {
      console.error("Error getting cart item count:", error?.response?.data?.message || error?.message || error);
      return { success: false, error: "Failed to get item count" };
    }
  }
}

export default new CartService();