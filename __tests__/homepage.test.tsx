import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import HomeLayout from "@/app/layout";

import EditPage from "@/app/edit/[id]/page";
import AddPage from "@/app/edit/page";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
  usePathname: () => "/",
}));

// Navbar should be server-side rendered
describe("Page", () => {
  it("navbar text", () => {
    render(<HomeLayout children={<></>} />);
    expect(screen.getByText("NextJs Frontend")).toBeInTheDocument();
  });
});

// The default behaiour of the test is to return load screen
// because error should be null and users.length should be 0, so it
// should return loading screen
describe("Edit users", () => {
  it("should has one progressbar (circular progress)", () => {
    render(<EditPage params={{ id: "1" }} />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});

// New users page also should fetch all users firsts
describe("New", () => {
  it("should has one progressbar (circular progress)", () => {
    render(<AddPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });
});
