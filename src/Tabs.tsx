import { TabsProps } from "./types";
import {useEffect, createRef} from "react";

import "./Tabs.css";
import useTab from "./useTab";

export function Tabs({ items }: TabsProps) {
  const {selectedIndex, ref, onTabClicked} = useTab(items.length);

  const tabRefs = items.reduce((acc, current, index) => {
    acc[index] = createRef<HTMLButtonElement>();
    return acc;
  }, {} as { [key: string]: React.RefObject<HTMLButtonElement> });

  useEffect(() => {
    tabRefs[selectedIndex].current?.focus();
  }, [selectedIndex])

  return (
    <div className="tabs-container">
      <div role="tablist" ref={ref}>
        {items.map((item, index) => {
          return (
            <button
              key={item.label}
              role="tab"
              aria-selected={selectedIndex === index}
              onClick={() => onTabClicked(index)}
              tabIndex={selectedIndex === index ? 0 : -1}
              ref={tabRefs[index]}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item, index) => {
        return (
          <div
            role="tabpanel"
            key={item.label}
            tabIndex={selectedIndex === index ? 0 : -1}
            hidden={index !== selectedIndex}
          >
            {'heading' in item.content ? item.content.heading : item.content}
          </div>
        );
      })}
    </div>
  );
}
