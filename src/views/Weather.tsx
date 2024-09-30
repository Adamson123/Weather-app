import { useEffect, useState } from "react";
import { getWeather } from "../api/weather";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import { ConditionsTypes, CurrentWeatherTypes } from "../types/weatherTypes";
import getDate from "../utils/getDate";
import { getFeelsLike, getWind } from "../utils/weatherCalculations";

const Weather = () => {
    const [currentWeather, setCurrentWeather] = useState<CurrentWeatherTypes>();
    const [conditions, setConditions] = useState<ConditionsTypes[]>();
    const [city, setCity] = useState<string>("Lagos");
    const [fetching, setFetching] = useState("");
    const [shiftInCurrent, setShiftInCurrent] = useState(false);

    useEffect(() => {
        if (!city) return;
        (async () => {
            const data = await getWeather(city, setFetching);
            const { name, dt, weather, main, wind, rain } = data;

            setCurrentWeather({
                name,
                description: weather[0].description,
                icon: weather[0].icon,
                celsius: getFeelsLike(main.temp).celsius,
                date: getDate(dt).fullDate,
            });

            setConditions([
                {
                    name: "Humidity",
                    value: main.humidity + "%",
                    icon: "bi-moisture",
                },
                {
                    name: "Rain",
                    value: rain ? rain[Object.keys(rain)[0]] : "0",
                    icon: "bi-cloud-drizzle",
                },
                {
                    name: "Wind",
                    value: getWind(wind.speed) + " km/h",
                    icon: "bi-wind",
                },
                {
                    name: "Feels Like",
                    value:
                        getFeelsLike(main.feels_like).celsius +
                        "°C / " +
                        getFeelsLike(main.feels_like).fahrenheit +
                        "°F",
                    icon: "bi-thermometer-half",
                },
            ]);
            setShiftInCurrent(true);
        })();
    }, [city]);

    return (
        <div
            className="flex items-center
         justify-center min-h-screen p-5"
        >
            <div
                className="flex flex-col gap-5 md:flex-row p-5
              pt-8 bg-slate-900 rounded-md w-full
             items-center max-w-[500px] md:max-w-[730px] relative"
            >
                <span className="absolute top-[10px] text-[13px] text-center w-full">
                    {fetching}
                </span>
                <LeftSection
                    currentWeather={currentWeather}
                    setCity={setCity}
                />
                <RightSection
                    setShiftInCurrent={setShiftInCurrent}
                    shiftInCurrent={shiftInCurrent}
                    conditions={conditions}
                    currentWeather={currentWeather}
                    city={city}
                    setCurrentWeather={setCurrentWeather}
                    setConditions={setConditions}
                />
            </div>
        </div>
    );
};

export default Weather;
