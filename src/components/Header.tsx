import { Dispatch, SetStateAction, useState } from "react";

interface Props {
    setCity: Dispatch<SetStateAction<string>>;
}
const Header = ({ setCity }: Props) => {
    const [search, setSearch] = useState("");

    return (
        <div className="flex justify-center p-3">
            <div className="">
                <input
                    onChange={(event) => setSearch(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") setCity(search);
                    }}
                    value={search}
                    type="search"
                    className="bg-secMainBg px-4 py-2 text-center 
                    rounded outline-none text-[14px]"
                    placeholder="Enter City"
                />
            </div>
        </div>
    );
};

export default Header;
