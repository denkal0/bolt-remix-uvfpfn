import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProductById } from "~/models/product.server";
import { Button } from "~/components/ui/button";
import { useCart } from "~/utils/cart.client";
import { useToast } from "~/components/ui/use-toast";

export const loader = async ({ params }) => {
  const product = await getProductById(params.productId);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(product);
};

export default function ProductDetail() {
  const product = useLoaderData<typeof loader>();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
    });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.imageUrl} alt={product.name} className="w-full md:w-1/2 h-64 object-cover rounded-lg" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
}