import {act, fireEvent, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tabs } from "./Tabs";

import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("tabs", () => {
  describe("a11y", () => {
    it("should demonstrate this matcher`s usage with react testing library", async () => {
      const { container } = render(
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

      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });
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

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      act(() => {
        tab1.focus();
      });

      fireEvent.keyDown(tab1, { key: 'ArrowRight' });

      expect(tab2).toHaveFocus();

      expect(
        screen.getByText("This is a heading for tab 2")
      ).toBeVisible();
    });

    it("rotate to the previous one when reached to last one", () => {
      render(<Tabs items={items} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });


      act(() => {
        tab2.focus();
        tab2.click();
      });

      fireEvent.keyDown(tab2, { key: 'ArrowRight' });

      expect(tab1).toHaveFocus();

      expect(
        screen.getByText("This is a heading for tab 1")
      ).toBeVisible();
    });

    it("navigates by keyboard - arrow left", () => {
      render(<Tabs items={items} />);

      const tab1 = screen.getByRole("tab", { name: "Tab 1" });
      const tab2 = screen.getByRole("tab", { name: "Tab 2" });

      act(() => {
        tab1.focus();
      });

      fireEvent.keyDown(tab1, { key: 'ArrowLeft' });

      expect(tab2).toHaveFocus();
      expect(
        screen.getByText("This is a heading for tab 2")
      ).toBeVisible();
    });
  });
});
