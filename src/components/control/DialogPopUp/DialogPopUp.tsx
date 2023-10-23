import { MouseEvent, ReactElement } from "react";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import cn from "classnames";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import SystemButton from "../SystemButton/SystemButton.tsx";
import { CircularProgress } from "@mui/material";
import CustomButton from "../ButtonComponents/CustomButton/CustomButton.tsx";

import "./DialogPopUp.styles.scss";

type ButtonType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "text-plain"
  | "text-activated"
  | "selection-plain"
  | "selection-activated"
  | "accept"
  | "decline";

interface IModalProps extends DialogProps {
  modalText?: string;
  renderModalContent?: () => ReactElement;
  renderTitle?: () => ReactElement;
  isHideRemoveIcon?: boolean;
  primaryText?: string;
  secondaryText?: string;
  tertiaryText?: string;
  handleOnPrimary?: (e: MouseEvent<HTMLDivElement>) => void;
  handleOnSecondary?: (e: MouseEvent<HTMLDivElement>) => void;
  handleOnTertiary?: (e: MouseEvent<HTMLDivElement>) => void;
  loadingOnPrimary?: boolean;
  customPrimaryType?: ButtonType;
  customSecondaryType?: ButtonType;
  customTertiaryType?: ButtonType;
  loadingOnSecondary?: boolean;
  loadingOnTertiary?: boolean;
  isLoading?: boolean;
  isOverlay?: boolean;
  paperMaxWidth?: string;
  customClassname?: string;
  dividedHeader?: boolean;
  customContainerClassName?: string;
  isMobile?: boolean;
}

const DialogPopUp = ({
  open,
  onClose,
  title,
  renderTitle,
  isOverlay,
  isHideRemoveIcon,
  modalText,
  renderModalContent,
  primaryText,
  secondaryText,
  tertiaryText,
  handleOnPrimary,
  handleOnSecondary,
  handleOnTertiary,
  loadingOnPrimary,
  customPrimaryType,
  loadingOnSecondary,
  loadingOnTertiary,
  isLoading,
  children,
  paperMaxWidth,
  customClassname,
  dividedHeader,
  customTertiaryType,
  customSecondaryType,
  customContainerClassName,
  isMobile,
  ...props
}: IModalProps) => {
  const themeClass = useThemeClass("dialogPopUp");

  return (
    <Dialog
      open={!!open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        style: {
          maxWidth: paperMaxWidth,
        },
      }}
      className={cn(`${themeClass}`, { ["-overlay"]: isOverlay })}
      classes={{
        root: `${themeClass}_root`,
        paper: cn(`${themeClass}_paper`, {
          ["-maxWidth"]: (children || renderModalContent) && paperMaxWidth,
          ["-mobile"]: isMobile,
          [`${customClassname}`]: customClassname,
        }),
        container: customContainerClassName || "",
      }}
      BackdropProps={{
        invisible: true,
        hideBackdrop: true,
      }}
      {...(props || {})}
    >
      {children ? (
        children
      ) : (
        <>
          {title && (
            <div
              className={cn(`${themeClass}_dialogTitle`, {
                ["-divided"]: dividedHeader,
                ["-mobile"]: isMobile,
              })}
            >
              {renderTitle ? <div>{renderTitle()}</div> : <div>{title}</div>}
              <div
                className={cn(`${themeClass}_closeIcon`, {
                  ["hide"]: !!isHideRemoveIcon,
                })}
                onClick={onClose}
              >
                <SystemButton
                  type={"close"}
                  size={"lg"}
                  variant={"transparent"}
                />
              </div>
            </div>
          )}
          <div
            className={cn(`${themeClass}_content`, {
              ["-divided"]: dividedHeader,
            })}
          >
            {isLoading ? (
              <div className={"downloadBoxLoading"}>
                <CircularProgress
                  size={"sm"}
                  className={`${themeClass}_loader_circle`}
                />
              </div>
            ) : (
              <>
                {renderModalContent ? (
                  <>{renderModalContent()}</>
                ) : (
                  <span className={`${themeClass}_content_modalText`}>
                    {modalText}
                  </span>
                )}
              </>
            )}
          </div>
          <div
            className={cn(`${themeClass}_buttonsSection`, {
              ["-divided"]: dividedHeader,
              ["-mobile"]: isMobile,
            })}
          >
            {tertiaryText && handleOnTertiary && (
              <CustomButton
                loading={loadingOnSecondary}
                size={"md"}
                type={customSecondaryType ? customSecondaryType : "text-plain"}
                clickHandler={handleOnTertiary}
                title={tertiaryText}
              />
            )}
            {secondaryText && handleOnSecondary && (
              <CustomButton
                loading={loadingOnTertiary}
                size={"md"}
                type={customTertiaryType ? customTertiaryType : "tertiary"}
                clickHandler={handleOnSecondary}
                title={secondaryText}
              />
            )}
            {primaryText && handleOnPrimary && (
              <CustomButton
                loading={loadingOnPrimary}
                size={"md"}
                type={customPrimaryType ? customPrimaryType : "primary"}
                clickHandler={handleOnPrimary}
                title={primaryText}
              />
            )}
          </div>
        </>
      )}
    </Dialog>
  );
};

export default DialogPopUp;
