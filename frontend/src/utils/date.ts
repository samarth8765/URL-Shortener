function pad(number: number) {
  if (number < 10) {
    return "0" + number;
  }
  return number;
}

export function formatDate(currentDate: Date) {
  let day = pad(currentDate.getDate()); // Day of the month (1-31)
  let month = pad(currentDate.getMonth() + 1); // Month (0-11), adding 1 to convert to 1-12 format
  let year = currentDate.getFullYear(); // Full year (4 digits)
  let hours = pad(currentDate.getHours()); // Hours (0-23)
  let minutes = pad(currentDate.getMinutes()); // Minutes (0-59)

  return day + "/" + month + "/" + year + " " + hours + ":" + minutes;
}
