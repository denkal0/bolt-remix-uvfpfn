import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { useEffect, useState } from "react";
import { connectToDatabase } from "~/lib/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "E-commerce Platform" },
    { name: "description", content: "Welcome to our E-commerce Platform!" },
  ];
};

export default function Index() {
  const [dbStatus, setDbStatus] = useState<string>("Checking connection...");

  useEffect(() => {
    async function checkDbConnection() {
      try {
        const db = await connectToDatabase();
        const collections = await db.listCollections().toArray();
        setDbStatus(`Connected to MongoDB. Found ${collections.length} collections.`);
      } catch (error) {
        setDbStatus("Failed to connect to MongoDB.");
        console.error(error);
      }
    }

    checkDbConnection();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">Welcome to Our E-commerce Platform</h1>
      <p className="mb-8 text-xl">Start shopping now!</p>
      <div className="space-x-4">
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/register">Register</Link>
        </Button>
      </div>
      <p className="mt-8 text-sm">{dbStatus}</p>
    </div>
  );
}