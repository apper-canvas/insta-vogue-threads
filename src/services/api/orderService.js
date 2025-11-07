import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

class OrderService {
  constructor() {
    this.tableName = 'order_c';
  }

  async createOrder(orderData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const orderNumber = `VT${Date.now().toString().slice(-6)}`;
      const tracking = {
        carrier: "FedEx",
        trackingNumber: `TRK${Date.now().toString().slice(-8)}`,
        events: [
          { date: new Date().toISOString(), status: "Order placed", location: "Online" }
        ]
      };

      const params = {
        records: [{
          order_number_c: orderNumber,
          order_date_c: new Date().toISOString(),
          status_c: "confirmed",
          total_c: orderData.totalAmount,
          items_c: JSON.stringify(orderData.items),
          shipping_address_c: JSON.stringify(orderData.shippingAddress),
          tracking_c: JSON.stringify(tracking)
        }]
      };

      const response = await apperClient.createRecord(this.tableName, params);

      if (!response.success) {
        console.error("Failed to create order:", response.message);
        return { success: false, error: response.message };
      }

      if (response.results && response.results.length > 0) {
        const createdOrder = response.results[0];
        if (createdOrder.success) {
          return {
            success: true,
            data: {
              Id: createdOrder.data.Id,
              orderNumber: orderNumber,
              orderDate: new Date().toISOString(),
              status: "confirmed",
              totalAmount: orderData.totalAmount,
              items: orderData.items,
              shippingAddress: orderData.shippingAddress,
              tracking: tracking
            }
          };
        }
      }

      return { success: false, error: "Failed to create order" };

    } catch (error) {
      console.error("Error creating order:", error?.response?.data?.message || error);
      return { success: false, error: "Failed to create order" };
    }
  }

  async getOrderById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "order_number_c"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "tracking_c"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(`Failed to fetch order ${id}:`, response.message);
        return { success: false, error: "Order not found" };
      }

      if (!response.data) {
        return { success: false, error: "Order not found" };
      }

      const order = response.data;

      const transformedOrder = {
        Id: order.Id,
        orderNumber: order.order_number_c || '',
        orderDate: order.order_date_c || '',
        status: order.status_c || '',
        total: parseFloat(order.total_c) || 0,
        totalAmount: parseFloat(order.total_c) || 0,
        items: order.items_c ? JSON.parse(order.items_c) : [],
        shippingAddress: order.shipping_address_c ? JSON.parse(order.shipping_address_c) : {},
        tracking: order.tracking_c ? JSON.parse(order.tracking_c) : {}
      };

      return {
        success: true,
        data: transformedOrder
      };

    } catch (error) {
      console.error(`Error fetching order ${id}:`, error?.response?.data?.message || error);
      return { success: false, error: "Order not found" };
    }
  }

  async getUserOrders(filters = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "order_number_c"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "tracking_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      // Apply filters
      const whereConditions = [];

      if (filters.status && filters.status !== 'all') {
        whereConditions.push({
          "FieldName": "status_c",
          "Operator": "EqualTo",
          "Values": [filters.status],
          "Include": true
        });
      }

      if (filters.search) {
        whereConditions.push({
          "FieldName": "order_number_c",
          "Operator": "Contains",
          "Values": [filters.search],
          "Include": true
        });
      }

      if (whereConditions.length > 0) {
        params.where = whereConditions;
      }

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error("Failed to fetch user orders:", response.message);
        return { success: false, error: response.message };
      }

      const orders = (response.data || []).map(order => ({
        Id: order.Id,
        orderNumber: order.order_number_c || '',
        orderDate: order.order_date_c || '',
        status: order.status_c || '',
        total: parseFloat(order.total_c) || 0,
        items: order.items_c ? JSON.parse(order.items_c) : [],
        shippingAddress: order.shipping_address_c ? JSON.parse(order.shipping_address_c) : {},
        tracking: order.tracking_c ? JSON.parse(order.tracking_c) : {}
      }));

      return {
        success: true,
        data: orders
      };

    } catch (error) {
      console.error("Error fetching user orders:", error?.response?.data?.message || error);
      return { success: false, error: "Failed to load orders" };
    }
  }

  async getOrderTracking(orderId) {
    try {
      const orderResult = await this.getOrderById(orderId);
      if (!orderResult.success) {
        return { success: false, error: "Order not found" };
      }

      return {
        success: true,
        data: orderResult.data.tracking
      };

    } catch (error) {
      console.error("Error fetching order tracking:", error?.response?.data?.message || error);
      return { success: false, error: "Failed to load tracking information" };
    }
  }

  async updateOrderStatus(orderId, newStatus) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      // First get the current order to update tracking
      const orderResult = await this.getOrderById(orderId);
      if (!orderResult.success) {
        return { success: false, error: "Order not found" };
      }

      const order = orderResult.data;
      const tracking = order.tracking || { events: [] };

      // Add tracking event
      const trackingEvent = {
        date: new Date().toISOString(),
        status: newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
        location: "Warehouse"
      };

      tracking.events.push(trackingEvent);

      const params = {
        records: [{
          Id: parseInt(orderId),
          status_c: newStatus,
          tracking_c: JSON.stringify(tracking)
        }]
      };

      const response = await apperClient.updateRecord(this.tableName, params);

      if (!response.success) {
        console.error("Failed to update order status:", response.message);
        return { success: false, error: response.message };
      }

      return this.getOrderById(orderId);

    } catch (error) {
      console.error("Error updating order status:", error?.response?.data?.message || error);
      return { success: false, error: "Failed to update order status" };
    }
  }

  async processPayment(paymentData) {
    try {
      // Simulate payment processing with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate payment processing with 90% success rate
      const success = Math.random() > 0.1;
      
      if (success) {
        return {
          success: true,
          data: {
            transactionId: `txn_${Date.now()}`,
            status: "completed"
          }
        };
      } else {
        return {
          success: false,
          error: "Payment failed. Please try again."
        };
      }

    } catch (error) {
      console.error("Error processing payment:", error?.response?.data?.message || error);
      return { success: false, error: "Payment processing failed" };
    }
  }
}

export default new OrderService();