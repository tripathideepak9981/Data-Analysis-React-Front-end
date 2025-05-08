import axios from 'axios'
import Swal from 'sweetalert2';

// Deployed backend url: http://35.154.165.174
// Localhost url : http://127.0.0.1:8000
const API_BASE_URL = "http://35.154.165.174";

const axiosConfig = {
  timeout: 100000,
}

const handleError = (error, action = "processing-request") => {
  console.error(`Error ${action}:`, error.response?.data || error.message);
  let errorMessage = "Something went wrong";
  if(error.code === "ECONNABORTED"){
    errorMessage = "Network issue. Try again later.";
  }else if(error.response?.data?.detail){
    errorMessage = error.response?.data?.detail;
  }
  Swal.fire({
    icon: "error",
    title: "Error",
    text: errorMessage,
    confirmButtonText: "OK",
    width: "30vw",
  });
  return {success: false, error: error.message};
}

export const uploadFilesAPI = async (selectedFiles) => {
  if (!selectedFiles.length) return;

  const formData = new FormData();
  selectedFiles.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/upload/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...axiosConfig,
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error, "uploading files")
  }
};

export const exceuteQuery = async (query) => {
  try {
    const token = localStorage.getItem("access_token");
    console.log("Query:", query);
    console.log("Token:", token);

    const response = await axios.post(`${API_BASE_URL}/api/query/execute_query`,
      { "query": query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      }
    );

    return response.data;
  } catch (error) {
    return handleError(error, "execute query");
  }
}


export const chartGenerator = async (query) => {
  try {
    console.log("Query : " + query)
    const response = await axios.post(`${API_BASE_URL}/api/chart/chart`, {query }, {
      headers: {
        "Content-Type": "application/json"
      },
      ...axiosConfig,
    });
    console.log("Chart Generation: ", response.data)
    return response.data;
  } catch (error) {
    // return handleError(error, "chart generation");
  }
}

export const cleanFile = async (table_name) => {
  const token = localStorage.getItem("access_token");
  console.log("Access token: " + token)
   try{
       console.log("Table Name : " + table_name)
       const response = await axios.post(`${API_BASE_URL}/api/upload/clean_file?table_name=${encodeURIComponent(table_name)}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
       });
       return response.data;
   }catch (error) {
       return handleError(error, "cleaning file");
   }
} 

export const cancel_clean_file = async (table_name) => {
  const token = localStorage.getItem("access_token");
   try{
      console.log("Table name:", table_name);
      const response = await axios.post( `${API_BASE_URL}/api/upload/cancel_clean?table_name=${encodeURIComponent(table_name)}`, {},  {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
       }
      );
      return response.data;
   }catch(error){
     return handleError(error, "cancelling clean file");
   }
}


export const connectToDatabase = async (dbParams) => {
   try{
      const response = await axios.post(`${API_BASE_URL}/api/db/connect_db`, dbParams, axiosConfig);
      console.log("Database connection response:", response.data);
      return response.data;
   }catch (error){
     console.error("Error connecting to database:", error);
     return handleError(error, "connecting to database");;
   }
}


export const loadTablesApi = async (table_name) => {
  try{
    console.log("Loading Tables : "+ table_name);
    const response = await axios.post(`${API_BASE_URL}/api/db/load_tables`, table_name, {
      headers: {
        "Content-Type": "application/json"
      },
      ...axiosConfig
    })
    return response.data;
  }catch (error) {
    return handleError(error, "loading tables");
  }
}

export const sendSignUpData = async(formData) => {
  try{
    const response = await axios.post(`${API_BASE_URL}/api/auth/signup`, formData, {
      headers: {
        "Content-Type": "application/json"
      }
    })
    const {access_token} = response.data;
    console.log(response)
    localStorage.setItem("access_token", access_token)
    localStorage.setItem("username", formData.email)
    return response.data;
  }catch (error){
    return handleError(error, "Error Uploading Sign Up Data");
  }
} 
export const sendSignInData = async (username, password) => {
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

    const { access_token } = response.data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("username", username);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
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
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("access_token");
    localStorage.removeItem("token_type");
    localStorage.removeItem("userEmail");
    window.location.href = '/';
  }
};


// export const logoutUser = async () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("username");
//   localStorage.removeItem("access_token")
//   localStorage.removeItem("token_type");
//   localStorage.removeItem("userEmail");
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}/api/auth/logout`, 
//       {},
//       {
//         withCredentials: true,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`
//         }
//       }
//     );

//     if (response.status === 200) {
//       window.location.href = '/';
//     }
//   } catch (error) {
//   }
// }
