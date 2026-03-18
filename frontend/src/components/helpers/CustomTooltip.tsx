import React, { FC, ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type CustomTooltipProps = {
  id: string;
  icon: IconProp;
  tooltipContent: ReactNode;
};

const CustomTooltip: FC<CustomTooltipProps> = ({
  id,
  icon,
  tooltipContent,
}) => {
  return (
    <>
      <FontAwesomeIcon
        icon={icon}
        data-tooltip-id={id}
        data-tooltip-content={tooltipContent as string}
        className="tooltip-icon ms-2"
      />
      <ReactTooltip
        id={id}
        style={{
          fontSize: "1rem",
          fontFamily: "Poppins",
        }}
      >
        {tooltipContent}
      </ReactTooltip>
    </>
  );
};

export default CustomTooltip;
