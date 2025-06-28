import { useEffect, useRef } from "react";
import Typed from "typed.js";
import ResponseCard from "./ResponseCard";
import { BarChart3 } from "lucide-react";

const ChatContent = ({ chatMessages, setChatMessages, isSliderVisible }) => {
  const aiResponseRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (aiResponseRef.current) {
      const typedAI = new Typed(aiResponseRef.current, {
        strings: [
          "I'm here to analyze your data, just tell me what you're looking for!",
        ],
        typeSpeed: 20,
        showCursor: false,
      });

      return () => typedAI.destroy();
    }
  }, []);

  return (
    <div
      className={`
        w-full 
        border-rounded
        min-h-[40vh]
        mx-auto
        space-x-0
        flex 
        flex-col
        justify-start
        user-query
        ${isSliderVisible ? "w-[100%]" : "w-[100%]"}
      `}
    >
      <div
        ref={chatContainerRef}
        className={`
           flex-wrap
          sm:p-2 
          space-y-1
          overflow-y-auto
          // scrollbar-hide
          w-full
          mt-0
          ${isSliderVisible ? "lg:max-w-[78vw]" : "lg:max-w-[94vw]"}
        `}
      >
        <div className="flex flex-row justify-start mt-1">
          <div className="flex flex-row gap-3 ">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 shadow-lg shadow-purple-400/30">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white border border-gray-200 shadow-md rounded-xl rounded-tl-sm py-2 px-4 max-w-[42vw] font-sans">
              <h2
                className="user-query text-gray-800 "
                ref={aiResponseRef}
              ></h2>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex flex-col gap-5">
          <div
            className="
            space-y-1 
            w-full 
            mx-auto
            h-auto
          "
            style={{ fontSize: "clamp(10px, 2vw, 20px)" }}
          >
            {chatMessages.map((chat, index) => {
              const isLast = index === chatMessages.length - 1;

              return (
                <div
                  key={index}
                  // ref={isLast ? responseEndRef : null} // Apply ref only to last item
                >
                  <ResponseCard
                    response={chat}
                    showInterruptMessage={chat.interrupted === true}
                    onUpdateSQL={(updatedSQL) => {
                      setChatMessages((prevMessages) =>
                        prevMessages.map((msg, i) =>
                          i === index
                            ? {
                                ...msg,
                                aiResponse: {
                                  ...msg.aiResponse,
                                  sql_query: updatedSQL,
                                },
                              }
                            : msg
                        )
                      );
                    }}
                  />
                </div>
              );
            })}

            {/* <div ref={responseEndRef}></div>? */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
