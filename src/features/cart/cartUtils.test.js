import { describe, expect, it } from "vitest";
import {
  ROUTES,
  assetUrl,
  calcTotals,
  formatPrice,
  lineTotal,
  validateShipping,
} from "./cartUtils";

// Cart lines shaped like the ones the shared CartContext creates.
const line = (price, quantity) => ({ key: `k-${price}-${quantity}`, price, quantity });

describe("calcTotals", () => {
  it("returns zeros for an empty cart", () => {
    expect(calcTotals([])).toEqual({
      itemCount: 0,
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
    });
  });

  it("avoids floating point errors (3 x 19.99 = 59.97)", () => {
    const t = calcTotals([line(19.99, 3)]);
    expect(t.subtotal).toBe(59.97);
    expect(t.shipping).toBe(5.99);
    expect(t.tax).toBe(4.95);
    expect(t.total).toBe(70.91);
  });

  it("charges shipping just under the $75 threshold", () => {
    expect(calcTotals([line(74.99, 1)]).shipping).toBe(5.99);
  });

  it("gives free shipping at exactly $75", () => {
    const t = calcTotals([line(25, 3)]);
    expect(t.subtotal).toBe(75);
    expect(t.shipping).toBe(0);
    expect(t.total).toBe(81.19);
  });

  it("adds up several lines and counts every unit", () => {
    const t = calcTotals([line(32, 2), line(65, 1)]); // retro tees + hoodie
    expect(t.itemCount).toBe(3);
    expect(t.subtotal).toBe(129);
    expect(t.shipping).toBe(0);
  });

  it("treats missing or invalid prices and quantities as zero instead of crashing", () => {
    const t = calcTotals([{ key: "a" }, { key: "b", price: "oops", quantity: 2 }, line(10, 1)]);
    expect(t.subtotal).toBe(10);
    expect(Number.isFinite(t.total)).toBe(true);
  });
});

describe("lineTotal", () => {
  it("multiplies in cents", () => {
    expect(lineTotal(line(19.99, 3))).toBe(59.97);
  });
});

describe("validateShipping", () => {
  const valid = {
    fullName: "Alex Rivera",
    email: "alex@school.edu",
    address: "123 Eagle Dr",
    city: "Denton",
    state: "TX",
    zip: "76201",
  };

  it("accepts a complete, valid form", () => {
    expect(validateShipping(valid)).toEqual({});
  });

  it("requires every field", () => {
    expect(Object.keys(validateShipping({})).sort()).toEqual([
      "address",
      "city",
      "email",
      "fullName",
      "state",
      "zip",
    ]);
  });

  it("treats whitespace-only values as empty", () => {
    expect(validateShipping({ ...valid, city: "   " }).city).toBeDefined();
  });

  it("rejects a malformed email, state and ZIP", () => {
    expect(validateShipping({ ...valid, email: "alex@school" }).email).toBeDefined();
    expect(validateShipping({ ...valid, state: "Texas" }).state).toBeDefined();
    expect(validateShipping({ ...valid, zip: "7620" }).zip).toBeDefined();
    expect(validateShipping({ ...valid, zip: "abcde" }).zip).toBeDefined();
  });

  it("accepts ZIP+4", () => {
    expect(validateShipping({ ...valid, zip: "76201-1234" }).zip).toBeUndefined();
  });
});

describe("ROUTES", () => {
  it("builds product links that match the team's /products/:id route", () => {
    expect(ROUTES.product("cc-002")).toBe("/products/cc-002");
  });
});

describe("formatPrice", () => {
  it("formats US dollars", () => {
    expect(formatPrice(5.99)).toBe("$5.99");
    expect(formatPrice(1234.5)).toBe("$1,234.50");
  });
});

describe("assetUrl", () => {
  const base = import.meta.env.BASE_URL; // "/campus-culture/" in this project

  it("adds the site base to root-relative image paths", () => {
    expect(assetUrl("/assets/products/hoodie.jpg")).toBe(`${base}assets/products/hoodie.jpg`);
    expect(assetUrl("assets/products/hoodie.jpg")).toBe(`${base}assets/products/hoodie.jpg`);
  });

  it("does not add the base twice", () => {
    const already = `${base}assets/products/hoodie.jpg`;
    expect(assetUrl(already)).toBe(already);
  });

  it("leaves external URLs, data URLs and empty values alone", () => {
    expect(assetUrl("https://example.com/a.jpg")).toBe("https://example.com/a.jpg");
    expect(assetUrl("data:image/png;base64,AAA")).toBe("data:image/png;base64,AAA");
    expect(assetUrl("")).toBe("");
  });
});
