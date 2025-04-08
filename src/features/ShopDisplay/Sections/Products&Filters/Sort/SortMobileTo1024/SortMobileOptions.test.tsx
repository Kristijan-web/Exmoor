import { describe, expect, test } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SortMobileTo1024Button from "./SortMobileTo1024Button";
describe("SortMobileOptions", () => {
  test("Sort opions modal closes when clicked outside of it", async () => {
    const user = userEvent.setup();
    render(
      <>
        <SortMobileTo1024Button />
        <div data-testid="testDiv"></div>
      </>,
    );
    const sortButton = screen.getByTestId("sortButton");
    await user.click(sortButton);
    expect(screen.getByTestId("sortOptions")).toBeInTheDocument();
    await user.click(screen.getByTestId("testDiv"));
    expect(screen.queryByTestId("sortOptions")).not.toBeInTheDocument();
  });
});
