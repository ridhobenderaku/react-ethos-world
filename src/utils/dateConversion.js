export const convertToDateTimeLocalString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const convertToDateLocalString = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertToDateLocalStringReverse = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertToDateTimeWithName = (dateFormat) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agt",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const year = dateFormat.getFullYear();
  const month = months[dateFormat.getMonth()];
  const day = days[dateFormat.getDay()];
  const date = dateFormat.getDate().toString().padStart(2, "0");
  return `${day}, ${date} ${month} ${year}`;
};

export const convertToLocalISOString = (date) => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const localISOTime = new Date(date - tzoffset).toISOString().slice(0, 16);
  return localISOTime;
};
