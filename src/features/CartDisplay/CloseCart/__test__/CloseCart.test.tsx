import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import { CartContext } from "../../../../contexts/GlobalContexts/CartContext";
import CartPage from "../../../../pages/CartPage";
import userEvent from "@testing-library/user-event";

test("is context with dispatch closeCart being called", async () => {
  const mockDispatch = vi.fn();
  const user = userEvent.setup();
  render(
    <CartContext.Provider value={{ dispatch: mockDispatch, isCartOpen: true }}>
      <CartPage />
    </CartContext.Provider>,
  );
  const closeButton = screen.getByText("✖");
  await user.click(closeButton);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "closeCart",
    payload: false,
  });
});
