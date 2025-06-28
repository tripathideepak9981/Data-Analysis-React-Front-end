import { useRef, useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Sidebar from "./Sidebar";
import { FileText, Plus, BarChart3, LogOut, Crown } from "lucide-react";
import updatedColor from "../../assets/typed.svg";
import ChatContent from "./ChatContent";
import { exceuteQuery, logoutUser } from "../../Api";
import TextAreaBox from "./TextAreaBox";
import AddDataPopup from "./AddData/AddDataPopup";
import LogoutIcon from "@mui/icons-material/Logout";
import { motion } from "framer-motion";
import { User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import PopupJoin from "./PopupForm/PopupJoin";
import { CheckCircle, X } from "lucide-react"; // or use any icon library

const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showChatNotification, setShowChatNotification] = useState(false);
  const [isAddDataPopupOpen, setIsAddDataPopupOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(true);
  const lastScrollTop = useRef(0);
  const scrollContainerRef = useRef(null);
  const [suggestionQuery, setSuggestionQuery] = useState();
  const [openPopupJoin, setOpenPopupJoin] = useState(false);
  const [queryRunning, setQueryRunning] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

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

      if (scrollTop > lastScrollTop.current) {
        setShowIcon(false); // Scrolling down
      } else {
        setShowIcon(true); // Scrolling up
      }

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

  const closeAddDataPopup = () => {
    setIsAddDataPopupOpen(false);
  };

  const openedPopupJoin = () => {
    setOpenPopupJoin(true);
  };

  const closeOpenedPopupJoin = () => {
    setOpenPopupJoin(false);
  };

  const handleNewChatClick = () => {
    toast.success("New analysis started", {
      hideProgressBar: true,
      toastId: "new-analysis",
      autoClose: 2000,
      closeOnClick: true,
    });
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
      timestamp: new Date(), // ✅ Add current time
    };

    let newMessageIndex = 0;

    setChatMessages((prevMessages) => {
      newMessageIndex = prevMessages.length;
      return [...prevMessages, newMessage];
    });

    setQuery("");
    setQueryRunning(true);

    try {
      const response = await exceuteQuery(query);

      if (response) {
        console.log("Response : ", response);
      }

      if (response.name == "AxiosError") {
        setChatMessages((prevMessages) =>
          prevMessages.map((message, index) => {
            if (index !== newMessageIndex) return message;
            if (message.interrupted) return message;

            return {
              ...message,
              aiResponse: {
                error: "Your session has been experied, Relogin again to query",
              },
              interrupted: false,
            };
          })
        );
      } else {
        const hasNumericData =
          Array.isArray(response.result) &&
          response.result.some((obj) =>
            Object.values(obj).some((value) => typeof value === "number")
          );

        setChatMessages((prevMessages) =>
          prevMessages.map((message, index) => {
            if (index !== newMessageIndex) return message;
            if (message.interrupted) return message;

            return {
              ...message,
              aiResponse: response,
              ...(response?.result?.length > 2 &&
                hasNumericData && {
                  chart: transformChartData(response.result),
                  chartType: "bar",
                }),
              interrupted: false,
            };
          })
        );
      }
    } catch (e) {
      console.error("Error fetching AI response:", e);
      setChatMessages((prevMessages) =>
        prevMessages.map((message, index) => {
          if (index !== newMessageIndex) return message;
          return {
            ...message,
            aiResponse: message.interrupted
              ? message.aiResponse
              : "Error fetching response.",
          };
        })
      );
    } finally {
      setQueryRunning(false);
    }
  };

  function transformChartData(result) {
    if (!Array.isArray(result) || result.length === 0) {
      return {
        labels: [],
        data: [],
        multi_value: false,
        keys: [],
      };
    }

    const allKeys = Object.keys(result[0]);
    const labelKey = allKeys[0];
    const valueKeys = allKeys.slice(1);

    const labels = result.map((item) => item[labelKey]);

    const multi_value = valueKeys.length > 1;

    // Prepare data based on whether it's single or multi-value
    const data = multi_value
      ? valueKeys.map((key) => result.map((item) => item[key]))
      : result.map((item) => item[valueKeys[0]]);

    return {
      labels,
      data,
      keys: valueKeys,
      multi_value,
    };
  }

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
            {showIcon && (
              <div
                className="right-2 top-2 cursor-pointer p-1 rounded-full transition text-gray-800 fixed"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <MoreVertIcon className="w-[5px] h-[5px]" />
              </div>
            )}
            {isDropdownOpen && (
              <div className="absolute right-8 top-8 bg-gray-100 text-message text-gray-800 shadow-lg rounded-md p-2 z-10">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className=" px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  Table Preview
                </button>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left "
                >
                  Other Options
                </button>
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
                <div className="left-14 -top-8 px-6 py-2 max-w-[70%] h-full max-h-[85%] w-full relative">
                  <AddDataPopup
                    closeAddDataPopup={closeAddDataPopup}
                    setShowChatNotification={setShowChatNotification}
                    setSuggestionQuery={setSuggestionQuery}
                  />
                </div>
              </div>
            )}

            {openPopupJoin && (
              <PopupJoin closeOpenedPopupJoin={closeOpenedPopupJoin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
