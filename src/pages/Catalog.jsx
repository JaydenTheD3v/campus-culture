import { useState } from "react";
import { products } from "../data/products";
import ProductFilters from "../components/catalog/ProductFilters";
import ProductGrid from "../components/catalog/ProductGrid";
import "../styles/catalog.css";

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  let results = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sort === "low") {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    results = [...results].sort((a, b) => b.price - a.price);
  }

  return (
    <main className="catalog container">
      <div className="catalog-header">
        <p className="section-kicker">CAMPUS CULTURE</p>
        <h1>Shop All</h1>
      </div>

      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sort={sort}
        setSort={setSort}
      />

      <p className="catalog-count">{results.length} products</p>

      <ProductGrid products={results} />
    </main>
  );
}
