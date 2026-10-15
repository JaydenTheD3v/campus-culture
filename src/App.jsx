
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import StoreLayout from "./components/layout/StoreLayout";
import PagePlaceholder from "./components/ui/PagePlaceholder";

export default function App() {
  return (
    <Routes>
      {/* Immersive entry screen */}
      <Route path="/" element={<Landing />} />

      {/* Main storefront */}
      <Route element={<StoreLayout />}>
        <Route path="/home" element={<Home />} />

        <Route
          path="/shop"
          element={
            <PagePlaceholder
              title="SHOP ALL"
              description="Our product catalog is coming soon."
            />
          }
        />

        <Route
          path="/products/:id"
          element={
            <PagePlaceholder
              title="PRODUCT DETAILS"
              description="Product details are being developed."
            />
          }
        />

        <Route
          path="/cart"
          element={
            <PagePlaceholder
              title="YOUR CART"
              description="Shopping cart functionality is coming soon."
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <PagePlaceholder
              title="CHECKOUT"
              description="Simulated checkout is being developed."
            />
          }
        />

        <Route
          path="/account"
          element={
            <PagePlaceholder
              title="MY ACCOUNT"
              description="Account functionality is planned."
            />
          }
        />

        <Route
          path="*"
          element={
            <PagePlaceholder
              title="404 — PAGE NOT FOUND"
              description="This page doesn't exist."
            />
          }
        />
      </Route>
    </Routes>
  );
}
