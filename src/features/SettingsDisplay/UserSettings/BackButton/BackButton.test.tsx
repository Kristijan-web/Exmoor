import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SettingsDisplay from "../../SettingsDisplay";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import GeneralSettings from "../GeneralSettngs/GeneralSettingsDisplay";
import userEvent from "@testing-library/user-event";
describe("BackButton", () => {
  test("Back button displays settings menu", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/podesavanja/postavke"]}>
        <Routes>
          <Route path="/podesavanja" element={<SettingsDisplay />}>
            <Route path="postavke" element={<GeneralSettings />} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("backButton")).toBeInTheDocument();
    expect(screen.queryByTestId("generalSettings")).toBeInTheDocument();
    // klik dugmeta treba da sakrije outlet
    await user.click(screen.getByTestId("backButton"));
    expect(screen.queryByTestId("generalSettings")).not.toBeInTheDocument();
  });
});
