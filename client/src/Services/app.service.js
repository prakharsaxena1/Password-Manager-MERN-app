import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { SERVER_URL } from './service.url';
var CryptoJS = require("crypto-js");

// for all requests
axios.defaults.headers.common["auth_token"] = Cookies.get("auth_token") || "";

export const getUser = () => {
  const { tokenData } = jwt_decode(
    Cookies.get("auth_token").replace("bearer%20")
  );
  const user = JSON.parse(
    CryptoJS.AES.decrypt(tokenData, "team5password").toString(CryptoJS.enc.Utf8)
  );
  return user;
};
// SHARE PASSWORDS
export const sharePassword = async (id, sharedEmail, sharedPassword) => {
  try {
    const data = { id, sharedEmail, sharedPassword };
    const res = await axios.post(`${SERVER_URL}/api/password/share`, data,
      { withCredentials: true }
    );
    return await res.data;
  } catch (err) {
    throw new Error("OPERATION ABORTED: Cannot share password", err);
  }
};
export const receivePassword = async (sharedMessage, sharedPassword) => {
  try {
    const data = { sharedMessage, sharedPassword };
    const res = await axios.post(
      `${SERVER_URL}/api/password/receive`,
      data,
      { withCredentials: true }
    );
    return await res.data;
  } catch (err) {
    throw new Error("OPERATION ABORTED: Cannot receive password", err);
  }
};
// CRUD: PASSWORDS
export const getSecrets = async () => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/password`, {
      withCredentials: true,
    });
    return await res.data;
  } catch (err) {
    throw new Error("OPERATION ABORTED: Cannot get");
  }
};
export const getSecret = async (id) => {
  try {
    const res = await axios.get(`${SERVER_URL}/api/password/${id}`, {
      withCredentials: true,
    });
    return await res.data;
  } catch (err) {
    throw new Error("OPERATION ABORTED: Cannot get one");
  }
};
export const deleteSecret = async (id) => {
  try {
    const res = await axios.delete(`${SERVER_URL}/api/password/${id}`, {
      withCredentials: true,
    });
    return await res.data;
  } catch (err) {
    throw new Error("OPERATION ABORTED: Cannot delete");
  }
};
export const updateSecret = async (id, data) => {
  try {
    const res = await axios.patch(
      `${SERVER_URL}/api/password/${id}`,
      data,
      { withCredentials: true }
    );
    return await res.data;
  } catch (err) {

    throw new Error("OPERATION ABORTED: Cannot update");
  }
};
export const addSecret = async (data) => {
  try {
    const res = await axios.post(`${SERVER_URL}/api/password/`, data, {
      withCredentials: true,
    });
    return await res.data;
  } catch (err) {

    throw new Error("OPERATION ABORTED: Cannot add");
  }
};

export const logout = () => {
  Cookies.remove("auth_token");
};

export const deleteUser = async () => {
  await axios.get(`${SERVER_URL}/api/password/delete-account/`, {
    withCredentials: true,
  });
  logout();
}