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
  const [dbType, setDbType] = useState(localStorage.getItem("dbType") || "");
  const [DbResponse, setDbResponse] = useState(
    JSON.parse(localStorage.getItem("DbResponse")) || null
  );
  const [isDataPreviewPopupOpen, setIsDataPreviewPopupOpen] = useState(false);

  useEffect(() => {
    if (DbResponse && dbType) {
      localStorage.setItem("dbType", dbType);
      localStorage.setItem("DbResponse", JSON.stringify(DbResponse));
    }
  }, [dbType, DbResponse]);

  const handleDisconnect = () => {
    localStorage.removeItem("dbType");
    localStorage.removeItem("DbResponse");
    window.dispatchEvent(new Event("local-storage"));

    setDbType("");
    setDbResponse(null);
  };

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
            border: "emerald-300",
          },
          {
            icon: "🐬",
            name: "MySQL",
            desc: "Popular relational database",
            type: "mysql",
            border: "rose-300",
          },
          {
            icon: "🍃",
            name: "MongoDB",
            desc: "NoSQL document database",
            type: "mongodb",
            border: "green-300",
          },
          {
            icon: "💾",
            name: "Vertica",
            desc: "Lightweight file-based database",
            type: "vertica",
            border: "gray-300",
          },
        ].map(({ icon, name, desc, type, border }) => (
          <Card
            key={type}
            className={`hover:shadow-lg transition-shadow duration-200 border-2 hover:border-blue-300 border-transparent`}
          >
            <CardHeader className="flex flex-row items-center space-y-0 pb-3">
              <div className="text-3xl mr-3">{icon}</div>
              <div className="flex-1">
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </div>

              {/* ✅ Only show Disconnect for connected dbType */}
              {DbResponse && dbType === type ? (
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
                  onClick={() => {
                    setDbType(type);
                    setIsPopupOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              )}
            </CardHeader>

            <CardContent>
              <Button
                onClick={() => {
                  if (DbResponse && dbType === type) {
                    setIsDataPreviewPopupOpen(true);
                  }
                }}
                disabled={!(DbResponse && dbType === type)}
                className={`w-full mt-2 px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300
                  ${
                    DbResponse && dbType === type
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
        ))}
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
