import { useRef, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatContent from "./ChatContent";
import { exceuteQuery, logoutUser } from "../../Api";
import TextAreaBox from "./TextAreaBox";
import AddDataPopup from "./AddData/AddDataPopup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PopupJoin from "./PopupForm/PopupJoin";
import { CheckCircle, X } from "lucide-react";
import { transformChartData } from "./utilFunctions";
import CustomNotificationCard from "../Card/CustomNotificationCard.jsx";

const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [showChatNotification, setShowChatNotification] = useState(false);
  const [isAddDataPopupOpen, setIsAddDataPopupOpen] = useState(false);
  const lastScrollTop = useRef(0);
  const scrollContainerRef = useRef(null);
  const [suggestionQuery, setSuggestionQuery] = useState();
  const [openPopupJoin, setOpenPopupJoin] = useState(false);
  const [queryRunning, setQueryRunning] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [dbType, setDbType] = useState(
    () => sessionStorage.getItem("dbType") || ""
  );

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [showNewChatNotification, setShowNewChatNotification] = useState(false);

  useEffect(() => {
    const syncDbType = () => {
      setDbType(sessionStorage.getItem("dbType") || "");
    };

    window.addEventListener("storage", syncDbType);
    window.addEventListener("session-storage", syncDbType);

    return () => {
      window.removeEventListener("storage", syncDbType);
      window.removeEventListener("session-storage", syncDbType);
    };
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("suggested_question");
    if (storedData) {
      setSuggestionQuery(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (!isAddDataPopupOpen) {
      const timer = setTimeout(() => {
        setShowChatNotification(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAddDataPopupOpen]);

  useEffect(() => {
    const scrollEl = scrollContainerRef.current;
    if (!scrollEl) return; // Prevent error if ref is not attached yet

    const handleScroll = () => {
      const scrollTop = scrollEl.scrollTop;

      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    scrollEl.addEventListener("scroll", handleScroll);

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openAddDataPopup = () => {
    setIsAddDataPopupOpen(true);
  };
  const handleAlertClose = () => {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("username");

    navigate("/signInPage");
  };

  const closeAddDataPopup = () => {
    const uploadedFile = localStorage.getItem("uploadedFiles");
    if (uploadedFile.length > 0) {
      setShowChatNotification(true);
      setTimeout(() => {
        setShowChatNotification(false);
      }, 3000);
    }
    setIsAddDataPopupOpen(false);
  };

  const openedPopupJoin = () => {
    setOpenPopupJoin(!openPopupJoin);
  };

  const closeOpenedPopupJoin = () => {
    setOpenPopupJoin(false);
  };

  const handleNewChatClick = () => {
    setShowNewChatNotification(true);
    setChatMessages([]);
  };
  const sendMessage = async () => {
    if (!query.trim()) return;

    const newMessage = {
      userQuery: query,
      aiResponse: "...",
      chart: null,
      chartType: null,
      interrupted: false,
      timestamp: new Date(),
    };

    let newMessageIndex = 0;

    // Add the message to chat
    setChatMessages((prevMessages) => {
      newMessageIndex = prevMessages.length;
      return [...prevMessages, newMessage];
    });

    setQuery("");
    setQueryRunning(true);

    try {
      const response = await exceuteQuery(query);

      const hasNumericData =
        Array.isArray(response.result) &&
        response.result.some((obj) =>
          Object.values(obj).some((value) => typeof value === "number")
        );

      // ✅ Update only the successful message
      setChatMessages((prevMessages) =>
        prevMessages.map((message, index) => {
          if (index !== newMessageIndex) return message;
          if (message.interrupted) return message;

          return {
            ...message,
            aiResponse: response,
            ...(response?.result?.length > 3 &&
              hasNumericData && {
                chart: transformChartData(response.result),
                chartType: "bar",
              }),
            interrupted: false,
          };
        })
      );
    } catch (error) {
      console.log("Error fetching AI response:", error);

      const errorMessage =
        error?.response?.data?.detail ||
        "Something went wrong. Please try again.";

      // ✅ Remove the failed message from chat
      setChatMessages((prevMessages) =>
        prevMessages.filter((_, index) => index !== newMessageIndex)
      );

      // ✅ Show notification
      setAlertMessage(
        errorMessage + " First Upload File or Connect to Database"
      );
      setAlertVisible(true);
      setTimeout(() => setAlertVisible(false), 4000);
    } finally {
      setQueryRunning(false);
    }
  };

  const stopExecution = () => {
    setQueryRunning(false);
    setChatMessages((prevMessages) =>
      prevMessages.map((msg, index) =>
        index === prevMessages.length - 1
          ? {
              ...msg,
              interrupted: true,
              aiResponse:
                "Query execution was cancelled as requested. Let me know if you'd like to try again or modify your query.",
            }
          : msg
      )
    );
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      const response = await logoutUser();
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(async () => {
        setLogoutLoading(false);
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50  text-white min-h-screen h-full w-full fixed overflow-hidden">
      <div className="flex flex-col md:flex-row h-full  w-full rounded-lg item-streched">
        {/* Slider Section - Responsive Width and Behavior */}

        <Sidebar
          isSliderVisible={isSliderVisible}
          setIsSliderVisible={setIsSliderVisible}
          handleNewChatClick={handleNewChatClick}
          handleLogout={handleLogout}
          logoutLoading={logoutLoading}
        />

        {/* Chat Box Section - Responsive Width */}
        <div
          id="chatbox"
          className={`flex flex-col justify-between 
            w-full 
        ${
          isSliderVisible
            ? "flex flex-col w-full max-w-[100%]   bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow-2xl   border"
            : " flex flex-col w-full max-w-[100%]   bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 shadow-lg  border"
        } 
        transition-all duration-300 style={{ fontSize: moderateScale(16) }}`}
        >
          {/* Chat Content - Responsive Scrolling and Padding */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-scroll scrollbar-hide  rounded-lg  relative"
          >
            {dbType && (
              <div className="absolute top-1 right-4 flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full shadow-md text-sm font-medium">
                Connected
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </div>
            )}

            {showChatNotification && !isAddDataPopupOpen && (
              <motion.div
                className="fixed top-4 right-3 z-50"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <div className="relative flex items-start gap-4 bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 w-[360px]">
                  {/* Success Icon */}
                  <div className="mt-1 text-green-600">
                    <CheckCircle size={24} />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold text-gray-900">
                      You're All Set!
                    </h2>
                    <p className="text-sm text-gray-600">
                      Your data is ready — start your analysis now.
                    </p>
                  </div>

                  {/* Close Icon */}
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    aria-label="Close"
                    onClick={() => setShowChatNotification(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {showNewChatNotification && (
              <motion.div
                className="fixed top-4 right-3 z-50"
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <div className="relative flex items-start gap-4 bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-4 w-[360px] mt-4">
                  {/* Success Icon */}
                  <div className="mt-1 text-green-600">
                    <CheckCircle size={24} />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold text-gray-900">
                      New Analysis Created!
                    </h2>
                    <p className="text-sm text-gray-600">
                      Your data is ready — start your analysis now.
                    </p>
                  </div>

                  {/* Close Icon */}
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    aria-label="Close"
                    onClick={() => setShowNewChatNotification(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Chat Content Component */}
            <ChatContent
              chatMessages={chatMessages}
              isSliderVisible={isSliderVisible}
              // fetchChartData={fetchChartData}
              setChatMessages={setChatMessages}
              suggestionQuery={suggestionQuery}
            />
          </div>

          {/* Message Input Section - Responsive Layout */}
          <div className="flex items-center w-full">
            <TextAreaBox
              query={query}
              setQuery={setQuery}
              sendMessage={sendMessage}
              openAddDataPopup={openAddDataPopup}
              isSliderVisible={isSliderVisible}
              suggestionQuery={suggestionQuery}
              openedPopupJoin={openedPopupJoin}
              queryRunning={queryRunning}
              stopExecution={stopExecution}
            />
            {isAddDataPopupOpen && (
              <div
                className="fixed inset-0 flex items-center 
              justify-center bg-black bg-opacity-40 z-50"
              >
                <div className="left-14 -top-4  px-8 py-2 max-w-[65%] h-full max-h-[90%] w-full relative rounded-2xl">
                  <AddDataPopup
                    closeAddDataPopup={closeAddDataPopup}
                    setSuggestionQuery={setSuggestionQuery}
                  />
                </div>
              </div>
            )}

            {openPopupJoin && (
              <PopupJoin closeOpenedPopupJoin={closeOpenedPopupJoin} />
            )}

            {alertVisible && (
              <CustomNotificationCard
                title="Error"
                text={alertMessage}
                onClose={() => setAlertVisible(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
