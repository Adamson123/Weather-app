import { Dispatch, SetStateAction } from "react";
import {
    ConditionsTypes,
    CurrentWeatherTypes,
    ForcastTypes,
} from "../types/weatherTypes";

interface Props {
    forc: ForcastTypes;
    setCurrentWeather: Dispatch<
        SetStateAction<CurrentWeatherTypes | undefined>
    >;
    setConditions: Dispatch<SetStateAction<ConditionsTypes[] | undefined>>;
}
const ForcastRect = ({ forc, setConditions, setCurrentWeather }: Props) => {
    const setCurrent = () => {
        const { conditions, celsius, date, description, icon } = forc;
        setConditions(conditions);

        setCurrentWeather(
            (curr) =>
                (curr = { name: curr?.name, celsius, date, description, icon })
        );
    };

    return (
        <div
            onClick={setCurrent}
            className="flex flex-col items-center
             cursor-pointer bg-orange-400
              rounded hover:bg-orange-500 py-2"
        >
            <span className="text-[11px]">{forc.time}</span>
            <span className="h-[70px] w-[70px]">
                <img
                    src={`./weather icons/${forc.icon}@4x.png`}
                    className="w-full h-full"
                />
            </span>
            <span className="font-bold isidoraBold">{forc.celsius}&deg;c</span>
        </div>
    );
};

export default ForcastRect;
