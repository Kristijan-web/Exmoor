// proveri da li se sklanja sidebar kada se klikne na njegovu opciju
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import AdminDisplay from "./AdminDisplay";

test("Admin sidebar is removed when clicked on its options", () => {
  render(<AdminDisplay />);

  const option = screen.getByText(/products/i);
  // kako da kazem da ocekujem da option postoji

  expect(option).toBeInTheDocument();

  // kada se uradi klik na opciju proveri da li je sidebar i dalje tu
});
