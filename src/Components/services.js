import http from "./httpservice";
const apiEndpoint = "https://salonbackendfinal.herokuapp.com/api";

export async function getAllIpsInfo() {
  return await http.get(apiEndpoint);
}

export async function saveIp() {
  return await http.post(apiEndpoint);
}

export function checkSession() {}
export async function deleteAnIp(id) {
  return await http.delete(apiEndpoint + "/" + id);
}
export async function getData() {
  return await http.get(apiEndpoint + "/report/today");
}
