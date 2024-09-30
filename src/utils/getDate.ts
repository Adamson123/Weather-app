const getDate = (dt: number) => {
    const datetoLocaleString = new Date(dt * 1000).toLocaleString();
    const date = datetoLocaleString
        .substring(0, datetoLocaleString.indexOf(","))
        .split("/");

    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return {
        fullDate: `${date[1]} ${months[Number(date[0]) - 1]} ${date[2]}`,
        time: datetoLocaleString.split(",")[1],
    };
};

export default getDate;
