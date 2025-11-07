import { getApperClient } from '@/services/apperClient';
import { toast } from 'react-toastify';

class ProductsService {
  constructor() {
    this.tableName = 'product_c';
  }

  async getAll(filters = {}) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "featured_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      // Apply filters
      const whereConditions = [];

      if (filters.category) {
        whereConditions.push({
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [filters.category],
          "Include": true
        });
      }

      if (filters.search) {
        whereConditions.push({
          "FieldName": "name_c",
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
        console.error("Failed to fetch products:", response.message);
        return { success: false, error: response.message };
      }

      let products = response.data || [];

      // Transform data to match expected format
      products = products.map(product => ({
        Id: product.Id,
        name: product.name_c || '',
        description: product.description_c || '',
        price: parseFloat(product.price_c) || 0,
        category: product.category_c || '',
        subcategory: product.subcategory_c || '',
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()).filter(s => s) : [],
        colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()).filter(c => c) : [],
        stock: parseInt(product.stock_c) || 0,
        featured: product.featured_c || false
      }));

      // Apply client-side filters for complex filtering
      if (filters.sizes && filters.sizes.length > 0) {
        products = products.filter(p =>
          filters.sizes.some(size => p.sizes.includes(size))
        );
      }

      if (filters.colors && filters.colors.length > 0) {
        products = products.filter(p =>
          filters.colors.some(color => p.colors.includes(color))
        );
      }

      if (filters.minPrice !== undefined) {
        products = products.filter(p => p.price >= filters.minPrice);
      }
      if (filters.maxPrice !== undefined) {
        products = products.filter(p => p.price <= filters.maxPrice);
      }

      // Apply sorting
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "price-low":
            products.sort((a, b) => a.price - b.price);
            break;
          case "price-high":
            products.sort((a, b) => b.price - a.price);
            break;
          case "name":
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
          default:
            break;
        }
      }

      return {
        success: true,
        data: products
      };

    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error);
      return { success: false, error: "Failed to load products" };
    }
  }

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "featured_c"}}
        ]
      };

      const response = await apperClient.getRecordById(this.tableName, parseInt(id), params);

      if (!response.success) {
        console.error(`Failed to fetch product ${id}:`, response.message);
        return { success: false, error: "Product not found" };
      }

      if (!response.data) {
        return { success: false, error: "Product not found" };
      }

      const product = response.data;

      // Transform data to match expected format
      const transformedProduct = {
        Id: product.Id,
        name: product.name_c || '',
        description: product.description_c || '',
        price: parseFloat(product.price_c) || 0,
        category: product.category_c || '',
        subcategory: product.subcategory_c || '',
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()).filter(s => s) : [],
        colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()).filter(c => c) : [],
        stock: parseInt(product.stock_c) || 0,
        featured: product.featured_c || false
      };

      return {
        success: true,
        data: transformedProduct
      };

    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      return { success: false, error: "Product not found" };
    }
  }

  async getFeatured() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "featured_c"}}
        ],
        where: [{
          "FieldName": "featured_c",
          "Operator": "EqualTo",
          "Values": [true],
          "Include": true
        }],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": 20, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error("Failed to fetch featured products:", response.message);
        return { success: false, error: response.message };
      }

      const products = (response.data || []).map(product => ({
        Id: product.Id,
        name: product.name_c || '',
        description: product.description_c || '',
        price: parseFloat(product.price_c) || 0,
        category: product.category_c || '',
        subcategory: product.subcategory_c || '',
        images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
        sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()).filter(s => s) : [],
        colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()).filter(c => c) : [],
        stock: parseInt(product.stock_c) || 0,
        featured: product.featured_c || false
      }));

      return {
        success: true,
        data: products
      };

    } catch (error) {
      console.error("Error fetching featured products:", error?.response?.data?.message || error);
      return { success: false, error: "Failed to load featured products" };
    }
  }

  async getRelated(productId, limit = 4) {
    try {
      // First get the product to find its category
      const productResult = await this.getById(productId);
      if (!productResult.success) {
        return { success: false, error: "Product not found" };
      }

      const product = productResult.data;
      
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "subcategory_c"}},
          {"field": {"Name": "images_c"}},
          {"field": {"Name": "sizes_c"}},
          {"field": {"Name": "colors_c"}},
          {"field": {"Name": "stock_c"}},
          {"field": {"Name": "featured_c"}}
        ],
        where: [{
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [product.category],
          "Include": true
        }],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}],
        pagingInfo: {"limit": limit + 1, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error("Failed to fetch related products:", response.message);
        return { success: false, error: response.message };
      }

      const relatedProducts = (response.data || [])
        .filter(p => p.Id !== parseInt(productId))
        .slice(0, limit)
        .map(product => ({
          Id: product.Id,
          name: product.name_c || '',
          description: product.description_c || '',
          price: parseFloat(product.price_c) || 0,
          category: product.category_c || '',
          subcategory: product.subcategory_c || '',
          images: product.images_c ? product.images_c.split('\n').filter(img => img.trim()) : [],
          sizes: product.sizes_c ? product.sizes_c.split(',').map(s => s.trim()).filter(s => s) : [],
          colors: product.colors_c ? product.colors_c.split(',').map(c => c.trim()).filter(c => c) : [],
          stock: parseInt(product.stock_c) || 0,
          featured: product.featured_c || false
        }));

      return {
        success: true,
        data: relatedProducts
      };

    } catch (error) {
      console.error("Error fetching related products:", error?.response?.data?.message || error);
      return { success: false, error: "Failed to load related products" };
    }
  }

  async getCategories() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not available");
        return { success: false, error: "Service unavailable" };
      }

      const params = {
        fields: [
          {"field": {"Name": "category_c"}}
        ],
        groupBy: ["category_c"],
        orderBy: [{"fieldName": "category_c", "sorttype": "ASC"}],
        pagingInfo: {"limit": 100, "offset": 0}
      };

      const response = await apperClient.fetchRecords(this.tableName, params);

      if (!response.success) {
        console.error("Failed to fetch categories:", response.message);
        return { success: false, error: response.message };
      }

      const categories = (response.data || [])
        .map(item => item.category_c)
        .filter(category => category && category.trim())
        .sort();

      return {
        success: true,
        data: categories
      };

    } catch (error) {
      console.error("Error fetching categories:", error?.response?.data?.message || error);
      return { success: false, error: "Failed to load categories" };
    }
  }
}

export default new ProductsService();