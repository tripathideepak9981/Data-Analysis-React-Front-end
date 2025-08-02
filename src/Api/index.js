import axios from "axios";
import Swal from "sweetalert2";

// Deployed backend url: http://35.154.165.174
// Localhost url : http://127.0.0.1:8000
const API_BASE_URL = "https://api.asklytics.in";

const axiosConfig = {
  timeout: 100000,
};

export const joinTables = async (data) => {
  const token = sessionStorage.getItem("access_token");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/join_tables`,
      data, // This is the body
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Joined Response : ", response);
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Request failed" };
  }
};

export const deleteTable = async (tableName) => {
  const token = sessionStorage.getItem("access_token");
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/delete_table/${tableName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // if using JWT
        },
      }
    );
    console.log("Delete Table Response : ", response);

    return response.data;
  } catch (error) {
    console.error("Error deleting table:", error);
    throw error.response?.data || { message: "Unknown error" };
  }
};

export const getTablesData = async () => {
  const token = sessionStorage.getItem("access_token");
  console.log("token", token);
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/load_user_tables_with_preview`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Get tables Data Response : ", response);
    if (response.data && response.data.tables) {
      const previews = {};
      const tableNames = [];

      response.data.tables.forEach((table) => {
        previews[table.table_name] = table.preview;

        // Add metadata
        tableNames.push({
          name: table.table_name,
          createdDate: new Date().toISOString().split("T")[0], // You can customize date format
        });
      });

      localStorage.setItem("previews", JSON.stringify(previews));
      localStorage.setItem("uploadedFiles", JSON.stringify(tableNames));
    }

    console.log(response.data);
  } catch (error) {
    console.error(
      "Error fetching tables:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const avilableTables = async () => {
  const token = sessionStorage.getItem("access_token");
  try {
    const response = await axios.get(`${API_BASE_URL}/api/available_tables`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Avalable Table Response : ", response);
    return response.data;
  } catch (error) {
    console.log("Error Avalilable Tables", error);
    return error;
  }
};
export const validateSQLQuery = async (sql_query, original_question = "") => {
  try {
    const token = sessionStorage.getItem("access_token");
    console.log("SQL Query:", sql_query);
    console.log("Original Question:", original_question);
    console.log("Token:", token);
    console.log("Sql Query : ", sql_query);
    const response = await axios.post(
      `${API_BASE_URL}/api/validate_sql`,
      {
        sql_query: String(sql_query), // force string if needed
        original_question: original_question || "", // fallback to empty string
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Validate Query Response : ", response);

    return response.data;
  } catch (error) {
    console.log("Error in validate SQL query : ", error);
    return error;
  }
};

export const uploadFilesAPI = async (selectedFiles) => {
  if (!selectedFiles.length) return;
  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("files", file);
  });
  const access_token = sessionStorage.getItem("access_token");

  try {
    const response = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("File Upload Response : ", response);

    return response.data;
  } catch (error) {
    console.log("Error in uploading file : ", error);
    return error;
  }
};

export const suggestedQueryResponse = async () => {
  // const token = sessionStorage.getItem("access_token")
  // const response = await axios.get(
  //   `${API_BASE_URL}/api/initial_suggestions`, {headers: {
  //       Authorization: `Bearer ${token}`,
  //     }}
  // )
  // console.log("Suggested Response : ", suggestedQueryResponse.data)
  // return response.data;
};

export const exceuteQuery = async (query, signal) => {
  try {
    const token = sessionStorage.getItem("access_token");
    console.log("Query:", query);
    console.log("Token:", token);

    const response = await axios.post(
      `${API_BASE_URL}/api/execute_query`,
      { query: query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Execute Query : ", response.data);

    return response.data;
  } catch (error) {
    console.log("Error in execute query : ", error);
    throw error;
  }
};

export const cleanFile = async (table_name) => {
  const token = sessionStorage.getItem("access_token");
  console.log("Access token: " + token);
  try {
    console.log("Table Name : " + table_name);
    const response = await axios.post(
      `${API_BASE_URL}/api/clean_file?table_name=${encodeURIComponent(
        table_name
      )}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Clean file : ", response);
    return response.data;
  } catch (error) {
    console.log("error in cleaning File : ", error);
    return error;
  }
};

export const cancel_clean_file = async (table_name) => {
  const token = sessionStorage.getItem("access_token");
  try {
    console.log("Table name:", table_name);
    const response = await axios.post(
      `${API_BASE_URL}/api/cancel_clean?table_name=${encodeURIComponent(
        table_name
      )}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Cancel Clean Response : ", response);

    return response.data;
  } catch (error) {
    console.log("Error Cancel Cleaning files :", error);
    return error;
  }
};

export const connectToDatabase = async (dbParams) => {
  const token = sessionStorage.getItem("access_token");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/connect_db`,
      dbParams, // ✅ send this as body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Database connection response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error connecting to database:", error);
    return error;
  }
};

export const loadTablesApi = async (table_name) => {
  try {
    const token = sessionStorage.getItem("access_token"); // 🔑 Get token

    console.log("Loading Tables : " + table_name);

    const response = await axios.post(
      `${API_BASE_URL}/api/load_tables`,
      table_name, // Should be an array
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send token
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error : ", error.response?.data || error.message);
    return error;
  }
};
// Send OTP during signup
export const sendOtp = async ({ email, mobile_number, password }) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signup/request_otp`,
      {
        email,
        mobile_number,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.detail;
    }
    throw { message: "Failed to send OTP. Please try again later." };
  }
};

export const verifyOtp = async (otp_code) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signup/verify_otp`,
      {
        otp_code,
      }
    );

    console.log(response);

    const { access_token, email } = response.data;
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("username", email);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data.detail;
    }
    throw { message: "Invalid or expired OTP. Please try again." };
  }
};

export const sendSignUpData = async (formData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/signup`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { access_token } = response.data;
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("username", formData.email);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      // Pass backend error response back to frontend
      throw error.response.data.detail;
    }
    throw { message: "Network Error. Try again later!" };
  }
};

export const sendSignInData = async (username, password) => {
  console.log("Here");
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      new URLSearchParams({
        username,
        password,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Sigin Response : ", response);
    const { access_token } = response.data;
    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("username", username);
    setTimeout(async () => {
      await getTablesData();
    });
    console.log("Sign In : ", response);

    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const logoutUser = async () => {
  try {
    console.log("I am here!");
    const token = sessionStorage.getItem("access_token"); // store before removal

    const response = await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Logout : ", response);
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("access_token");
  }
};
