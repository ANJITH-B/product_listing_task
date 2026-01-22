import { ErrorStateProps } from '@/types/components.types';


export function ErrorState({
    message = 'An error occurred',
    onRetry
}: ErrorStateProps) {
    return (
        <div className="text-center py-28">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100  rounded-full mb-4">
                <svg
                    className="w-8 h-8 text-red-600 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900  mb-2">
                Failed to load products
            </h3>
            <p className="text-gray-600  mb-4">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Try Again
                </button>
            )}
        </div>
    );
}
