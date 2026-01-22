// Product types
export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
    shippingInformation: string;
}

// API Response types
export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

// Query parameters
export interface ProductQueryParams {
    limit?: number;
    skip?: number;
    select?: string;
    q?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    category?: string;
}

// Sort options (client-side)
export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
