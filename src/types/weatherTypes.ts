export interface CurrentWeatherTypes {
    name: string | undefined;
    date: string;
    description: string;
    icon: string;
    celsius: number | string;
}

export interface ConditionsTypes {
    name: string;
    icon: string;
    value: number;
}

export interface ForcastTypes extends Omit<CurrentWeatherTypes, "name"> {
    time: string;
    conditions: ConditionsTypes[];
}
