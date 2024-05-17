import { TokenType } from "@/types/type";

export function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * max) + min;
}

export const showWallet = (wallet: string, start: number, end: number) => {
  return wallet === undefined || wallet === null
    ? "..."
    : wallet.substr(0, start) + "..." + wallet.substr(wallet.length - end, end);
};

export function containsSubstring(string: string, substring: string) {
  // Convert both string and substring to lowercase
  const lowerCaseString = string.toLowerCase();
  const lowerCaseSubstring = substring.toLowerCase();

  // Check if the lowercased string contains the lowercased substring
  return lowerCaseString.includes(lowerCaseSubstring);
}

export const getFormattedDateTime = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  let minutesPadded = minutes.toString().padStart(2, "0");

  return `${month} ${day}, ${hours}:${minutesPadded}`;
};

export const convertWithDecimal = (amount: number, token: TokenType) => {
  if (token.runeId !== "") {
    return (amount /= 10 ** token.divisibility);
  }
  return 0;
};

export const convertToSats = (amount: number, token: TokenType) => {
  if (token.runeId !== "") {
    return (amount *= 10 ** token.divisibility);
  }
  return 0;
};
