import useThemeClass from "../../../hooks/useThemeClass.ts";
import { FC, MouseEvent, useEffect, useState } from "react";
import { ISelectItem } from "../../../models/Select/Select.types.ts";
import Icon from "../Icon/Icon.tsx";
import "./MultiSelectStyles.scss";
import { Popover } from "@mui/material";
import ListCustom from "../ListCustom/ListCustom.tsx";
import ListItemCustom from "../ListItemCustom/ListItemCustom.tsx";
import Checkbox from "../Checkbox/Checkbox.tsx";

interface IProps {
  type: "on-bgd" | "on-srf";
  placeholder?: string;
  selected: ISelectItem[];
  onChange: (items: ISelectItem[]) => void;
  items: ISelectItem[];
  disabled?: boolean;
  getTitle?: (item: ISelectItem) => string;
}

const MultiSelect: FC<IProps> = ({
  type,
  placeholder,
  items,
  selected,
  disabled,
  onChange,
  getTitle,
}) => {
  const themeClass = useThemeClass("b-multiselect");
  const [isMenuOpen, setIsMenuOpen] = useState<Element | null>(null);
  const [selectedItems, setSelectedItems] = useState<ISelectItem[]>([]);

  useEffect(() => {
    if (selected) {
      setSelectedItems(selected);
    }
  }, [selected]);

  const isSelected = (item: ISelectItem) => {
    return !!selected.find((i) => i.id === item.id);
  };

  const handleOpen = (e: MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen(e.currentTarget as Element);
  };

  const handleClose = () => {
    setIsMenuOpen(null);
  };

  const handleSelect = (item: ISelectItem) => {
    onChange(
      isSelected(item)
        ? selectedItems.filter((i) => i.id !== item.id)
        : [...selectedItems, item],
    );
  };

  const renderItems = () => {
    return items.map((item) => {
      return (
        <ListItemCustom
          key={item.id}
          type={type}
          className={`${themeClass}__item ${
            isSelected(item) ? "-selected" : ""
          }`}
          onClick={() => handleSelect(item)}
        >
          <div className={`${themeClass}__row`}>
            <Checkbox checked={isSelected(item)} />
            {getTitle ? getTitle(item) : item.title}
          </div>
        </ListItemCustom>
      );
    });
  };

  return (
    <>
      <div
        className={`${themeClass} ${type} ${disabled ? "-isDisabled" : ""}`}
        onClick={handleOpen}
      >
        {!!placeholder && !selected.length && (
          <span className={`${themeClass}__placeholder`}>{placeholder}</span>
        )}
        {!!selected.length && (
          <div className={`${themeClass}__selectedItems`}>
            {selected.map((item) => (
              <span className={`${themeClass}__selected`}>
                {item.title}
                <div
                  className={`${themeClass}__selectedIcon`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(item);
                  }}
                >
                  <Icon type={"close"} size={20} />
                </div>
              </span>
            ))}
          </div>
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
export default MultiSelect;
