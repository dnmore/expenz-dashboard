import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

// Import async component
import Page, {metadata} from "@/app/dashboard/(overview)/page";


// --- Mocks ---

jest.mock("@/components/ui/dashboard-cards", () => ({
  DashboardTotalCards: () => (
    <div data-testid="total-cards">Total Cards</div>
  ),
  DashboardBarChartCard: () => (
    <div data-testid="bar-chart">Bar Chart</div>
  ),
  DashboardLatestEntriesCard: () => (
    <div data-testid="latest-entries">Latest Entries</div>
  ),
}));

jest.mock("@/components/ui/skeletons", () => ({
  SkeletonCards: () => <div data-testid="skeleton-cards">Loading Cards</div>,
  SkeletonChart: () => <div data-testid="skeleton-chart">Loading Chart</div>,
  SkeletonLatestEntries: () => (
    <div data-testid="skeleton-latest">Loading Entries</div>
  ),
}));


describe("Dashboard Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("exports correct metadata", () => {
    expect(metadata).toEqual({
      title: "Dashboard",
    });
  });

 
  it("renders without crashing", async () => {
     const Page = (await import("@/app/dashboard/(overview)/page")).default;

    render(await Page());

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });


  it("renders the page heading", async () => {
    const Page = (await import("@/app/dashboard/(overview)/page")).default;

    render(await Page());
    expect(
      screen.getByRole("heading", { name: /dashboard/i })
    ).toBeInTheDocument();
  });

 
  it("renders dashboard total cards", async () => {
    const Page = (await import("@/app/dashboard/(overview)/page")).default;

    render(await Page());

    expect(screen.getByTestId("total-cards")).toBeInTheDocument();
  });

  it("renders bar chart card", async () => {
    const Page = (await import("@/app/dashboard/(overview)/page")).default;

    render(await Page());

    expect(screen.getByTestId("bar-chart")).toBeInTheDocument();
  });

  it("renders latest entries card", async () => {
   const Page = (await import("@/app/dashboard/(overview)/page")).default;

    render(await Page());

    expect(screen.getByTestId("latest-entries")).toBeInTheDocument();
  });

  
});