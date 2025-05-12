import React, { useRef, useState, useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import updatedColor from "../../assets/typed.svg";
import ChatContent from "./ChatContent";
import { exceuteQuery, logoutUser, chartGenerator } from "../../Api";
import TextAreaBox from "./TextAreaBox";
import AddDataPopup from "./AddData/AddDataPopup";
import LogoutIcon from "@mui/icons-material/Logout";
import { User2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import areoplane from "../../assets/areoplane.png";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const ChatBox = () => {
  const [query, setQuery] = useState("");
  const [isSliderVisible, setIsSliderVisible] = useState(false);
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
        console.log("Response : ", queryResponse);
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
    <div className=" bg-gradient-to-br from-[#2d1b45] to-[#2d1b45]  text-white min-h-screen w-full fixed overflow-hidden">
      <div className="flex flex-col md:flex-row h-full md:h-[100vh] w-full rounded-lg item-streched">
        {/* Slider Section - Responsive Width and Behavior */}
        <div
          className={`h-full transition-all duration-300 ease-in-out z-50
  ${isSliderVisible ? "w-[24vw] shadow-md" : "w-[6vw] shadow-md"}
  bg-gradient-to-b from-white to-white  
      text-gray-800 flex flex-col justify-between px-3`}
        >
          {/* Top - Toggle + Navigation Buttons */}

          <div className="">
            <div className="flex flex-row justify-between">
              {isSliderVisible && (
                <div className=" flex flex-row justify-center mt-2 ml-1">
                  <img
                    src={updatedColor}
                    className="w-6 h-6 text-[#2d1b54]"
                  ></img>
                  <span className="text-lg font-semibold text-gray-800 ml-2 mb-1">
                    Data Aanlysis
                  </span>
                </div>
              )}

              <div className="">
                <button
                  onClick={() => setIsSliderVisible(!isSliderVisible)}
                  className="hover:scale-110 transition-transform flex items-center justify-center ml-2 pt-3 "
                >
                  {/* <svg
                    width="27"
                    height="27"
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="8"
                      y="5"
                      width="30"
                      height="20"
                      rx="2"
                      ry="2"
                      fill="none"
                      stroke="#4B5563

"
                      stroke-width="3"
                    />
                    <rect
                      x="5"
                      y="5"
                      width="12"
                      height="20"
                      rx="2"
                      ry="2"
                      fill="#4B5563

"
                    />
                  </svg> */}
                  {isSliderVisible && <IoIosArrowBack />}
                  {!isSliderVisible && <IoIosArrowForward className="mx-5" />}
                </button>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex flex-col gap-2 font-sans">
                {/* New Chat Button */}
                <button
                  onClick={handleNewChatClick}
                  className="group flex items-center justify-center w-full rounded-md border border-blue-800 text-blue-800 hover:bg-blue-50 transition-all duration-200 px-4 py-1 gap-2 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26px"
                    height="26px"
                    viewBox="0 0 24 24"
                    class="stroke-blue-800 fill-none
                    group-hover:fill-none
                    group-active:duration-0 duration-300"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke-width="1.5"
                    ></path>
                    <path d="M8 12H16" stroke-width="1.5"></path>
                    <path d="M12 16V8" stroke-width="1.5"></path>
                  </svg>
                  {isSliderVisible && (
                    <span className="text-base font-medium">New analysis</span>
                  )}
                </button>
                <div
                  className="mt-2 ml-2 flex flex-row items-center hover:scale-105 relative group"
                  onClick={() => (window.location.href = "/")}
                >
                  <div className="bg-white p-2 rounded flex items-center justify-center transition duration-200 ease-in-out cursor-pointer">
                    <IoHomeOutline className="h-[17px] w-[17px]" />
                  </div>

                  {isSliderVisible ? (
                    <button className="ml-2 text-label text-gray-700">
                      Home Page
                    </button>
                  ) : (
                    <span className="absolute left-[25px] ml-2 w-[6vw] px-1.5 py-1 bg-gray-100 border border-gray-800 text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      Home Page
                    </span>
                  )}
                </div>
                <div className="ml-2 flex flex-row items-center hover:scale-105 relative group">
                  <div className="bg-white p-2 rounded flex items-center justify-center transition duration-200 ease-in-out cursor-pointer">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-[15px] h-[15px] stroke-gray-800 fill-none"
                      strokeWidth="3"
                    >
                      <path d="M27 4v27a1 1 0 0 1-1.625.781L16 24.281l-9.375 7.5A1 1 0 0 1 5 31V4a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4z" />
                    </svg>
                  </div>

                  {isSliderVisible ? (
                    <button className="ml-2 text-label text-gray-700">
                      Saved Cards
                    </button>
                  ) : (
                    // Tooltip shown on hover
                    <span className="absolute left-[25px] ml-2 w-[7vw] px-2 py-1 bg-gray-100 border border-gray-800 text-gray-800 text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      Saved Cards
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 pb-5">
            {/* Upgrade Plan Card */}
            {isSliderVisible && (
              <div className="flex justify-start  h-36 ">
                <div className="w-full bg-white flex flex-row items-end ">
                  {/* <img
                    src={updatedColor}
                    className="w-6 h-6 text-[#2d1b54]"
                  ></img>
                  <p className="text-label  font-semibold text-gray-700">
                    Upgrade Plan
                  </p> */}
                  <button className="group border-none w-full rounded-[10px] shadow-sm transition active:scale-100">
                    <span className="flex items-center justify-center bg-[#f6f3f3] rounded-[5px] px-[2px] py-[6px]  gap-[30px] transition group-active:scale-[0.97]">
                      <span className="flex items-center gap-[5px] text-base font-semibold text-[#8c8c8c]">
                        <p>Upgrade to</p>
                        <p className="bg-black text-white px-2 py-[2px] rounded-[5px]">
                          PRO
                        </p>
                      </span>
                      <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform rotate-45 transition group-hover:rotate-0">
                        <svg
                          viewBox="0 0 384 512"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-[15px]"
                        >
                          <path
                            fill="currentColor"
                            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                          />
                        </svg>
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* User Info */}
            <div className="flex items-center gap-3 hover:bg-white/10 px-2 py-3 rounded-xl transition-all cursor-pointer">
              <User2Icon className="w-6 h-6 text-gray-700" />
              {isSliderVisible && (
                <div>
                  <p className="text-message">
                    {localStorage.getItem("username")}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date().toISOString().split("T")[0]}
                  </p>
                </div>
              )}
            </div>

            {/* Logout */}
            <div
              className="flex items-center ml-2 hover:bg-red-500/20  rounded-xl transition-all cursor-pointer"
              onClick={handleLogout}
            >
              <LogoutIcon className="h-6 w-6 text-red-600" />
              {isSliderVisible && (
                <span className="btn-standard  text-red-500">Logout</span>
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
