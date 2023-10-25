import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setErrors, setToken } from "../../../store/auth/authSlice.ts";
import DialogPopUp from "../../control/DialogPopUp/DialogPopUp.tsx";

const ErrorModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { errors } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (errors && errors.message === "Token has expired") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [errors]);

  const handleClose = () => {
    dispatch(setErrors(null));
    dispatch(setToken(null));
  };

  return (
    <DialogPopUp
      open={isOpen}
      onClose={handleClose}
      dividedHeader
      title={"Token Expired"}
      modalText={
        "Your authorization token is expired, please re-login into your account."
      }
      primaryText={"Okey"}
      handleOnPrimary={handleClose}
    />
  );
};
export default ErrorModal;
