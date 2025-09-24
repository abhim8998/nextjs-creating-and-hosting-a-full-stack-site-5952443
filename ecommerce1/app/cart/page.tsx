import ShoppingCartList from "./ShoppingCartList";
import NotFoundPage from "@/app/not-found"; // Assumed path for an error page

export default async function CartPage() {
  let cartProducts = null;

  try {
    const response = await fetch('/api/users/1/cart', {
      cache: 'no-cache' // Prevents caching of the response
    });

    // Handle HTTP errors first (e.g., 404, 500)
    if (!response.ok) {
      console.error(`API returned a non-ok status: ${response.status}`);
      return <NotFoundPage />;
    }

    // Now attempt to parse the JSON. This is where the error likely occurs.
    cartProducts = await response.json();

  } catch (error) {
    // This catch block handles network errors and JSON parsing errors
    console.error('Network or parsing error:', error);
    return <NotFoundPage />;
  }

  // Handle the case where the API response is valid but the cart is empty
  if (!cartProducts || cartProducts.length === 0) {
    return <div className="p-4 text-center">Your cart is empty.</div>;
  }

  return (
    <ShoppingCartList initialCartProducts={cartProducts} />
  );
}