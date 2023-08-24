import { ProductCard } from '@/service/api/CatalogService';

export default function CatalogCard({ product }: { product: ProductCard }) {
  const img = {
    backgroundImage: `url(${product.mainImage})`,
    width: '9rem',
    height: '12rem',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    margin: '0 20px',
  };
  return (
    <div className="flex flex-col mx-2 my-3 px-6 py-3 border hover:drop-shadow-md hover:-translate-y-1 cursor-pointer break-inside-avoid w-min items-center bg-gray-100">
      <p className=" h-10 text-center font-bold text-base leading-4">{product.name}</p>
      <div className="flex" style={img}></div>
      <div className="my-3">
        <span>{product.price ? product.price / 100 : null} USD</span>
        <button className="border border-solid border-transparent rounded  bg-emerald-900 text-white cursor-pointer py-1 px-3 ml-6">
          Add to cart
        </button>
      </div>
    </div>
  );
}
