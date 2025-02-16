/**
 * @jest-environment node
 */
import {
  logEvent,
  getTotalEventsPerPost,
  getViewsPerPost,
  getTimeSeriesData,
} from "@/actions";

describe("Event Server Actions", () => {
  test("Should log an event", async () => {
    const event = await logEvent(1, 1, "view");

    expect(event).toHaveProperty("id");
    expect(event.postId).toBe(1);
    expect(event.userId).toBe(1);
    expect(event.type).toBe("view");
  });

  test("Should fetch total number of events per post", async () => {
    const events = await getTotalEventsPerPost();

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThanOrEqual(0);
    if (events.length > 0) {
      expect(events[0]).toHaveProperty("_count");
      expect(events[0]).toHaveProperty("postId");
    }
  });

  test("Should fetch number of views per post", async () => {
    const views = await getViewsPerPost();

    expect(Array.isArray(views)).toBe(true);
    expect(views.length).toBeGreaterThanOrEqual(0);
    if (views.length > 0) {
      expect(views[0]).toHaveProperty("_count");
      expect(views[0]).toHaveProperty("postId");
    }
  });

  test("Should fetch time-series event data", async () => {
    const timeSeriesData = await getTimeSeriesData();

    expect(Array.isArray(timeSeriesData)).toBe(true);
    expect(timeSeriesData.length).toBeGreaterThanOrEqual(0);
    if (timeSeriesData.length > 0) {
      expect(timeSeriesData[0]).toHaveProperty("timestamp");
      expect(timeSeriesData[0]).toHaveProperty("type");
      expect(timeSeriesData[0]).toHaveProperty("postId");
    }
  });
});
