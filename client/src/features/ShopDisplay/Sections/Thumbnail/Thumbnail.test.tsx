import { describe, expect, test, vi } from "vitest";
import Thumbnail from "./Thumbnail";
import { render, screen } from "@testing-library/react";
import { HeaderContext } from "../../../../contexts/GlobalContexts/HeaderContext";

describe("Thumbnail shop page", () => {
  test("thumnail element being send as intereceping element for sticky navigation", () => {
    const mockupDispatch = vi.fn();
    render(
      <HeaderContext.Provider
        value={{ interceptingElement: null, dispatch: mockupDispatch }}
      >
        <Thumbnail />
      </HeaderContext.Provider>,
    );
    expect(mockupDispatch).toHaveBeenCalledWith({
      type: "setInterceptingElement",
      payload: screen.getByTestId("thumbnail"),
    });
  });
});
