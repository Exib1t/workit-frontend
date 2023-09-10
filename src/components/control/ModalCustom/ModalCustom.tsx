import { Modal } from "@mui/material";
import { FC, ReactNode } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import ButtonCustom from "../ButtonCustom/ButtonCustom.tsx";
import "./ModalStyles.scss";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  children?: ReactNode;
}

const ModalCustom: FC<IProps> = ({
  handleClose,
  isOpen,
  title,
  text,
  confirmText,
  cancelText,
  children,
  className,
}) => {
  const themeClass = useThemeClass("b-modal");

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      disableAutoFocus
      disableEnforceFocus
    >
      <div className={`${themeClass} ${className || ""}`}>
        {children || (
          <>
            <h2 className={`${themeClass}__title`}>{title}</h2>
            <p className={`${themeClass}__text`}>{text}</p>
            <div className={`${themeClass}__controls`}>
              <ButtonCustom onClick={handleClose}>
                {cancelText || "Cancel"}
              </ButtonCustom>
              {confirmText && <ButtonCustom>{confirmText}</ButtonCustom>}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
export default ModalCustom;
