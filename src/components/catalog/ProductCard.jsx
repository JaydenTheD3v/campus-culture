import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const image = import.meta.env.BASE_URL + product.images[0].replace(/^\//, "");

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-card-image">
        <img src={image} alt={product.name} loading="lazy" />
      </div>
      <p className="product-card-category">{product.category}</p>
      <h3>{product.name}</h3>
      <p className="product-card-price">${product.price.toFixed(2)}</p>
    </Link>
  );
}
