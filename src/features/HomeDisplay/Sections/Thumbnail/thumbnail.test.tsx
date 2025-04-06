import { describe, expect, test, vi } from "vitest";
import Thumbnail from "./Thumbnail";
import { HeaderContext } from "../../../../contexts/GlobalContexts/HeaderContext";
import { render, screen } from "@testing-library/react";

describe("Thumbnail testing", () => {
  // proveri da li se uspesno poziva dispatch
  test("is dispatch for setting intersection element called", () => {
    const mockupDispatch = vi.fn();
    render(
      <HeaderContext.Provider
        value={{
          interceptingElement: null,
          dispatch: mockupDispatch,
        }}
      >
        <Thumbnail />
      </HeaderContext.Provider>,
    );
    const thumbnailElement = screen.getByTestId("thumbnail");
    expect(mockupDispatch).toHaveBeenCalledWith({
      type: "setInterceptingElement",
      payload: thumbnailElement,
    });
  });
});
