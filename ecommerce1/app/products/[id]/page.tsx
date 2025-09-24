import NotFoundPage from "@/app/not-found";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const response = await fetch('/api/products'+ params.id);
   if (!response.ok) {
    // If the response is not OK (e.g., a 404 error), return the not-found page
    return <NotFoundPage/>;
  }
  
  const product = await response.json()

  if (!product) {
    return <NotFoundPage/>
  }

  return (
    <div className="container mx-auto p-8 flex flex-col md:flex-row">
      <div className="md:w-1/2 mb-4 md:mb-0 md:mr-8">
        <img
          src={'/' + product.imageUrl}
          alt="Product image"
          className="w-full h-auto rounded-lg shadow-md" />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">${product.price}</p>
        <h3 className="text-2xl font-semibold mb-2">Description</h3>
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}