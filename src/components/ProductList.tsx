'use client';
import  { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import { useInfiniteProducts } from '@/hooks/useInfiniteProducts';
import { ProductGrid } from './ProductGrid';
import { ProductSkeleton } from './ProductSkeleton';
import { ErrorState } from './ErrorState';
import { EmptyState } from './EmptyState';

export function ProductList() {
    const searchParams = useSearchParams();

    const searchTerm = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || '';
    const order = (searchParams.get('order') as 'asc' | 'desc') || 'asc';

    const { ref, inView } = useInView();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
        error,
        refetch
    } = useInfiniteProducts({
        searchTerm,
        category,
        sortBy,
        order,
        limit: 12
    });

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, fetchNextPage, hasNextPage]);

    const products = data?.pages.flatMap((page) => page.products) || [];
    const total = data?.pages[0]?.total || 0;

    if (isError) {
        return <ErrorState message={(error as Error).message} onRetry={() => refetch()} />;
    }

    return (
        <div className="pt-24">
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <ProductSkeleton key={i} />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <EmptyState
                    message="No products found. Try adjusting your search or filters to find what you're looking for."
                />
            ) : (
                <>
                    <ProductGrid products={products} />
                    <div ref={ref} className="py-8 flex justify-center w-full">
                        {isFetchingNextPage && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <ProductSkeleton key={i} />
                                ))}
                            </div>
                        )}
                        {!hasNextPage && products.length > 0 && products.length >= total && (
                            <p className="text-gray-500 text-sm">You&apos;ve reached the end of the list</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
