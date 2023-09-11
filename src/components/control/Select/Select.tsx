import useThemeClass from "../../../hooks/useThemeClass.ts";
import { FC, MouseEvent, useState } from "react";
import { ISelectItem } from "../../../models/Select/Select.types.ts";
import Icon from "../Icon/Icon.tsx";
import "./SelectStyles.scss";
import { Popover } from "@mui/material";
import ListCustom from "../ListCustom/ListCustom.tsx";
import ListItemCustom from "../ListItemCustom/ListItemCustom.tsx";

interface IProps {
  type: "on-bgd" | "on-srf";
  placeholder?: string;
  selected?: ISelectItem;
  onChange: (item: ISelectItem) => void;
  items: ISelectItem[];
  disabled?: boolean;
  getTitle?: (item: ISelectItem) => string;
}

const Select: FC<IProps> = ({
  type,
  placeholder,
  items,
  selected,
  disabled,
  onChange,
  getTitle,
}) => {
  const themeClass = useThemeClass("b-select");
  const [isMenuOpen, setIsMenuOpen] = useState<Element | null>(null);

  const handleOpen = (e: MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen(e.currentTarget as Element);
  };

  const handleClose = () => {
    setIsMenuOpen(null);
  };

  const handleSelect = (item: ISelectItem) => {
    onChange(item);
    handleClose();
  };

  const renderItems = () => {
    return items.map((item) => (
      <ListItemCustom
        key={item.id}
        type={type}
        className={`${themeClass}__item ${
          selected?.id === item.id ? "-selected" : ""
        }`}
        onClick={() => handleSelect(item)}
      >
        {getTitle ? getTitle(item) : item.title}
      </ListItemCustom>
    ));
  };

  return (
    <>
      <div
        className={`${themeClass} ${type} ${disabled ? "-isDisabled" : ""}`}
        onClick={handleOpen}
      >
        {!!placeholder && !selected && (
          <span className={`${themeClass}__placeholder`}>{placeholder}</span>
        )}
        {!!selected && (
          <span className={`${themeClass}__selected`}>{selected.title}</span>
        )}
        <div className={`${themeClass}__icon`}>
          <Icon type={"chevron-down"} />
        </div>
      </div>
      <Popover
        open={!!isMenuOpen}
        onClose={handleClose}
        classes={{ paper: `${themeClass}__paper` }}
        anchorEl={isMenuOpen}
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        anchorPosition={{
          top: 20,
          left: 0,
        }}
      >
        <ListCustom
          style={{ minWidth: isMenuOpen?.getBoundingClientRect().width }}
        >
          {renderItems()}
        </ListCustom>
      </Popover>
    </>
  );
};
export default Select;
