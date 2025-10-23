export const fmtDate = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "short", // Jan, Feb, Mar...
  year: "numeric",
});