import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import "@testing-library/jest-dom";
import CartProvider from "../../../../contexts/GlobalContexts/CartContext";
import CloseCart from "../CloseCart";

test("Is cart closing when dispatch for context is being called", async () => {
  render(
    <CartProvider>
      <CloseCart />
    </CartProvider>,
  );
  const closeButton = screen.getByText("✖");

  fireEvent.click(closeButton);
  // mora waitFor jer bilo kakav rad sa context-om se desava asinhrono
  await waitFor(() => {
    expect(screen.queryByText("✖")).not.toBeInTheDocument();
  });
});
