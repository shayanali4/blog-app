import { render, screen } from "@testing-library/react";
import AnalyticsPage from "@/app/page";

// Mock the server actions
jest.mock("@/actions/event", () => ({
  getTotalEventsPerPost: jest.fn().mockResolvedValue([
    { postId: 1, _count: { postId: 5 } }, // 5 total events for post 1
    { postId: 2, _count: { postId: 3 } }, // 3 total events for post 2
  ]),
  getViewsPerPost: jest.fn().mockResolvedValue([
    { postId: 1, _count: { postId: 2 } }, // 2 views for post 1
    { postId: 2, _count: { postId: 1 } }, // 1 view for post 2
  ]),
  getTimeSeriesData: jest.fn().mockResolvedValue([
    { timestamp: "2023-10-01T00:00:00Z", type: "view" },
    { timestamp: "2023-10-01T00:00:00Z", type: "click" },
    { timestamp: "2023-10-02T00:00:00Z", type: "view" },
  ]),
}));

describe("AnalyticsPage", () => {
  it("should render the analytics page with data", async () => {
    // Render the page
    render(await AnalyticsPage());

    // Check if the page title is rendered
    expect(screen.getByText("Analytics")).toBeInTheDocument();

    // Check if the EventsTrend component is rendered
    expect(screen.getByText("Event Trends Over Time")).toBeInTheDocument();

    // Check if the EventsPerPost component is rendered with the correct data
    expect(screen.getByText("Total Events Per Post")).toBeInTheDocument();

    // Check if the ViewsPerPost component is rendered with the correct data
    expect(screen.getByText("Views Per Post")).toBeInTheDocument();
  });
});
