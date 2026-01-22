import { Product } from '@/types/product';
import Image from 'next/image';
import ReadStarRating from './ui/StarRating';

export function ProductCard({ product }: { product: Product }) {
    console.log(product);

    return (
        <article className="flex flex-row md:flex-col bg-white transition-shadow duration-200 overflow-hidden border border-gray-200 relative">
            <div className='relative min-w-36 sm:min-w-46 md:w-full h-full md:h-48 bg-gray-100'>
                <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className='h-full object-contain'
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className='p-2 md:p-4 w-full flex flex-col justify-between md:min-h-58'>
                <div>
                <h3 className='text-lg font-semibold text-gray-900  mb-2 line-clamp-2'> {product.title}</h3>
                <span className='hidden md:block '><p className='text-sm text-gray-600 mb-2 line-clamp-2'> {product.description}</p></span>

                {product.stock === 0
                    ? <p className='text-red-500 text-sm'>Out of stock</p>
                    : product.stock < 10
                    ? <p className='text-yellow-500 text-sm'>Getting out of stock, only {product.stock} left</p>
                    : <p className='text-green-500 text-sm'>In stock {product.stock}</p>}

                <p className='text-sm text-gray-600 mb-2 line-clamp-2'> {product.shippingInformation}</p>
                {product.discountPercentage > 0 && (
                    <p>
                        <span className="line-through text-gray-500 text-sm">
                            M.R.P:
                            {Math.round(
                                product.price / (1 - product.discountPercentage / 100)
                            )} $
                        </span>
                        <span className=" text-sm font-medium text-gray-900 ">
                            &nbsp;({product.discountPercentage}% off)
                        </span>
                    </p>
                )}
                </div>
                <div className="flex justify-between w-full ">
                    <p className="text-lg font-semibold text-gray-900 "> {product.price} $ </p>
                    <div className='flex justify-end items-center gap-1 text-sm text-gray-600 '>
                        <ReadStarRating value={product.rating} />
                        <span className='mt-1'>({product.rating.toFixed(1)})</span>
                    </div>
                </div>
            </div>
        </article>
    );
}
