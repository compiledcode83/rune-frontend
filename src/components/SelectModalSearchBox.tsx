import React, { EventHandler, useState } from "react";

type PropsType = {
  searchText: string;
  onChangeSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SelectModalSearchBox: React.FC<PropsType> = ({
  searchText,
  onChangeSearchText,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <div
      className={`flex h-[60px] w-full flex-col justify-center rounded-[10px] border px-4  ${isFocused ? "  border-primary" : "border-[#60696B]"}`}
    >
      {isFocused || searchText !== "" ? (
        <div className="text-[14px] text-[#959D9F]">
          Search name or pasto addrss
        </div>
      ) : null}
      <input
        placeholder={isFocused ? "" : "Search name or pasto addrss"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full bg-transparent text-[20px] outline-none"
        onChange={onChangeSearchText}
      ></input>
    </div>
  );
};

export default SelectModalSearchBox;
