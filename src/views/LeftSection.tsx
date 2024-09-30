import { Dispatch, SetStateAction } from "react";
import Header from "../components/Header";
import { CurrentWeatherTypes } from "../types/weatherTypes";

interface Props {
    currentWeather: CurrentWeatherTypes | undefined;
    setCity: Dispatch<SetStateAction<string>>;
}

const LeftSection = ({ currentWeather, setCity }: Props) => {
    return (
        <div>
            <Header setCity={setCity} />
            {/* City name date, Weather image , Current weather */}
            <div className="flex flex-col items-center">
                <div className="flex flex-col">
                    {/* City name */}

                    <h2 role="cityName" className="text-center text-2xl">
                        {currentWeather?.name}
                    </h2>
                    {/* Time */}
                    <span className="text-[13px] text-center text-[rgb(160,157,157)]">
                        {currentWeather?.date}
                    </span>
                </div>

                {/* Weather  Icon*/}
                <div className="h-[150px] w-[150px]">
                    <img
                        src={`./weather icons/${currentWeather?.icon}@4x.png`}
                        className="h-full w-full"
                    />
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[13px] ">
                        {currentWeather?.description}
                    </span>
                    <span className="text-6xl relative">
                        {currentWeather?.celsius}
                        <span className="text-[25px] absolute top-2">
                            &deg;
                        </span>
                        c
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LeftSection;
