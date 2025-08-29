import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import CartDisplay from "./CartDisplay";
import { CartContext } from "../../contexts/GlobalContexts/CartContext";

// Sta mi ovde nije jasno?
// - Ne razumem zasto mockujem dispatch ako koristim CartContext

describe("CartDisplay component", () => {
  test("is cart modal being closed when clicking outside of the cart component", () => {
    const mockupDispatch = vi.fn();
    render(
      <CartContext.Provider
        value={{ dispatch: mockupDispatch, isCartOpen: false }}
      >
        <CartDisplay />
        <div data-testid="outside"></div>
      </CartContext.Provider>,
    );
    const element = screen.getByTestId("outside");
    fireEvent.click(element);
    expect(mockupDispatch).toHaveBeenCalledWith({
      type: "closeCart",
      payload: false,
    });
  });
});
