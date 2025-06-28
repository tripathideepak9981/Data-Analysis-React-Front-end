import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Home,
  BarChart3,
  Upload,
  FileText,
  User,
  Settings,
  Plus,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { cn } from "../home/util";
import { Button } from "./ui/button";
import { UpgradeCard } from "./UpgradeCard";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const Sidebar = ({
  isSliderVisible,
  setIsSliderVisible,
  handleNewChatClick,
  handleLogout,
  logoutLoading,
}) => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("home");

  const menuItems = [
    { id: "home", icon: Home, label: "Home" },
    // { id: "analytics", icon: BarChart3, label: "Analytics" },
    // { id: "data", icon: Upload, label: "Data Sources" },
    // { id: "reports", icon: FileText, label: "Reports" },
    // { id: "profile", icon: User, label: "Profile" },
    // { id: "settings", icon: Settings, label: "Settings" },
  ];

  const collapsed = !isSliderVisible;

  return (
    <TooltipProvider>
      <div
        className={cn(
          "h-screen bg-white/95 backdrop-blur-xl border-r border-slate-200/50 transition-all duration-300 ease-in-out flex flex-col  shadow-2xl shadow-slate-900/5 ",
          collapsed ? "w-[6vw]" : "w-[26vw]"
        )}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100/60">
          <div className="flex items-center justify-between">
            {!collapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-12 h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <span className="text-white font-bold text-xl">
                    <BarChart3 />
                  </span>
                </div>
                <div>
                  <h1 className="font-bold text-slate-900 text-xl tracking-tight">Data Analysis</h1>
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsSliderVisible(!isSliderVisible)}
              className="hover:bg-slate-100/80 text-gray-800 rounded-xl transition-all duration-200"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* New Analysis Button */}
        <div className="px-6 py-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleNewChatClick}
                className={cn(
                  "bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 hover:from-purple-700 hover:via-blue-700 hover:to-indigo-800 text-white shadow-xl shadow-purple-500/25 transition-all duration-300 font-semibold rounded-xl",
                  collapsed ? "w-8 h-8 p-0" : "w-full justify-start h-12"
                )}
              >
                <Plus className="w-5 h-5" />
                {!collapsed && <span className="ml-3">New Analysis</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                <p className="font-medium">New Analysis</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 px-4 ">
          <nav className="mt-2">
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setActiveSection(item.id);
                          if (item.id === "home") navigate("/");
                        }}
                        className={cn(
                          "w-full justify-start transition-all duration-300 hover:bg-slate-100/80 rounded-xl font-medium",
                          collapsed ? "px-3 h-12" : "px-5 h-12",
                          activeSection === item.id
                            ? "bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 text-purple-700 border border-purple-200/50 shadow-md shadow-purple-500/10"
                            : "text-slate-600 hover:text-slate-900"
                        )}
                      >
                        <item.icon
                          className={cn("w-5 h-5", activeSection === item.id ? "text-purple-600" : "")}
                        />
                        {!collapsed && <span className="ml-4">{item.label}</span>}
                      </Button>
                    </TooltipTrigger>
                    {collapsed && (
                      <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                        <p className="font-medium">{item.label}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>

          {!collapsed && (
            <div className="p-2 pt-28">
              <UpgradeCard />
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-100/60 space-y-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className={cn(
                  "flex items-center transition-all duration-300  rounded-xl hover:bg-slate-50/80 cursor-pointer",
                  collapsed ? "justify-center" : "space-x-4 p-3"
                )}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <span className="text-white text-sm font-bold">
                    {localStorage.getItem("username")?.charAt(0) || "U"}
                  </span>
                </div>
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {localStorage.getItem("username") || "Guest"}
                    </p>
                  </div>
                )}
              </div>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                <div>
                  <p className="font-medium">{localStorage.getItem("username") || "Guest"}</p>
                </div>
              </TooltipContent>
            )}
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className={cn(
                  "w-full justify-start transition-all duration-300 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium text-slate-600",
                  collapsed ? "px-3 h-10" : "px-5 h-10"
                )}
              >
                {logoutLoading ? (
                  <div className="h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
                {!collapsed && <span className="ml-4">Logout</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-slate-900 text-white border-slate-700">
                <p className="font-medium">Logout</p>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
