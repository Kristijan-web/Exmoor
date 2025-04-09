import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SettingsDisplay from "../../SettingsDisplay";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GeneralSettings from "../GeneralSettngs/GeneralSettingsDisplay";
import userEvent from "@testing-library/user-event";
describe("BackButton", () => {
  test("Back button displays settings menu sidebar and hides outlet", async () => {
    const user = userEvent.setup();
    window.innerWidth = 1000;
    render(
      <MemoryRouter initialEntries={["/podesavanja/postavke"]}>
        <Routes>
          <Route path="/podesavanja" element={<SettingsDisplay />}>
            <Route path="postavke" element={<GeneralSettings />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    // mora se uci u settingsMenuSidebar da se klikne na element i da se proveri da settingsMenu NE postoji

    expect(screen.queryByTestId("generalSettings")).toBeInTheDocument();
    // klik dugmeta treba da sakrije outlet
    await user.click(screen.getByTestId("backButton"));
    expect(screen.getByTestId("outletContainer")).toHaveClass("hidden");
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });
});
