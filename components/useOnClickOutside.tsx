import { useEffect } from "react";

export function useOnClickOutside(
  ref: React.MutableRefObject<null> | React.MutableRefObject<HTMLDivElement>,
  handler: (event: React.BaseSyntheticEvent | MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (
      event: React.BaseSyntheticEvent | MouseEvent | TouchEvent
    ) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
