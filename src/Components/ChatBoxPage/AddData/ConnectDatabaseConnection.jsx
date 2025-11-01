import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./card";
import { Button } from "./button";
import { Plus, Eye } from "lucide-react";
import PopupForm from "../PopupForm/PopupForm";
import DbDataPreviewPopup from "../PopupForm/DbDataPreviewPopup";
import { useState, useEffect } from "react";

const ConnectDatabaseSection = ({ setIsPopupOpen, isPopupOpen }) => {
  const [dbType, setDbType] = useState(sessionStorage.getItem("dbType") || "");
  const [DbResponse, setDbResponse] = useState(
    JSON.parse(sessionStorage.getItem("DbResponse")) || null
  );
  const [isDataPreviewPopupOpen, setIsDataPreviewPopupOpen] = useState(false);

  useEffect(() => {
    if (DbResponse && dbType) {
      sessionStorage.setItem("dbType", dbType);
      sessionStorage.setItem("DbResponse", JSON.stringify(DbResponse));
    }
  }, [dbType, DbResponse]);

  const handleDisconnect = () => {
    sessionStorage.removeItem("dbType");
    sessionStorage.removeItem("DbResponse");
    window.dispatchEvent(new Event("session-storage"));
    setDbType("");
    setDbResponse(null);
  };

  // ✅ If any DB is connected, disable others
  const isAnyConnected = !!DbResponse && !!dbType;

  return (
    <div className="px-6 py-4 overflow-y-scroll scrollbar-hide bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Database
          </h2>
          <p className="text-gray-600">
            Choose your database provider to establish a connection.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:col-span-2">
        {[
          {
            icon: "🐘",
            name: "PostgreSQL",
            desc: "Advanced open-source database",
            type: "postgresql",
          },
          {
            icon: "🐬",
            name: "MySQL",
            desc: "Popular relational database",
            type: "mysql",
          },
          {
            icon: "🍃",
            name: "MongoDB",
            desc: "NoSQL document database",
            type: "mongodb",
          },
          {
            icon: "💾",
            name: "Vertica",
            desc: "Lightweight file-based database",
            type: "vertica",
          },
        ].map(({ icon, name, desc, type }) => {
          const isConnected = DbResponse && dbType === type;
          const isDisabled = isAnyConnected && !isConnected; // ✅ disable all others

          return (
            <Card
              key={type}
              className={`transition-all duration-200 border-2 rounded-xl ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200"
                  : "hover:shadow-lg hover:border-blue-300 border-transparent"
              }`}
            >
              <CardHeader className="flex flex-row items-center space-y-0 pb-3">
                <div className="text-3xl mr-3">{icon}</div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{desc}</CardDescription>
                </div>

                {/* ✅ Show Disconnect if connected, otherwise Connect */}
                {isConnected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDisconnect}
                    className="border-red-500 text-red-500 hover:bg-red-50 hover:border-red-600 hover:text-red-600"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isDisabled}
                    onClick={() => {
                      if (!isDisabled) {
                        setDbType(type);
                        setIsPopupOpen(true);
                      }
                    }}
                    className={`${
                      isDisabled
                        ? "cursor-not-allowed opacity-50"
                        : "hover:bg-indigo-50"
                    }`}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                )}
              </CardHeader>

              <CardContent>
                <Button
                  onClick={() => {
                    if (isConnected) {
                      setIsDataPreviewPopupOpen(true);
                    }
                  }}
                  disabled={!isConnected}
                  className={`w-full mt-2 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300
                    ${
                      isConnected
                        ? "bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 shadow"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }
                  `}
                >
                  <Eye className="w-4 h-4" />
                  Data Preview
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {isPopupOpen && (
        <PopupForm
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          setDbResponse={setDbResponse}
          dbType={dbType}
        />
      )}
      {isDataPreviewPopupOpen && (
        <DbDataPreviewPopup
          DbResponse={DbResponse}
          dbType={dbType}
          onClose={() => setIsDataPreviewPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default ConnectDatabaseSection;
