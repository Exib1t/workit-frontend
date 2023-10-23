import { useEffect, useState } from "react";
import ModalCustom from "../../control/ModalCustom/ModalCustom.tsx";
import { useAppDispatch, useAppSelector } from "../../../store";
import { setErrors, setToken } from "../../../store/auth/authSlice.ts";

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
    <ModalCustom
      isOpen={isOpen}
      handleClose={handleClose}
      title="Token Expired"
      text="Your authorization token is expired, please re-login into your account."
    />
  );
};
export default ErrorModal;
