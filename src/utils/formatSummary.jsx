import TypeWriter from "../Components/ChatBoxPage/typeWriter";
import { TypeWriterProvider } from "../Components/ChatBoxPage/typeWriterContext";
export default function formatSummary(summaryObj, ref = null) {
  if (!summaryObj) return null;

  const formatText = (text) => {
    text = text.replace(
      /(["'])([^"']+?)\1/g,
      '<span class="font-bold">"$2"</span>'
    );
    text = text.replace(/(\d+(\.\d+)?%)/g, '<span class="font-bold">$1</span>');
    text = text.replace(
      /(?<![a-zA-Z])(\d+(\.\d+)?)(?![%\w])/g,
      '<span class="font-bold">$1</span>'
    );
    return text;
  };

  const summary = summaryObj.trim();
  const paragraphs = summary.split("\n").filter((para) => para.trim() !== "");

  return (
    <TypeWriterProvider>
      <div
        ref={ref} // ✅ Pass it from outside
        className="bg-white py-2 px-4 space-y-3 text-gray-900"
      >
        {paragraphs.map((para, index) => {
          let className = " leading-relaxed text-gray-800 ";

          if (/^# /.test(para)) {
            className = " border-b pb-1 text-gray-900";
            para = para.replace(/^# /, "");
          } else if (/^## /.test(para)) {
            className = " mt-3 text-gray-900";
            para = para.replace(/^## /, "");
          } else if (/^\* /.test(para)) {
            className = "ml-6 list-disc user-query  text-gray-800 ";
          }

          const formattedText = formatText(para);

          return (
            <TypeWriter
              key={index}
              index={index}
              text={formattedText}
              className={className}
              as="p"
              dangerouslySetInnerHTML={{ __html: formattedText }}
            />
          );
        })}
      </div>
    </TypeWriterProvider>
  );
}
