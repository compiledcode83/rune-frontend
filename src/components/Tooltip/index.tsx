import React, { useState } from "react";

type TooltipProps = {
  children: React.ReactNode;
  content: string;
};

const CustomTooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="bg-light-tooltip-bg dark:bg-dark-tooltip-bg absolute bottom-[20px] left-1/2 w-[230px] -translate-x-1/2 rounded-xl p-2 px-4">
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomTooltip;
