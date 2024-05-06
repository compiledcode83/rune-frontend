function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * max) + min;
}

const showWallet = (wallet: string, start: number, end: number) => {
    return wallet === undefined || wallet === null
        ? "..."
        : wallet.substr(0, start) +
              "..." +
              wallet.substr(wallet.length - end, end);
};

const exports = {
    randomIntFromInterval,
    showWallet,
};

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

export default exports;
