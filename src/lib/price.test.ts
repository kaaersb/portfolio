import { describe, expect, it } from "vitest";
import { totalPrice } from "./price";

describe("totalPrice", () => {
  it("charges the ticket price per ticket", () => {
    expect(totalPrice(120, { quantity: 2, student: false })).toBe(240);
  });

  it("gives students half price", () => {
    expect(totalPrice(120, { quantity: 1, student: true })).toBe(60);
  });

  it("gives a group of 10 or more 20% off", () => {
    expect(totalPrice(100, { quantity: 10, student: false })).toBe(800);
  });

  it("charges nothing for no tickets", () => {
    expect(totalPrice(120, { quantity: 0, student: false })).toBe(0);
  });
});
