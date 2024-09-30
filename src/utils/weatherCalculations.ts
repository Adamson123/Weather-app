export const getFeelsLike = (feels_like: number) => {
    return {
        celsius: Math.round(feels_like - 273.15),
        fahrenheit: (((feels_like - 273.15) * 9) / 5 + 32).toFixed(2),
    };
};

export const getWind = (rawWind: number) => {
    return (rawWind * 3.6).toFixed(2);
};
