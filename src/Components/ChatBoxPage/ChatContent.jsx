import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import ResponseCard from "./ResponseCard";
import Bot from "../../assets/serach.svg";
import main from "../../assets/main.png";
import ChatContentCard from "./FrontViewSuggestion/ChatContentCard";
import { motion } from "framer-motion";

const ChatContent = ({ chatMessages, setChatMessages, isSliderVisible }) => {
  const aiResponseRef = useRef(null);
  const chatContainerRef = useRef(null);
  const responseEndRef = useRef(null);

  useEffect(() => {
    if (
      chatMessages.chart &&
      chatMessages.chartType &&
      responseEndRef.current
    ) {
      responseEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages.chart, chatMessages.chartType]);

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
        bg-[#f0f1f9]
        border-rounded
        min-h-[40vh]
        mx-auto
        space-x-0
        flex 
        flex-col
        justify-start
        ${isSliderVisible ? "lg:max-w-[100%]" : "lg:max-w-[100%]"}
      `}
    >
      <div
        ref={chatContainerRef}
        className={`
           flex-wrap
          bg-[#f0f1f9]
          sm:p-2 
          space-y-1
          overflow-y-auto
          // scrollbar-hide
          w-full
          mt-0
          ${isSliderVisible ? "lg:max-w-[100vw]" : "lg:max-w-[100vw]"}
        `}
      >
        <div className="flex flex-row justify-start mt-1">
          <div className="flex flex-row gap-3 ">
            <div className="w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-sm">
              <img src={Bot} className="h-8 w-8 text-[rgb(244,242,250)]" />
            </div>
            <div className="bg-white border border-gray-200 shadow-md rounded-xl rounded-tl-sm py-2 px-4 max-w-[40vw] font-sans">
              <h2
                className="text-sm font-medium text-gray-800 "
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
            {chatMessages &&
              chatMessages.map((chat, index) => (
                <ResponseCard
                  key={index}
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
              ))}

            <div ref={responseEndRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContent;
