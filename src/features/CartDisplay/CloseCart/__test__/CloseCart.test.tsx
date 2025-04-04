import CloseCart from "../CloseCart";
import { render, screen } from "@testing-library/react";
import { it, expectgit } from "vitest";
import "@testing-library/jest-dom";

it("expected to display 'Hello, Pedro'", () => {
  render(<CloseCart />);
  const display = screen.getByText("Hello, Pedro!");
  expect(display).toBeInTheDocument();
});

expe;
