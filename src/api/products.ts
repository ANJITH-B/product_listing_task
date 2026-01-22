import { ProductsResponse, ProductQueryParams } from '@/types/product';

const API_BASE_URL = 'https://dummyjson.com';

export const productApi = {
 
  async getProducts(params: ProductQueryParams = {}): Promise<ProductsResponse> {
    const { limit = 10, skip = 0, select, q, sortBy, order, category } = params;

    const queryParams = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
    });

    if (select) queryParams.append('select', select);
    if (sortBy) queryParams.append('sortBy', sortBy);
    if (order) queryParams.append('order', order);

    let endpoint: string;

    if (category) {
      endpoint = `${API_BASE_URL}/products/category/${encodeURIComponent(category)}?${queryParams.toString()}`;
    } else if (q) {
      endpoint = `${API_BASE_URL}/products/search?q=${encodeURIComponent(q)}&${queryParams.toString()}`;
    } else {
      endpoint = `${API_BASE_URL}/products?${queryParams.toString()}`;
    }

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
  },

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/products/category-list`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
    return response.json();
  },
};
