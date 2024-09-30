import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getForcast } from "../api/weather";
import ConditionRect from "../components/ConditionRect";
import ForcastRect from "../components/ForcastRect";
import {
    ConditionsTypes,
    CurrentWeatherTypes,
    ForcastTypes,
} from "../types/weatherTypes";
import getDate from "../utils/getDate";
import { getFeelsLike, getWind } from "../utils/weatherCalculations";

interface Props {
    currentWeather: CurrentWeatherTypes | undefined;
    conditions: ConditionsTypes[] | undefined;
    city: string;
    setCurrentWeather: Dispatch<
        SetStateAction<CurrentWeatherTypes | undefined>
    >;
    setConditions: Dispatch<SetStateAction<ConditionsTypes[] | undefined>>;
    shiftInCurrent: boolean;
    setShiftInCurrent: Dispatch<SetStateAction<boolean>>;
}
const RightSection = ({
    currentWeather,
    conditions,
    city,
    setCurrentWeather,
    setConditions,
    shiftInCurrent,
    setShiftInCurrent,
}: Props) => {
    const [forcast, setForcast] = useState<ForcastTypes[]>([]);

    useEffect(() => {
        if (!city) return;
        (async () => {
            const data = await getForcast(city);
            const { list } = data;
            let trimmedList: any[] = list.map((forc: any) => {
                const { weather, main, dt, wind, rain } = forc;
                const time = getDate(dt).time;

                return {
                    description: weather[0].description,
                    icon: weather[0].icon,
                    celsius: getFeelsLike(main.temp).celsius,
                    date: getDate(dt).fullDate,
                    time:
                        time.substring(0, time.lastIndexOf(":")) +
                        " " +
                        time.split(" ")[2],
                    conditions: [
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
                    ],
                };
            });

            //trimmedList.push();

            const current = {
                ...currentWeather,
                time: "now",
                conditions,
            };

            if (shiftInCurrent) {
                trimmedList.unshift(current);
                setForcast(trimmedList);
                setShiftInCurrent(false);
            }
        })();
    }, [city, currentWeather, conditions]);

    return (
        <div className="flex flex-col gap-5 w-full">
            {/* Conditions */}
            <div className="flex flex-col gap-2">
                <span className="font-bold isidoraBold">
                    Weather Conditions
                </span>
                <div
                    className="overflow-y-hidden overflow-x-auto navBar
                 w-full max-w-[420px]"
                >
                    <div className="flex justify-cent p-3 gap-2 w-full md:pl-0">
                        {conditions?.map((cond, index) => {
                            return <ConditionRect cond={cond} key={index} />;
                        })}
                    </div>
                </div>
            </div>

            {/* Forcast */}
            <div className="flex flex-col gap-2">
                <span className="font-bold isidoraBold">Today's Forcast</span>
                <div
                    className="overflow-y-hidden overflow-x-auto navBar
                  w-full max-w-[420px]"
                >
                    <div className="flex p-3 gap-1 w-full">
                        {forcast?.map((forc, index) => {
                            return (
                                <ForcastRect
                                    forc={forc}
                                    key={index}
                                    setCurrentWeather={setCurrentWeather}
                                    setConditions={setConditions}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightSection;
