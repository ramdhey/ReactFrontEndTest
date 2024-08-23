import axios from "axios";

async function FetchAPIService({
  url,
  metode = "GET",
  header = {},
  body = null,
  token = null,
  contentType = "application/json",
  refreshToken = null,
  timeout = 5000,
}) {
  try {
    if (token && token.trim() !== "") {
      header["Authorization"] = `Bearer ${token}`;
    }

    header["Content-Type"] = contentType;

    if (refreshToken && refreshToken.trim() !== "") {
      header["Cookie"] = `access_token=${token}; refresh_token=${refreshToken}`;
    }

    const response = await axios({
      url: url,
      method: metode,
      headers: header,
      data: body ? JSON.stringify(body) : null, // Kirim sebagai JSON string
      timeout: timeout,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Response Error:", error.response.data);
      return error.response.data;
    } else if (error.request) {
      console.error("No Response:", error.request);
    } else {
      console.error("Error:", error.message);
    }

    throw error;
  }
}

export default FetchAPIService;
