import { useInfiniteQuery } from '@tanstack/react-query';
import { productApi } from '@/api/products';
import { useDebounce } from './useDebounce';

interface UseInfiniteProductsParams {
    searchTerm: string;
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
    limit?: number;
}

export function useInfiniteProducts({
    searchTerm,
    category,
    sortBy,
    order,
    limit = 12
}: UseInfiniteProductsParams) {
    const debouncedSearch = useDebounce(searchTerm, 500);

    return useInfiniteQuery({
        queryKey: ['products', debouncedSearch, category, sortBy, order],
        queryFn: ({ pageParam = 0 }) =>
            productApi.getProducts({
                limit,
                skip: pageParam,
                q: debouncedSearch || undefined,
                category,
                sortBy,
                order,
            }),
        getNextPageParam: (lastPage, allPages) => {
            const totalFetched = allPages.reduce(
                (acc, page) => acc + page.products.length,
                0
            );
            return totalFetched < lastPage.total ? totalFetched : undefined;
        },
        initialPageParam: 0,
    });
}
