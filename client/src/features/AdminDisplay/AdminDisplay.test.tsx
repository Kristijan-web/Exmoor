// proveri da li se sklanja sidebar kada se klikne na njegovu opciju
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import AdminDisplay from "./AdminDisplay";

test("Admin sidebar is removed when clicked on its options", () => {
  render(<AdminDisplay />);

  const option = screen.getByText(/products/i);

  expect(option).toBeInTheDocument();

  fireEvent.click(option);

  // opcija je povezana sa sidebar-om, ako nema opcije nema ni sidebar-a
  expect(option).not.toBeInTheDocument();
});
