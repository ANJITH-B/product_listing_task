import { ProductSkeleton } from "@/components";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <header className="mb-8">
                    <div className="h-10 w-64 bg-gray-200  rounded animate-pulse mb-2" />
                    <div className="h-5 w-96 bg-gray-200   rounded animate-pulse" />
                </header>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductSkeleton key={`skeleton-${i}`} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
