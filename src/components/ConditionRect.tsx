import { ConditionsTypes } from "../types/weatherTypes";

interface Props {
    cond: ConditionsTypes;
}
const ConditionRect = ({ cond }: Props) => {
    return (
        <div className="bg-secMainBg min-w-[110px] py-3 px-3 rounded">
            <div className="flex flex-col gap-3">
                {/* Title  */}
                <span className="text-[13px] font-bold text-nowrap">
                    {cond.name} <span className={cond.icon}></span>
                </span>
                <span className="text-[11px]">{cond.value}</span>
            </div>
        </div>
    );
};

export default ConditionRect;
