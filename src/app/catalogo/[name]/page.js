import ProductDetail from "./ProductDetail";

export async function generateMetadata({ params }) {
  const { name } = params;
  
  // Extraer solo el nombre de la URL
  const productName = decodeURIComponent(name);
  
  

  try {
    const baseUrl = process.env.PRODUCTION_URL;

    const url = new URL(`/api/products`, baseUrl);
    url.searchParams.append('name', productName);

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    const product = await response.json();

    return {
      title: `${product.name || 'Producto desconocido'} | Electrónica Argentina`,
      description: product.description || 'Descripción no disponible',
      icons: {
        icon: '/favicon.ico',
      },
    };
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return {
      title: 'Error | Electrónica Argentina',
      description: 'No se pudo cargar la información del producto.',
    };
  }
}

export default async function Page({ params }) {
  return <ProductDetail params={params} />;
}
