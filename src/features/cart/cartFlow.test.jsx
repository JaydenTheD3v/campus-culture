// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../../context/CartContext";
import { useCart } from "../../context/UseCart";
import { products } from "../../data/products";
import Cart from "./Cart";
import Checkout from "./Checkout";
import OrderConfirmation from "./OrderConfirmation";

const CART_KEY = "campus-culture-cart"; // the key the shared CartContext uses
const hoodie = products.find((p) => p.id === "cc-002"); // $65, sizes + colors
const cap = products.find((p) => p.id === "cc-004"); // $28, one size

// Stands in for the product page: buttons that call addToCart exactly like
// the product details page will (product, quantity, { size, color }).
function AddDemo() {
  const { addToCart, cartCount } = useCart();
  return (
    <div>
      <button onClick={() => addToCart(hoodie, 2, { size: "M", color: "Gray" })}>
        add-hoodie
      </button>
      <button onClick={() => addToCart(hoodie, 10, { size: "L", color: "Black" })}>
        add-ten-hoodies
      </button>
      <button onClick={() => addToCart(cap)}>add-cap</button>
      <span data-testid="count">{cartCount}</span>
    </div>
  );
}

function renderApp(path = "/cart") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <CartProvider>
        <AddDemo />
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/shop" element={<p>Shop page</p>} />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  );
}

const click = (text) => fireEvent.click(screen.getByText(text));
const summary = () => screen.getByRole("complementary", { name: /order summary/i });

function fillShipping() {
  const set = (label, value) =>
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  set(/full name/i, "Alex Rivera");
  set(/email/i, "alex@school.edu");
  set(/street address/i, "123 Eagle Dr");
  set(/city/i, "Denton");
  set(/state/i, "tx");
  set(/zip/i, "76201");
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
});
afterEach(cleanup);

describe("Cart page", () => {
  it("shows the empty state with a link back to the shop", () => {
    renderApp();
    expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeTruthy();
    expect(
      screen.getByRole("link", { name: /continue shopping/i }).getAttribute("href")
    ).toBe("/shop");
  });

  it("shows a hoodie with its options, line total and summary", () => {
    renderApp();
    click("add-hoodie");
    expect(screen.getByText("Campus Hoodie")).toBeTruthy();
    expect(screen.getByText("Size: M")).toBeTruthy();
    expect(screen.getByText("Color: Gray")).toBeTruthy();
    // 2 x $65 = $130: free shipping, $10.73 tax
    const s = within(summary());
    expect(s.getByText("$130.00")).toBeTruthy();
    expect(s.getByText("Free")).toBeTruthy();
    expect(s.getByText("$10.73")).toBeTruthy();
    expect(s.getByText("$140.73")).toBeTruthy();
  });

  it("links each item to the team's /products/:id page", () => {
    renderApp();
    click("add-hoodie");
    expect(
      screen.getByRole("link", { name: "Campus Hoodie" }).getAttribute("href")
    ).toBe("/products/cc-002");
  });

  it("hides default options and charges shipping under $75", () => {
    renderApp();
    click("add-cap");
    expect(screen.queryByText(/size:/i)).toBeNull();
    expect(screen.queryByText(/color:/i)).toBeNull();
    const s = within(summary());
    expect(s.getByText("$5.99")).toBeTruthy();
    expect(s.getByText("$36.30")).toBeTruthy();
    expect(s.getByText(/add \$47\.00 more to get free shipping/i)).toBeTruthy();
  });

  it("updates quantity and totals, and disables the minus button at 1", () => {
    renderApp();
    click("add-hoodie");
    fireEvent.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(screen.getByTestId("count").textContent).toBe("3");
    expect(within(summary()).getByText("$195.00")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /decrease quantity/i }));
    fireEvent.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(screen.getByRole("button", { name: /decrease quantity/i }).disabled).toBe(true);
  });

  it("disables the plus button at the maximum quantity", () => {
    renderApp();
    click("add-ten-hoodies");
    expect(screen.getByRole("button", { name: /increase quantity/i }).disabled).toBe(true);
  });

  it("keeps different sizes as separate lines", () => {
    renderApp();
    click("add-hoodie");
    click("add-ten-hoodies");
    expect(screen.getAllByText("Campus Hoodie")).toHaveLength(2);
  });

  it("removes an item and returns to the empty state", () => {
    renderApp();
    click("add-hoodie");
    fireEvent.click(screen.getByRole("button", { name: /remove campus hoodie/i }));
    expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeTruthy();
  });

  it("keeps the cart after a refresh (localStorage)", () => {
    const first = renderApp();
    click("add-hoodie");
    first.unmount();
    renderApp(); // a fresh mount behaves like a page reload
    expect(screen.getByText("Campus Hoodie")).toBeTruthy();
    expect(screen.getByTestId("count").textContent).toBe("2");
  });

  it("survives corrupted localStorage data", () => {
    localStorage.setItem(CART_KEY, "{not valid json");
    renderApp();
    expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeTruthy();
  });
});

describe("Checkout", () => {
  it("redirects to the cart when it is empty", () => {
    renderApp("/checkout");
    expect(screen.getByRole("heading", { name: /your cart is empty/i })).toBeTruthy();
  });

  it("has no credit card fields and shows the prototype notice", () => {
    renderApp();
    click("add-hoodie");
    fireEvent.click(screen.getByRole("link", { name: /go to checkout/i }));
    expect(screen.getByRole("note").textContent).toMatch(/no payment is processed/i);
    expect(screen.queryByLabelText(/card/i)).toBeNull();
    expect(screen.queryByLabelText(/cvv|expir/i)).toBeNull();
  });

  it("blocks a blank form and shows an error for every required field", () => {
    renderApp();
    click("add-hoodie");
    fireEvent.click(screen.getByRole("link", { name: /go to checkout/i }));
    fireEvent.click(screen.getByRole("button", { name: /place order/i }));
    expect(screen.getAllByRole("alert")).toHaveLength(6);
    expect(screen.getByRole("heading", { name: /checkout/i })).toBeTruthy();
  });

  it("places a simulated order, shows the confirmation and clears the cart", async () => {
    renderApp();
    click("add-hoodie");
    fireEvent.click(screen.getByRole("link", { name: /go to checkout/i }));
    fillShipping();
    fireEvent.click(screen.getByRole("button", { name: /place order/i }));

    const heading = await screen.findByRole(
      "heading",
      { name: /thank you, alex/i },
      { timeout: 3000 }
    );
    expect(heading).toBeTruthy();
    expect(screen.getByText(/CC-\d{6}/)).toBeTruthy();
    expect(screen.getByText(/Denton, TX 76201/)).toBeTruthy(); // state was upper-cased
    expect(within(summary()).getByText("$140.73")).toBeTruthy();

    expect(screen.getByTestId("count").textContent).toBe("0");
    expect(JSON.parse(localStorage.getItem(CART_KEY))).toEqual([]);
  });
});

describe("Order confirmation", () => {
  it("explains when there is no recent order", () => {
    renderApp("/order-confirmation");
    expect(screen.getByRole("heading", { name: /no recent order/i })).toBeTruthy();
  });
});
