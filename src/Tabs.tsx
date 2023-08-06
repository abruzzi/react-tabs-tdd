import { TabsProps } from "./types";
import {useEffect, useState, useRef, createRef} from "react";

import "./Tabs.css";

export function Tabs({ items }: TabsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null);
  const onTabClicked = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const current = ref.current;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
          setSelectedIndex((index) => (index + 1) % items.length);
          break;
        case 'ArrowLeft':
          setSelectedIndex((index) => {
            if(index === 0) {
              return items.length - 1;
            }
            return (index - 1) % items.length;
          });
          break;
        default:
          break;
      }
    };

    if(current) {
      current.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if(current) {
        current.removeEventListener('keydown', onKeyDown);
      }
    }
  });

  const tabRefs = items.reduce((acc, current, index) => {
    acc[index] = createRef<HTMLDivElement>();
    return acc;
  }, {} as { [key: string]: React.RefObject<HTMLDivElement> });

  useEffect(() => {
    tabRefs[selectedIndex].current?.focus();
  }, [selectedIndex])

  return (
    <div className="tabs-container">
      <div role="tablist" ref={ref}>
        {items.map((item, index) => {
          return (
            <div
              key={item.label}
              role="tab"
              aria-selected={selectedIndex === index}
              onClick={() => onTabClicked(index)}
              tabIndex={selectedIndex === index ? 0 : -1}
              ref={tabRefs[index]}
            >
              {item.label}
            </div>
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
            {item.content.heading}
          </div>
        );
      })}
    </div>
  );
}
