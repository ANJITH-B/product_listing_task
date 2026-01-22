import { EmptyStateProps } from '@/types/components.types';


export function EmptyState({ message = 'No products found' }: EmptyStateProps) {
    return (
        <div className="text-center py-12">
            <p className="text-gray-600">{message}</p>
        </div>
    );
}
