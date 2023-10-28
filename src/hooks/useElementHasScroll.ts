import { MutableRefObject, useEffect, useState } from "react";

export const useCheckIfElementHaveScroll = (
  elementRef: MutableRefObject<any>,
) => {
  const [hasScroll, setHasScroll] = useState<boolean>(false);

  useEffect(() => {
    const checkScrollVisibility = () => {
      if (elementRef.current) {
        setHasScroll(
          elementRef.current.scrollHeight > elementRef.current.clientHeight,
        );
      }
    };

    // Attach event listener for scrolling
    if (elementRef.current) {
      elementRef.current.addEventListener("scroll", checkScrollVisibility);
      // Initial check
      checkScrollVisibility();
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (elementRef.current) {
        elementRef.current.removeEventListener("scroll", checkScrollVisibility);
      }
    };
  }, [
    elementRef.current,
    elementRef.current?.scrollHeight,
    elementRef.current?.clientHeight,
  ]);

  return hasScroll;
};
