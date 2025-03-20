import moment from "moment";

export const formatDate = (dateString) => {
  return moment(dateString).format("DD/MM/YYYY");
};

export const formatDayDMY = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const excelDateToJSDate = (serial) => {
  const utc_days = Math.floor(serial - 25569);
  const date_info = new Date(utc_days * 86400 * 1000);
  return date_info.toISOString().split("T")[0]; // YYYY-MM-DD
};