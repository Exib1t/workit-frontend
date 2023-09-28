import useThemeClass from "../../../hooks/useThemeClass.ts";
import { MouseEvent, useState } from "react";
import { ISelectItem } from "../../../models/Select/Select.types.ts";
import Icon from "../Icon/Icon.tsx";
import "./SelectStyles.scss";
import { Popover } from "@mui/material";
import ListCustom from "../ListCustom/ListCustom.tsx";
import ListItemCustom from "../ListItemCustom/ListItemCustom.tsx";

interface IProps<T = string> {
  type: "on-bgd" | "on-srf";
  placeholder?: string;
  selected: ISelectItem<T> | null;
  onChange: (item: ISelectItem<T>) => void;
  items: ISelectItem<T>[];
  disabled?: boolean;
  getTitle?: (item: ISelectItem<T>) => any;
  customItemClassName?: string;
}

function Select<T>({
  type,
  placeholder,
  items,
  selected,
  disabled,
  onChange,
  getTitle,
  customItemClassName,
}: IProps<T>) {
  const themeClass = useThemeClass("b-select");
  const [isMenuOpen, setIsMenuOpen] = useState<Element | null>(null);

  const handleOpen = (e: MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen(e.currentTarget as Element);
  };

  const handleClose = () => {
    setIsMenuOpen(null);
  };

  const handleSelect = (item: ISelectItem<T>) => {
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
        } ${customItemClassName || ""}`}
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
          <span className={`${themeClass}__selected`}>
            {getTitle ? getTitle(selected) : selected.title}
          </span>
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
}
export default Select;
