import { describe, expect, test } from "vitest";
import SortMobileTo1024Button from "./SortMobileTo1024Button";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
describe("SortMobileTo1024Button.tsx", () => {
  test("Sort button opens options and disables the page scroller", async () => {
    const user = userEvent.setup();
    render(<SortMobileTo1024Button />);
    await user.click(screen.getByTestId("sortButton"));
    expect(document.body.style.overflow).toBe("hidden");
    await waitFor(() => {
      expect(screen.getByTestId("sortOptions")).toBeInTheDocument();
    });
  });
});
