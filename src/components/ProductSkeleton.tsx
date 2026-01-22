/**
 * ProductSkeleton Component
 * Displays a loading skeleton that matches the ProductCard layout
 * Used during initial load and infinite scroll loading states
 */

export function ProductSkeleton() {
    return (
        <div className="animate-pulse w-full flex flex-row md:flex-col ">
            <div className="bg-gray-200  min-w-36 sm:min-w-46 md:w-full h-full md:h-48 " />
            <div className="bg-white w-full p-2 md:p-4 border border-gray-200 ">
                <div className="h-4 bg-gray-200  rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200  rounded w-full mb-1" />
                <div className="h-3 bg-gray-200  rounded w-5/6 mb-3" />
                <div className="h-3 bg-gray-200  rounded w-2/6 mb-3" />
                <div className="h-3 bg-gray-200  rounded w-2/6 mb-3" />
                <div className="h-3 bg-gray-200  rounded w-3/6 mb-3" />
                <div className="flex justify-between">
                    <div className="h-6 bg-gray-200  rounded w-16" />
                    <div className="h-4 bg-gray-200  rounded w-12" />
                </div>
            </div>
        </div>
    );
}
