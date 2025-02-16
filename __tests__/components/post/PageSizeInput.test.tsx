import { render, screen, fireEvent } from "@testing-library/react";
import PageSizeInput from "@/components/PageSizeInput";

describe("PageSizeInput", () => {
  it("should render the page size input with the correct default value", () => {
    // Render the component with a default pageSize of 10
    render(<PageSizeInput pageSize={10} baseUrl="/posts" />);

    // Check if the label is rendered
    expect(screen.getByText("Page Size:")).toBeInTheDocument();

    // Check if the select element is rendered with the correct default value
    const selectElement = screen.getByTestId(
      "page-size-select"
    ) as HTMLSelectElement;
    expect(selectElement.value).toBe("10");
  });

  it("should update the URL when a new page size is selected", () => {
    // Mock window.location.href
    delete (window as any).location;
    window.location = { href: "" } as any;

    // Render the component
    render(<PageSizeInput pageSize={10} baseUrl="/posts" />);

    // Simulate changing the page size to 20
    const selectElement = screen.getByTestId("page-size-select");
    fireEvent.change(selectElement, { target: { value: "20" } });

    // Check if the URL was updated correctly
    expect(window.location.href).toBe("/posts?page=1&pageSize=20");
  });

  it("should render all page size options", () => {
    // Render the component
    render(<PageSizeInput pageSize={10} baseUrl="/posts" />);

    // Check if all options are rendered
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(4);
    expect(options[0].textContent).toBe("5");
    expect(options[1].textContent).toBe("10");
    expect(options[2].textContent).toBe("20");
    expect(options[3].textContent).toBe("50");
  });
});
