import { json } from "@remix-run/node";
import { getAllProducts, createProduct } from "~/models/product.server";

export async function loader() {
  const products = await getAllProducts();
  return json(products);
}

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));
  const imageUrl = formData.get("imageUrl");

  const newProduct = await createProduct({ name, description, price, imageUrl });
  return json(newProduct, { status: 201 });
}