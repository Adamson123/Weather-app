import axios from "axios";
import { Dispatch, SetStateAction } from "react";

const apikey = import.meta.env.VITE_API_KEY;

export const getWeather = async (
    city: string = "",
    setFetching: Dispatch<SetStateAction<string>>
) => {
    try {
        setFetching("Fetching...");
        const url =
            city !== "def"
                ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
                : "/weather.json";
        const res = await axios.get(url);
        setFetching("");
        return res.data;
    } catch (error: any) {
        //  console.log(error.status === "404");
        if (error.status === 404) {
            return setFetching("Please enter a valid city name");
        }

        setFetching("Error Fetching");
    }
};

export const getForcast = async (city: string = "") => {
    const url =
        city !== "def"
            ? `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&appid=${apikey}`
            : "/forcast.json";
    const res = await axios.get(url);
    console.log(res.status);

    return res.data;
};
