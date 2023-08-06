import { useEffect, useRef, useState } from "react";

const useTab = (itemsCount: number) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null);
  const onTabClicked = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const current = ref.current;

    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          setSelectedIndex((index) => {
            return (index + 1) % itemsCount;
          });
          break;
        case "ArrowLeft":
          setSelectedIndex((index) => {
            if (index === 0) {
              return itemsCount - 1;
            }
            return (index - 1) % itemsCount;
          });
          break;
        default:
          break;
      }
    };

    if (current) {
      current.addEventListener("keydown", onKeyDown);
    }

    return () => {
      if (current) {
        current.removeEventListener("keydown", onKeyDown);
      }
    };
  });

  return {
    selectedIndex,
    ref,
    onTabClicked,
  };
};

export default useTab;
