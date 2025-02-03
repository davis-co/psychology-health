import { AUTH_JobId } from "@/constants/jobId";
import { request } from "@/services";

export default function checkToken(type, callback) {
  if (type == "development") {
    localStorage.setItem("token", TEST_TOKEN);
    callback(true);
  } else {
    if (!document.referrer) callback(false);
    else {
      window.parent.postMessage({ tip: "getToken" }, document.referrer);
      window.addEventListener(
        "message",
        (e) => handlePostMessage(e, callback),
        false
      );
    }
  }
}

export const handlePostMessage = async (e, callback) => {
  localStorage.clear();
  const data = e.data;
  if (data.tip === "getToken") {
    const oToken = data.token;
    if (oToken) {
      localStorage.setItem("oToken", oToken);
      localStorage.setItem("token", data.token);
      const data = { token: oToken };
      const response = await request({
        jobId: AUTH_JobId,
        dataInfo: data,
      });
      if (response.error === false) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        callback(true);
      } else {
        callback(response.error);
      }
    }
  }
};
