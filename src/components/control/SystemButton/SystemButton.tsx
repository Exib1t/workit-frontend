import React, { useMemo } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import Icon from "../Icon/Icon.tsx";
import CustomTooltip from "../CustomTooltip/CustomTooltip.tsx";
import "./SystemButtonStyles.scss";

interface SystemButtonProps {
  type:
    | "chevron-left"
    | "chevron-right"
    | "chevron-down"
    | "chevron-double-left"
    | "chevron-double-right"
    | "close"
    | "search"
    | "zoom"
    | "delete"
    | "settings"
    | "link"
    | "unlink"
    | "deactivate"
    | "activate"
    | "download"
    | "duplicate"
    | "attachment"
    | "reply"
    | "edit"
    | "information"
    | "check"
    | "edit-ribbon"
    | "plus"
    | "user-check"
    | "stopwatch";
  size: "sm" | "md" | "lg";
  variant: "transparent" | "filled";
  clickHandler?: (e: Event) => void;
  tooltip?: string;
  customClass?: string;
  disabled?: boolean;
  loading?: boolean;
}

const SystemButton: React.FC<SystemButtonProps> = ({
  type,
  size,
  variant,
  clickHandler,
  tooltip,
  customClass,
  loading,
  disabled,
}) => {
  const themeClass = useThemeClass("b-systemButton");

  const handleClick = (e) => {
    if (clickHandler) {
      e.stopPropagation();
      clickHandler(e);
    }
  };

  const buttonIcon = useMemo(() => {
    const sizesInterpreter: any = {
      sm: 12,
      md: 16,
      lg: 20,
    };

    if (type === "chevron-right") {
      return <Icon type={"chevron-right"} size={sizesInterpreter[size]} />;
    }

    if (type === "chevron-down") {
      return <Icon type={"chevron-down"} size={sizesInterpreter[size]} />;
    }

    if (type === "close") {
      return <Icon type={"close"} size={sizesInterpreter[size]} />;
    }

    if (type === "delete") {
      return <Icon type={"delete"} size={sizesInterpreter[size]} />;
    }

    if (type === "settings") {
      return <Icon type={"settings"} size={sizesInterpreter[size]} />;
    }

    if (type === "edit") {
      return <Icon type={"edit"} size={sizesInterpreter[size]} />;
    }

    if (type === "check") {
      return <Icon type={"tick"} size={sizesInterpreter[size]} />;
    }

    if (type === "plus") {
      return <Icon type={"plus"} size={sizesInterpreter[size]} />;
    }

    return "";
  }, [type]);

  const typeTooltip = useMemo(() => {
    if (type === "close") {
      return "Close";
    }

    if (type === "delete") {
      return "Delete";
    }

    if (type === "settings") {
      return "Settings";
    }

    if (type === "edit") {
      return "Edit";
    }

    return "";
  }, [type]);

  return (
    <>
      <CustomTooltip title={tooltip || typeTooltip || ""} placement={"bottom"}>
        <div
          className={`${themeClass} ${themeClass}_${variant} -${size} ${
            customClass || ""
          } ${disabled ? "-disabled" : ""} ${loading ? "-loading" : ""}`}
          onClick={handleClick}
        >
          <div className={`${themeClass}_icon ${themeClass}_${variant}_icon`}>
            {buttonIcon}
          </div>
          {/*{loading ? (*/}
          {/*  <MiniLoader*/}
          {/*    size={loaderSize}*/}
          {/*    circleClasses={`${themeClass}_loaderCircle`}*/}
          {/*  />*/}
          {/*) : null}*/}
        </div>
      </CustomTooltip>
    </>
  );
};

export default SystemButton;
