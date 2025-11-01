import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import ResponseCard from "./ResponseCard";
import { BarChart3 } from "lucide-react";
import CardOption from "./CardOption";

const ChatContent = ({ chatMessages, setChatMessages, isSliderVisible }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [renderedCards, setRenderedCards] = useState([]);
  const [firstRenderedCard, setFirstRenderedCard] = useState(null);

  const fileRef = useRef(null);
  const dbRef = useRef(null);
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (Array.isArray(chatMessages) && chatMessages.length === 0) {
      setSelectedCards([]);
      setRenderedCards([]); // Optional: reset rendered animation
      setFirstRenderedCard(null);
    }
  }, [chatMessages]);

  const typedContent = {
    File: {
      ref: fileRef,
      strings: [
        `📊 <strong>Upload Excel/CSV File</strong><br><br>
        <div style="margin-bottom: 8px;">• <span style="color: #10b981;">Upload Excel/CSV files</span> for instant data parsing</div>
        <div style="margin-bottom: 8px;">• <span style="color: #10b981;">Automatic column detection</span> and data preview</div>
        <div style="margin-bottom: 8px;">• <span style="color: #10b981;">No database setup required</span> - just drag and drop</div>
        <div style="margin-bottom: 8px;">• <span style="color: #10b981;">Quick insights and summaries</span> powered by AI</div>
        <div style="margin-bottom: 12px;">• <span style="color: #10b981;">Multiple file format support</span> (.xlsx, .csv, .xls)</div>
        🚀 <em>Please Upload your First File and Start Analysis</em>`,
      ],
    },
    Database: {
      ref: dbRef,
      strings: [
        `🔗 <strong>Connect to Database</strong><br><br>
        <div style="margin-bottom: 8px;">• <span style="color: #3b82f6;">SQL, PostgreSQL, MongoDB</span> and more supported</div>
        <div style="margin-bottom: 8px;">• <span style="color: #3b82f6;">Secure credential-based access</span> with encryption</div>
        <div style="margin-bottom: 8px;">• <span style="color: #3b82f6;">Real-time query and analysis</span> capabilities</div>
        <div style="margin-bottom: 8px;">• <span style="color: #3b82f6;">Large, live dataset handling</span> with optimization</div>
        <div style="margin-bottom: 12px;">• <span style="color: #3b82f6;">Continuous data syncing</span> for up-to-date insights</div>
        ⚡ <em>Connect any database and start Analysis</em>`,
      ],
    },
  };

  useEffect(() => {
    const intervals = [];

    selectedCards.forEach((type) => {
      const content = typedContent[type];
      if (!content?.ref?.current) return;

      // Skip if already rendered
      if (renderedCards.includes(type)) return;

      const typed = new Typed(content.ref.current, {
        strings: content.strings,
        typeSpeed: 10,
        showCursor: false,
        smartBackspace: true,
        onBegin: () => {
          if (type === firstRenderedCard) {
            const interval = setInterval(() => {
              if (chatContainerRef.current) {
                chatContainerRef.current.scrollTo({
                  top: chatContainerRef.current.scrollHeight,
                  behavior: "smooth",
                });
              }
            }, 50);
            intervals.push(interval);
          }
        },
        onComplete: () => {
          intervals.forEach(clearInterval);
          setRenderedCards((prev) => [...new Set([...prev, type])]);
        },
      });

      return () => {
        typed.destroy();
        intervals.forEach(clearInterval);
      };
    });
  }, [selectedCards, firstRenderedCard, renderedCards]);

  const handleCardSelect = (card) => {
    setSelectedCards((prev) => {
      if (!prev.includes(card)) {
        if (prev.length === 0) {
          setFirstRenderedCard(card);
        }
        return [...prev, card];
      }
      return prev;
    });
  };

  return (
    <div
      className={`w-full pt-6 min-h-[40vh] mx-auto space-x-0 flex flex-col justify-start user-query ${
        isSliderVisible ? "w-[100%]" : "w-[100%]"
      }`}
    >
      <div
        ref={chatContainerRef}
        className={`flex-wrap sm:p-2 space-y-1 overflow-y-auto max-h-[80vh] scrollbar-hide w-full mt-0 ${
          isSliderVisible ? "lg:max-w-[78vw]" : "lg:max-w-[94vw]"
        }`}
      >
        {chatMessages.length == 0 && (
          <>
            <CardOption setCardSelected={handleCardSelect} />

            {selectedCards.length > 0 && (
              <div className="flex w-full justify-between items-start px-10 gap-4 flex-wrap">
                {selectedCards.includes("File") && (
                  <div className="flex gap-3">
                    <div
                      className={`border-l-4 border-l-green-500 hover:shadow-2xl transition-all duration-500 bg-white border-gray-200 rounded-2xl py-4 px-10 max-w-[35vw] font-sans shadow-xl border w-full ${
                        isSliderVisible ? "min-w-[32vw]" : "min-w-[40vw]"
                      }`}
                    >
                      <h2
                        className="font-semibold text-gray-800 "
                        ref={fileRef}
                      ></h2>
                    </div>
                  </div>
                )}

                {selectedCards.includes("Database") && (
                  <div className="flex gap-3 justify-end ml-auto">
                    <div
                      className={`border-l-4 border-l-blue-500 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border-gray-200 rounded-2xl py-4 px-10 max-w-[35vw] font-sans  border w-full ${
                        isSliderVisible ? "min-w-[32vw]" : "min-w-[40vw]"
                      }`}
                    >
                      <h2
                        className="font-semibold text-gray-800"
                        ref={dbRef}
                      ></h2>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
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
                  isTypingCard={!!selectedCards.length}
                  isSelectedCard={index === selectedCards?.id}
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
