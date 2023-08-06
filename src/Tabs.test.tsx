import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs } from "./Tabs";

describe("tabs", () => {
  it("renders a single tab", () => {
    render(
      <Tabs
        items={[
          {
            label: "Tab 1",
            content: {
              heading: "This is a heading",
            },
          },
        ]}
      />
    );

    expect(screen.getByRole("tablist")).toBeInTheDocument();

    const tab = screen.getByRole("tab");
    expect(tab).toBeInTheDocument();
    expect(tab).toHaveTextContent("Tab 1");

    const panel = screen.getByRole("tabpanel");
    expect(panel).toBeInTheDocument();
    expect(panel).toHaveTextContent("This is a heading");
  });

  it("renders multiple tabs", () => {
    const items = [
      {
        label: "Tab 1",
        content: {
          heading: "This is a heading",
        },
      },
      {
        label: "Tab 2",
        content: {
          heading: "This is a heading for tab 2",
        },
      },
    ];

    render(<Tabs items={items} />);

    expect(screen.getByRole("tablist")).toBeInTheDocument();

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
  });

  it("click tab to switch to another", () => {
    const items = [
      {
        label: "Tab 1",
        content: {
          heading: "This is a heading",
        },
      },
      {
        label: "Tab 2",
        content: {
          heading: "This is a heading for tab 2",
        },
      },
    ];

    render(<Tabs items={items} />);

    const tab2 = screen.getByRole("tab", { name: "Tab 2" });
    expect(tab2).toBeInTheDocument();

    userEvent.click(tab2);
    expect(screen.getByText("This is a heading for tab 2")).toBeInTheDocument();
  });

  describe("keyboard navigation", () => {
    const items = [
      {
        label: "Tab 1",
        content: {
          heading: "This is a heading for tab 1",
        },
      },
      {
        label: "Tab 2",
        content: {
          heading: "This is a heading for tab 2",
        },
      },
    ];

    it("navigates by keyboard - arrow right", () => {
      render(<Tabs items={items} />);
      const tablist = screen.getByRole("tablist");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });

      userEvent.click(tab1);
      expect(tab1).toHaveFocus();

      userEvent.type(tablist, "{arrowright}");
      expect(screen.getByText('This is a heading for tab 2')).toBeInTheDocument();
    });

    it("rotate to the previous one when reached to last one", () => {
      render(<Tabs items={items} />);
      const tablist = screen.getByRole("tablist");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });

      userEvent.click(tab1);
      expect(tab1).toHaveFocus();

      userEvent.type(tablist, "{arrowright}");
      expect(screen.getByText('This is a heading for tab 2')).toBeInTheDocument();

      userEvent.type(tablist, "{arrowright}");
      expect(screen.getByText('This is a heading for tab 1')).toBeInTheDocument();
    });

    it("navigates by keyboard - arrow left", () => {
      render(<Tabs items={items} />);
      const tablist = screen.getByRole("tablist");

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      userEvent.click(tab1);
      expect(tab1).toHaveFocus();

      userEvent.type(tablist, "{arrowleft}");
      expect(screen.getByText('This is a heading for tab 2')).toBeInTheDocument();
    });
  });
});
