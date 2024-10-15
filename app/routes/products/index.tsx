import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getAllProducts } from "~/models/product.server";

export const loader = async () => {
  const products = await getAllProducts();
  return json(products);
};

export default function ProductsIndex() {
  const products = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className="border p-4 rounded-lg hover:shadow-lg transition-shadow"
          >
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2" />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}