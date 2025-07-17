import axios from 'axios'
import Swal from 'sweetalert2';

// Deployed backend url: http://35.154.165.174
// Localhost url : http://127.0.0.1:8000
const API_BASE_URL = "http://127.0.0.1:8000";

const axiosConfig = {
  timeout: 100000,
}

export const joinTables = async (data) => {
  const token = localStorage.getItem("access_token");

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
    
      console.log("Joined Response : " , response)
    return response.data;
  } catch (error) {
    return error.response?.data || { error: "Request failed" };
  }
};


export const deleteTable = async (tableName) => {
  const token = localStorage.getItem("access_token")
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/delete_table/${tableName}`, {
      headers: {
        Authorization: `Bearer ${token}`, // if using JWT
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting table:", error);
    throw error.response?.data || { message: "Unknown error" };
  }
};


export const getTablesData = async () => {
  const token = localStorage.getItem("access_token");
  console.log("token" , token)
  try{
    const response = await axios.get(`${API_BASE_URL}/api/load_user_tables_with_preview`, 
      {headers: {
          Authorization: `Bearer ${token}`,
      }}
    )
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

    console.log(response.data)
  }catch (error) {
  console.error("Error fetching tables:", error.response?.data || error.message);
  throw error;
}

}


export const avilableTables = async () => {
  const token = localStorage.getItem("access_token")
  try {
    const response = await axios.get(`${API_BASE_URL}/api/available_tables`, {
      headers: {
        
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",

      }
    })
    return response.data;
  } catch (error) {
    console.log("Error Avalilable Tables", error)
    return error;
  }
}
export const validateSQLQuery = async (sql_query, original_question = "") => {
  try {
    const token = localStorage.getItem("access_token");
    console.log("SQL Query:", sql_query);
    console.log("Original Question:", original_question);
    console.log("Token:", token);
    console.log("Sql Query : ", sql_query);
const response = await axios.post(
  `${API_BASE_URL}/api/validate_sql`,
  {
    sql_query: String(sql_query),               // force string if needed
    original_question: original_question || "", // fallback to empty string
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  }
);


    return response.data;
  } catch (error) {
    console.log("Error in validate SQL query : ", error);
    return error;
  }
};

const handleError = (error, action = "processing-request") => {
  console.error(`Error ${action}:`, error.response?.data || error.message);
  let errorMessage = "Something went wrong";
  if (error.code === "ECONNABORTED") {
    errorMessage = "Network issue. Try again later.";
  } else if (error.response?.data?.detail) {
    errorMessage = error.response?.data?.detail;
  }
  // Swal.fire({
  //   icon: "error",
  //   title: "Error",
  //   text: errorMessage,
  //   confirmButtonText: "OK",
  //   width: "30vw",
  // });
  console.log(errorMessage)
  return { success: false, error: error.message };
}

export const uploadFilesAPI = async (selectedFiles) => {
  if (!selectedFiles.length) return;
  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("files", file);
  });
  const access_token = localStorage.getItem("access_token");

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/upload`,
      formData,
      {
       headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",

        }
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error in uploading file : ", error);
    return error;
  }
};


export const suggestedQueryResponse = async () => {
  // const token = localStorage.getItem("access_token")
  // const response = await axios.get(
  //   `${API_BASE_URL}/api/initial_suggestions`, {headers: {
  //       Authorization: `Bearer ${token}`,
  //     }}
  // )
  // console.log("Suggested Response : ", suggestedQueryResponse.data)
  // return response.data;
}

export const exceuteQuery = async (query, signal) => {
  try {
    const token = localStorage.getItem("access_token");
    console.log("Query:", query);
    console.log("Token:", token);

    const response = await axios.post(`${API_BASE_URL}/api/execute_query`,
      { "query": query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      },
    );
    console.log("Execute Query : ", response.data)

    return response.data;
  } catch (error) {
    console.log("Error in execute query : ", error);
    return error;
  }
}


export const cleanFile = async (table_name) => {
  const token = localStorage.getItem("access_token");
  console.log("Access token: " + token)
  try {
    console.log("Table Name : " + table_name)
    const response = await axios.post(`${API_BASE_URL}/api/clean_file?table_name=${encodeURIComponent(table_name)}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    return response.data;
  } catch (error) {
    console.log("error in cleaning File : ", error);
    return error;
  }
}

export const cancel_clean_file = async (table_name) => {
  const token = localStorage.getItem("access_token");
  try {
    console.log("Table name:", table_name);
    const response = await axios.post(`${API_BASE_URL}/api/cancel_clean?table_name=${encodeURIComponent(table_name)}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    }
    );

    return response.data;
  } catch (error) {
     console.log("Error Cancel Cleaning files :", error);
     return error;
  }
}

export const connectToDatabase = async (dbParams) => {
  const token = localStorage.getItem("access_token");

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
    const token = localStorage.getItem("access_token"); // 🔑 Get token

    console.log("Loading Tables : " + table_name);

    const response = await axios.post(
      `${API_BASE_URL}/api/load_tables`,
      table_name, // Should be an array
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // ✅ Send token
        }
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error : ", error.response?.data || error.message);
    return error;
  }
};


export const sendSignUpData = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    const { access_token } = response.data;
    console.log(response)
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("username", formData.email)
    return response.data;
  } catch (error) {
    throw (error.message);
  }
}


export const sendSignInData = async (username, password) => {
  console.log("Here"); // Confirm function is called
  try {
    console.log("Preparing API call to:", `${API_BASE_URL}/api/auth/login`);
    console.log("Payload:", { username, password });

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
        timeout: 5000, // 5 sec timeout so we can catch hangs
      }
    );

    console.log("✅ API call success:", response);
    return response.data;

  } catch (error) {
    console.error("❌ API call failed:", error);

    if (error.response) {
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received. Request was:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw error;
  }
};



export const logoutUser = async () => {
  try {
    console.log("I am here!")
    const token = localStorage.getItem("access_token"); // store before removal

    const response = await axios.post(
      `${API_BASE_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("uploadedFile")
    localStorage.removeItem("uploadedFiles")
    localStorage.removeItem("suggested_question")
    localStorage.removeItem("selectedDataSource")
    localStorage.removeItem("DbType")
    localStorage.removeItem("DbResponse")
    localStorage.removeItem("tablePreview")

  }
};
