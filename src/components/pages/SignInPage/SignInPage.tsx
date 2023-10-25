import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./SignInPageStyles.scss";
import LinkCustom from "../../control/LinkCustom/LinkCustom.tsx";
import { SignInFormDataInterface } from "../../../models/forms/SignInForm.types.ts";
import { useAppDispatch } from "../../../store";
import { loginThunk } from "../../../store/auth/authThunks.ts";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import Page from "../../common/Page/Page.tsx";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/Routes.ts";
import { ChangeEvent, useState } from "react";
import TextInput from "../../control/TextInput/TextInput.tsx";
import Checkbox from "../../control/Checkbox/Checkbox.tsx";

const SignInPage = () => {
  const themeClass = useThemeClass("b-signIn");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<{
    email: undefined | string;
    password: undefined | string;
  }>({
    email: undefined,
    password: undefined,
  });
  const [data, setData] = useState<SignInFormDataInterface>({
    email: "",
    password: "",
    isRemember: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!data.email.trim() || data.email.length < 5) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Field email is required",
      }));
    }
    if (!data.password.trim() || data.password.length < 6) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Field password is required",
      }));
    }
  };

  const onSubmit = async () => {
    validate();
    if (errors.email || errors.password) return null;
    await dispatch(loginThunk(data));
    setData({
      email: "",
      password: "",
      isRemember: false,
    });
    navigate(AppRoutes.projects);
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
              <LinkCustom to={"/password-reset"}>Forgot password?</LinkCustom>
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
