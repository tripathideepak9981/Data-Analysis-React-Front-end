import React, { useRef, useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import updatedColor from "../../assets/updated_color.svg";
import ChatContent from "./ChatContent";
import { exceuteQuery, logoutUser, chartGenerator } from "../../Api";
import TextAreaBox from "./TextAreaBox";
import AddDataPopup from "./AddData/AddDataPopup";
import LogoutIcon from "@mui/icons-material/Logout";
import { User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";

const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [isSliderVisible, setIsSliderVisible] = useState(true);
  const [chatMessages, setChatMessages] = useState([]);
  const [byDataPreview, setByDataPreview] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [chartResponse, setChartResponse] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const openDropdown = (event) => setAnchorEl(event.currentTarget);
  const [isAddDataPopupOpen, setIsAddDataPopupOpen] = useState(false);
  const closeDropdown = () => setAnchorEl(null);
  const [queryResponse, setQueryResponse] = useState(null);
  const [showIcon, setShowIcon] = useState(true);
  const lastScrollTop = useRef(0);
  const scrollContainerRef = useRef(null);
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

  const handleNewChatClick = () => {
    setChatMessages([]);
  };

  const sendMessage = async () => {
    if (!query.trim()) return;

    const newMessage = {
      userQuery: query,
      aiResponse: "...",
      chart: null,
      chartType: null,
    };

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    const currentMessageIndex = chatMessages.length;

    setQuery("");

    try {
      const response = await exceuteQuery(query);
      if (response) {
        setQueryResponse(response);
      }
      setChatMessages((prevMessages) => {
        return prevMessages.map((message, index) =>
          index === currentMessageIndex
            ? { ...message, aiResponse: response }
            : message
        );
      });
      // Fetch chart data and update message
      await fetchChartData(query, currentMessageIndex);
    } catch (e) {
      console.error("Error fetching AI response:", e);
      setChatMessages((prevMessages) =>
        prevMessages.map((message, index) =>
          index === prevMessages.length - 1
            ? { ...message, aiResponse: "Error fetching response." }
            : message
        )
      );
    }
  };

  const fetchChartData = async (query, messageIndex) => {
    try {
      const chartData = await chartGenerator(query);
      setChatMessages((prevMessages) =>
        prevMessages.map((message, index) =>
          index === messageIndex ? { ...message, chart: chartData } : message
        )
      );
      console.log("ChatMessages : ", chatMessages);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div
      className=" bg-gradient-to-br from-[#2d1b45] to-[#2d1b45]  
     
     text-white min-h-screen w-full fixed overflow-hidden pt-1"
    >
      <div className="flex flex-col md:flex-row h-full md:h-[99vh] w-full rounded-lg item-streched">
        {/* Slider Section - Responsive Width and Behavior */}
        <div
          className={`h-full transition-all duration-300 ease-in-out
  ${isSliderVisible ? "w-[25vw]" : "w-[6vw]"}
  bg-gradient-to-b from-[#2d1b45] to-[#2d1b45]  
      text-white flex flex-col justify-between px-3 shadow-2xl`}
        >
          {/* Top - Toggle + Navigation Buttons */}

          <div className="">
            <div className="flex flex-row justify-between">
              {isSliderVisible && (
                <div className=" flex flex-row justify-center mt-4 ml-2">
                  <img src={updatedColor} className="text-white w-7 h-7 "></img>
                  <span className="text-xl font-semibold mt-1 ml-2">
                    Data Aanlysis
                  </span>
                </div>
              )}

              <div className="">
                <button
                  onClick={() => setIsSliderVisible(!isSliderVisible)}
                  className="hover:scale-110 transition-transform flex items-center justify-center ml-2 pt-3 "
                >
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="8"
                      y="5"
                      width="30"
                      height="20"
                      rx="3"
                      ry="3"
                      fill="none"
                      stroke="#ffffff"
                      stroke-width="3"
                    />
                    <rect
                      x="5"
                      y="5"
                      width="15"
                      height="20"
                      rx="3"
                      ry="3"
                      fill="#ffffff"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex flex-col gap-2 font-sans">
                {/* New Chat Button */}
                <button
                  onClick={handleNewChatClick}
                  className="group flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md bg-[#6e5aa0] text-white font-medium hover:bg-[#8975bd] transition-all duration-200"
                >
                  <IoAddCircleOutline
                    className={
                      isSliderVisible
                        ? `w-5 h-5 group-hover:scale-110 transition-transform duration-200`
                        : `w-7 h-7 group-hover:scale-110`
                    }
                  />
                  {isSliderVisible && (
                    <span className="text-base">New Analysis</span>
                  )}
                </button>
                <div className="mt-2 ml-1 flex flex-row items-center">
                  <span>
                    {/* <img
                    src={SavedIcon}
                    className="w-4 h-4 text-white"
                    style={{ color: "white" }}
                  /> */}
                    <div className="bg-[#2d1b45] p-2 rounded flex items-center justify-center ml-1">
                      <svg
                        viewBox="0 0 32 32"
                        className="w-5 h-5 mt-1 stroke-white fill-none hover:scale-110"
                        strokeWidth="3"
                      >
                        <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z" />
                      </svg>
                    </div>
                  </span>
                  {isSliderVisible && (
                    <span className="mt-1 text-base text-gray-50 font-medium">
                      Saved Cards
                    </span>
                  )}
                </div>

                {/* Home Page Button */}
                {/* <button
                onClick={() => (window.location.href = "/")}
                className="group flex items-center justify-center gap-2 w-full px-4 py-2 rounded-md bg-[#6e5aa0] text-white font-medium hover:bg-[#2c1858] transition-all duration-200"
              >
                <IoHomeOutline className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                {isSliderVisible && <span className="text-sm">Home Page</span>}
              </button> */}
              </div>
            </div>
          </div>

          {/* {isSliderVisible && (
            <div className="w-full flex items-center justify-center max-w-md mx-auto">
              <Lottie animationData={bot} loop={true} className="w-48 h-48" />
            </div>
          )} */}
          <div className="flex flex-col gap-1 pb-2 text-sm font-medium">
            {/* Upgrade Plan Card */}
            {isSliderVisible && (
              <div className="flex justify-center h-36 ">
                <div className="w-full bg-white rounded-xl shadow-xl flex flex-col items-center justify-end">
                  <p className="text-xl mt-2  font-semibold text-gray-800">
                    Upgrade Plan
                  </p>
                  <img
                    src="src/assets/areoplane.png"
                    alt="Rocket"
                    className="w-40 h-40 object-contain"
                  />
                </div>
              </div>
            )}

            {/* User Info */}
            <div className="flex items-center gap-3 hover:bg-white/10 px-4 py-3 rounded-xl transition-all cursor-pointer">
              <User2Icon className="w-6 h-6 text-white" />
              {isSliderVisible && (
                <div>
                  <p className="text-sm font-semibold">
                    {localStorage.getItem("username")}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date().toISOString().split("T")[0]}
                  </p>
                </div>
              )}
            </div>

            {/* Logout */}
            <div
              className="flex items-center gap-3 hover:bg-red-500/20 px-4 py-3 rounded-xl transition-all cursor-pointer"
              onClick={handleLogout}
            >
              <LogoutIcon className="h-6 w-6 text-red-400" />
              {isSliderVisible && (
                <span className="text-sm font-semibold text-red-300">
                  Logout
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Chat Box Section - Responsive Width */}
        <div
          id="chatbox"
          className={`flex flex-col justify-between 
            w-full 
        ${
          isSliderVisible
            ? "flex flex-col w-full max-w-[80%] mx-auto py-1  md:py-1 bg-[#f0f1f9] shadow-lg   border"
            : " flex flex-col w-full max-w-[94%] mx-auto py-1 md:py-1 bg-[#f0f1f9] shadow-lg  border"
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
                className="right-2 top-2 cursor-pointer p-2 rounded-full transition text-gray-800 fixed"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <MoreVertIcon />
              </div>
            )}
            {isDropdownOpen && (
              <div className="absolute right-8 top-8 bg-gray-800 shadow-lg rounded-md p-2 z-10">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className=" px-4 py-2 hover:bg-white-200 w-full text-left"
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
            {/* Chat Content Component */}
            <ChatContent
              chatMessages={chatMessages}
              isSliderVisible={isSliderVisible}
              fetchChartData={fetchChartData}
              setChatMessages={setChatMessages}
            />
          </div>

          {/* Message Input Section - Responsive Layout */}
          <div className="flex items-center w-full">
            <TextAreaBox
              query={query}
              setQuery={setQuery}
              sendMessage={sendMessage}
              openDropdown={openDropdown}
              closeDropdown={closeDropdown}
              anchorEl={anchorEl}
              openAddDataPopup={openAddDataPopup}
              isSliderVisible={isSliderVisible}
              setByDataPreview={setByDataPreview}
            />
            {isAddDataPopupOpen && (
              <div
                className="fixed inset-0 flex items-center 
              justify-center bg-black bg-opacity-40 z-50"
              >
                <div className="bg-white rounded-xl left-14 px-8 py-4 shadow-lg max-w-[65vw] h-full max-h-[90vh] w-full relative">
                  <button
                    className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-xl"
                    onClick={closeAddDataPopup}
                  >
                    &times;
                  </button>
                  <AddDataPopup byDataPreview={byDataPreview} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatBox;
