import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import "@testing-library/jest-dom";
import { CartContext } from "../../../contexts/GlobalContexts/CartContext";
import userEvent from "@testing-library/user-event";
import CloseCart from "./CloseCart";

describe("CloseCart component", () => {
  test("is context with dispatch closeCart being called", async () => {
    const mockDispatch = vi.fn();
    const user = userEvent.setup();
    render(
      <CartContext.Provider
        value={{ dispatch: mockDispatch, isCartOpen: false }}
      >
        <CloseCart />
      </CartContext.Provider>,
    );
    const closeButton = screen.getByText("✖");
    await user.click(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "closeCart",
      payload: false,
    });
  });
});
