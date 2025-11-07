import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

const wishlistService = {
  tableName: 'wishlist_item_c',

  // Get all wishlist items (returns array of product IDs)
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return [];
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "product_id_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error("Failed to fetch wishlist items:", response.message);
        return [];
      }

      return (response.data || []).map(item => item.product_id_c);

    } catch (error) {
      console.error('Error retrieving wishlist:', error?.response?.data?.message || error);
      return [];
    }
  },

  // Add item to wishlist
  async add(productId) {
    try {
      // Check if item already exists
      const current = await this.getAll();
      if (current.includes(productId)) {
        return false; // Item already in wishlist
      }

      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        throw new Error('Service unavailable');
      }

      const params = {
        records: [{
          product_id_c: productId
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error("Failed to add item to wishlist:", response.message);
        throw new Error('Failed to add item to wishlist');
      }

      return true;

    } catch (error) {
      console.error('Error adding to wishlist:', error?.response?.data?.message || error);
      throw new Error('Failed to add item to wishlist');
    }
  },

  // Remove item from wishlist
  async remove(productId) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        throw new Error('Service unavailable');
      }

      // First find the wishlist item with this product ID
      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "product_id_c"}}
        ],
        where: [{
          "FieldName": "product_id_c",
          "Operator": "EqualTo",
          "Values": [productId],
          "Include": true
        }],
        pagingInfo: {"limit": 1, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success || !response.data || response.data.length === 0) {
        console.error("Wishlist item not found for product:", productId);
        return false;
      }

      const wishlistItem = response.data[0];
      
      const deleteParams = {
        RecordIds: [wishlistItem.Id]
      };

      const deleteResponse = await apperClient.deleteRecord(this.tableName, deleteParams);

      if (!deleteResponse.success) {
        console.error("Failed to remove item from wishlist:", deleteResponse.message);
        throw new Error('Failed to remove item from wishlist');
      }

      return true;

    } catch (error) {
      console.error('Error removing from wishlist:', error?.response?.data?.message || error);
      throw new Error('Failed to remove item from wishlist');
    }
  },

  // Check if item is in wishlist
  async isInWishlist(productId) {
    try {
      const current = await this.getAll();
      return current.includes(productId);
    } catch (error) {
      console.error('Error checking wishlist:', error?.response?.data?.message || error);
      return false;
    }
  },

  // Clear entire wishlist
  async clear() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        throw new Error('Service unavailable');
      }

      // Get all wishlist items first
      const params = {
        fields: [
          {"field": {"Name": "Id"}}
        ],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error("Failed to fetch wishlist items for clearing:", response.message);
        throw new Error('Failed to clear wishlist');
      }

      if (!response.data || response.data.length === 0) {
        return true; // Already empty
      }

      const itemIds = response.data.map(item => item.Id);
      
      const deleteParams = {
        RecordIds: itemIds
      };

      const deleteResponse = await apperClient.deleteRecord(this.tableName, deleteParams);

      if (!deleteResponse.success) {
        console.error("Failed to clear wishlist:", deleteResponse.message);
        throw new Error('Failed to clear wishlist');
      }

      return true;

    } catch (error) {
      console.error('Error clearing wishlist:', error?.response?.data?.message || error);
      throw new Error('Failed to clear wishlist');
    }
  },

  // Get wishlist count
  async getCount() {
    try {
      const items = await this.getAll();
      return items.length;
    } catch (error) {
      console.error('Error getting wishlist count:', error?.response?.data?.message || error);
      return 0;
    }
  }
};

export { wishlistService };