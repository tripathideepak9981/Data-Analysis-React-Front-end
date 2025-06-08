import { useState, useEffect, useRef } from "react";
import { useTypeWriter } from "./TypeWriterContext";
import { formatMarkdown } from "../../utils/textFormater.js";

const TypeWriter = ({ text, className, index, delay = 3 }) => {
  const [displayText, setDisplayText] = useState("");
  const { activeIndex, activeLine, nextLine, nextSequence } = useTypeWriter();
  const isActive = activeIndex === index;

  const containerRef = useRef(null); // 👈 Ref to scroll to

  useEffect(() => {
    if (!isActive) {
      if (activeIndex > index) {
        setDisplayText(formatMarkdown(text));
      }
      return;
    }

    const lines = text.split("\n").filter((line) => line.trim());

    if (activeLine >= lines.length) {
      nextSequence();
      return;
    }

    let currentIndex = 0;
    const currentLineText = lines[activeLine];

    const timer = setInterval(() => {
      if (currentIndex < currentLineText.length) {
        setDisplayText(() => {
          const prevLines = lines.slice(0, activeLine).map(formatMarkdown);
          return [
            ...prevLines,
            currentLineText.slice(0, currentIndex + 1),
          ].join("\n");
        });
        currentIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setDisplayText((prev) => {
            const formattedLine = formatMarkdown(currentLineText);
            return prev.slice(0, -currentLineText.length) + formattedLine;
          });

          // 👇 Scroll to this line after it's done
          setTimeout(() => {
            containerRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 50); // tiny delay to ensure DOM update

          nextLine();
        }, 100);
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay, isActive, activeIndex, activeLine]);

  return (
    <div
      ref={containerRef}
      className={`${className} space-y-2`}
      dangerouslySetInnerHTML={{ __html: displayText }}
    />
  );
};

export default TypeWriter;
