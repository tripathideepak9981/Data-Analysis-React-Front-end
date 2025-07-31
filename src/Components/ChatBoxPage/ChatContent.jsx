import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import ResponseCard from "./ResponseCard";
import { BarChart3 } from "lucide-react";
import CardOption from "./CardOption";

const ChatContent = ({ chatMessages, setChatMessages, isSliderVisible }) => {
  const [cardSelected, setCardSelected] = useState(null);
  const aiResponseRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (!aiResponseRef.current || !cardSelected) return;

    let stringsToType = [];

    if (cardSelected === "File") {
      stringsToType = [
        `📊 <strong >Upload Excel/CSV File</strong><br><br>
  <div style="margin-bottom: 8px;">• <span style="color: #10b981;">Upload Excel/CSV files</span> for instant data parsing</div>
  <div style="margin-bottom: 8px;">• <span style="color: #10b981;">Automatic column detection</span> and data preview</div>
  <div style="margin-bottom: 8px;">• <span style="color: #10b981;">No database setup required</span> - just drag and drop</div>
  <div style="margin-bottom: 8px;">• <span style="color: #10b981;">Quick insights and summaries</span> powered by AI</div>
  <div style="margin-bottom: 12px;">• <span style="color: #10b981;">Multiple file format support</span> (.xlsx, .csv, .xls)</div>
  🚀 <em>Perfect for quick analysis and one-time reports!</em>`,
      ];
    } else if (cardSelected === "Database") {
      stringsToType = [
        `🔗 <strong>Connect to Database</strong><br><br>
  <div style="margin-bottom: 8px;">• <span style="color: #3b82f6;">SQL, PostgreSQL, MongoDB</span> and more supported</div>
  <div style="margin-bottom: 8px;">• <span style="color: #3b82f6;">Secure credential-based access</span> with encryption</div>
  <div style="margin-bottom: 8px;">• <span style="color: #3b82f6;">Real-time query and analysis</span> capabilities</div>
  <div style="margin-bottom: 8px;">• <span style="color: #3b82f6;">Large, live dataset handling</span> with optimization</div>
  <div style="margin-bottom: 12px;">• <span style="color: #3b82f6;">Continuous data syncing</span> for up-to-date insights</div>
  ⚡ <em>Best for enterprise-level data operations!</em>`,
      ];
    }

    let scrollInterval;

    const typedAI = new Typed(aiResponseRef.current, {
      strings: stringsToType,
      typeSpeed: 10,
      showCursor: false,
      smartBackspace: true,
      onBegin: () => {
        scrollInterval = setInterval(() => {
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
              top: chatContainerRef.current.scrollHeight,
              behavior: "smooth",
            });
          }
        }, 50);
      },
      onComplete: () => {
        if (scrollInterval) clearInterval(scrollInterval);
      },
    });

    return () => {
      typedAI.destroy();
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [cardSelected]);

  return (
    <div
      className={`w-full border-rounded min-h-[40vh] mx-auto space-x-0 flex flex-col justify-start user-query ${
        isSliderVisible ? "w-[100%]" : "w-[100%]"
      }`}
    >
      <div
        ref={chatContainerRef}
        className={`flex-wrap sm:p-2 space-y-1 overflow-y-auto max-h-[80vh] scrollbar-hide w-full mt-0 ${
          isSliderVisible ? "lg:max-w-[78vw]" : "lg:max-w-[94vw]"
        }`}
      >
        {/* Card selection UI */}
        <CardOption setCardSelected={setCardSelected} />

        {/* AI Response Area */}
        {cardSelected && (
          <div className="flex flex-row justify-start mt-1">
            <div className="flex flex-row gap-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 shadow-lg shadow-purple-400/30">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white border-gray-200 rounded-tl-sm py-4 px-4 max-w-[50vw] font-sans rounded-2xl  shadow-lg border w-full min-w-[40vw] mb-4">
                <h2
                  className="font-semibold text-gray-800"
                  ref={aiResponseRef}
                ></h2>
              </div>
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex flex-col gap-5">
          <div
            className="space-y-1 w-full mx-auto h-auto"
            style={{ fontSize: "clamp(10px, 2vw, 20px)" }}
          >
            {chatMessages.map((chat, index) => (
              <div key={index}>
                <ResponseCard
                  response={chat}
                  index={index}
                  setChatMessages={setChatMessages}
                  showInterruptMessage={chat.interrupted === true}
                  isTypingCard={!!cardSelected}
                  isSelectedCard={index === cardSelected?.id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
