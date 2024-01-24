import useThemeClass from "../../../hooks/useThemeClass.ts";
import { SignInFormDataInterface } from "../../../models/forms/SignInForm.types.ts";
import { useAppDispatch, useAppSelector } from "../../../store";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import Page from "../../common/Page/Page.tsx";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import TextInput from "../../control/TextInput/TextInput.tsx";
import Checkbox from "../../control/Checkbox/Checkbox.tsx";
import { loginThunk } from "../../../store/auth/authThunks.ts";
import { AppRoutes } from "../../../router/Routes.ts";

import "./SignInPageStyles.scss";

const SignInPage = () => {
  const authErrors = useAppSelector((state) => state.auth.errors);

  const themeClass = useThemeClass("b-signIn");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<{
    email: string | undefined;
    password: string | undefined;
  }>({
    email: undefined,
    password: undefined,
  });
  const [data, setData] = useState<SignInFormDataInterface>({
    email: "",
    password: "",
    isRemember: false,
  });

  useEffect(() => {
    if (authErrors) {
      setErrors({
        email:
          authErrors.find((err) => err.field === "email")?.message || undefined,
        password:
          authErrors.find((err) => err.field === "password")?.message ||
          undefined,
      });
    }
  }, [authErrors]);

  const onChange = (e: ChangeEvent<HTMLInputElement> | any) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!data.email.trim() || data.email.length < 5) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Field email is required",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, email: undefined }));
    }
    if (!data.password.trim() || data.password.length < 6) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Field password is required",
      }));
    } else {
      setErrors((prevState) => ({ ...prevState, password: undefined }));
    }

    return !(
      !data.email.trim() ||
      data.email.length < 5 ||
      !data.password.trim() ||
      data.password.length < 5
    );
  };

  const onSubmit = async () => {
    const isValid = validate();

    if (isValid) {
      dispatch(loginThunk(data))
        .unwrap()
        .then(() => {
          setData({
            email: "",
            password: "",
            isRemember: false,
          });
          navigate(AppRoutes.projects);
        });
    }
  };

  return (
    <Page>
      <div className={themeClass}>
        <form className={`${themeClass}__card`} onSubmit={onSubmit}>
          <h1 className={`${themeClass}__title`}>Sign In</h1>
          <div className={`${themeClass}__form`}>
            <TextInput
              label="Email"
              type={"on-bgd"}
              error={errors.email}
              placeholder="Enter your email address"
              name="email"
              value={data.email}
              onChange={onChange}
            />
            <TextInput
              label="Password"
              type={"on-bgd"}
              error={errors.password}
              placeholder={"Enter your password"}
              name="password"
              inputType={"password"}
              value={data.password}
              onChange={onChange}
            />
            <div className={`${themeClass}__row`}>
              <div
                className={`${themeClass}__checkboxRow`}
                onClick={() =>
                  onChange({
                    target: { name: "isRemember", value: !data.isRemember },
                  })
                }
              >
                <Checkbox checked={data.isRemember} />
                <span className={`${themeClass}__checkboxLabel`}>
                  Remember me
                </span>
              </div>
            </div>
          </div>
          <CustomButton
            type={"primary"}
            size={"md"}
            title={"Login"}
            className={`${themeClass}__button`}
            clickHandler={onSubmit}
          />
        </form>
      </div>
    </Page>
  );
};
export default SignInPage;
