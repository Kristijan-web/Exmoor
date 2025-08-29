import { describe, expect, test } from "vitest";
import SettingsMenuSidebar from "./SettingsMenuSidebar";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";

function WrapperSidebar() {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <MemoryRouter>
      <SettingsMenuSidebar
        lessThan1024Width={true}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      ,
    </MemoryRouter>
  );
}
describe("SettingsMenuSidebar", async () => {
  test("Sidebar closes when clicked on option on mobile", async () => {
    render(<WrapperSidebar />);
    const user = userEvent.setup();
    const options = screen.getAllByTestId("sidebarOption");
    expect(options.length).toBeGreaterThan(0);
    const target = options.find((el) => el?.textContent?.includes("postavke"));
    expect(target).toBeInTheDocument();
    await user.click(target!);
    expect(target).not.toBeInTheDocument();
  });
});
