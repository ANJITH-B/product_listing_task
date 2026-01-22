import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';
import { ProductGridProps } from '@/types/components.types';

 
export function ProductGrid({
    products,
    isLoadingMore = false,
    scrollRef,
}: ProductGridProps) {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {isLoadingMore &&
                    Array.from({ length: 4 }).map((_, i) => (
                        <ProductSkeleton key={`skeleton-${i}`} />
                    ))}
            </div>
            {scrollRef && <div ref={scrollRef} className="h-4" />}
        </>
    );
}
