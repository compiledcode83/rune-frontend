import React, { useState } from "react";

type PropsType = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

const SelectModalSearchBox: React.FC<PropsType> = ({
  searchText,
  setSearchText,
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <div
      className={
        focused
          ? "h-[60px] w-full rounded-[10px] border-[#60696B]"
          : "border-gradient-to-r h-[60px] w-full rounded-[10px] from-[#FD773D]  to-[#EAAC33EB]"
      }
    >
      {focused || searchText !== "" ? (
        <div className="text-[14px] text-[#959D9F]">
          Search name or pasto addrss
        </div>
      ) : null}
    </div>
  );
};

export default SelectModalSearchBox;
