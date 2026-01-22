

// Filter state interface
export interface FilterState {
    searchTerm: string;
    category: string;
    sortBy: string;
    order: 'asc' | 'desc';
}

//Props for the ProductFilters component
export interface ProductFiltersProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
    order: 'asc' | 'desc';
    onOrderChange: (value: 'asc' | 'desc') => void;
    category: string;
    onCategoryChange: (value: string) => void;
    categories: string[];
}

// Props for the ProductGrid component
export interface ProductGridProps {
    products: Product[];
    isLoadingMore?: boolean;
    scrollRef?: (node?: Element | null) => void;
}

// Props for the ErrorState component
export interface ErrorStateProps {
    message?: string;
    onRetry?: () => void;
}

// Props for the EmptyState component
export interface EmptyStateProps {
    message?: string;
}

import { Product } from './product';
