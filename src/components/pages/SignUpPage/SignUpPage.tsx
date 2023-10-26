import useThemeClass from "../../../hooks/useThemeClass.ts";
import { SignUpFormDataInterface } from "../../../models/forms/SignUpForm.types.ts";
import { useAppDispatch, useAppSelector } from "../../../store";
import { registerThunk } from "../../../store/auth/authThunks.ts";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import Page from "../../common/Page/Page.tsx";
import { AppRoutes } from "../../../router/Routes.ts";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import TextInput from "../../control/TextInput/TextInput.tsx";

import "./SignUpPageStyles.scss";
import Checkbox from "../../control/Checkbox/Checkbox.tsx";

interface IErrors {
  email: undefined | string;
  password: undefined | string;
  first_name: undefined | string;
  last_name: undefined | string;
  confirmation_password: undefined | string;
  privacy_policy: undefined | string;
}

const SignUpPage = () => {
  const authErrors = useAppSelector((state) => state.auth.errors);

  const themeClass = useThemeClass("b-signUp");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<IErrors>({
    email: undefined,
    password: undefined,
    first_name: undefined,
    last_name: undefined,
    confirmation_password: undefined,
    privacy_policy: undefined,
  });
  const [data, setData] = useState<SignUpFormDataInterface>({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    confirmation_password: "",
    privacy_policy: false,
  });

  useEffect(() => {
    if (authErrors) {
      setErrors({
        email:
          authErrors.find((err) => err.field === "email")?.message || undefined,
        password:
          authErrors.find((err) => err.field === "password")?.message ||
          undefined,
        first_name:
          authErrors.find((err) => err.field === "first_name")?.message ||
          undefined,
        last_name:
          authErrors.find((err) => err.field === "last_name")?.message ||
          undefined,
        privacy_policy: undefined,
        confirmation_password: undefined,
      });
    }
  }, [authErrors]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: undefined,
    }));
  };

  const validate = () => {
    let isValid = true;

    if (!data.email.trim() || data.email.length < 5) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Field email is required",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, email: undefined }));
    }
    if (!data.password.trim() || data.password.length < 6) {
      setErrors((prevState) => ({
        ...prevState,
        password: "Field password is required",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, password: undefined }));
    }
    if (!data.first_name.trim() || data.first_name.length < 2) {
      setErrors((prevState) => ({
        ...prevState,
        first_name: "Field first name is required",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, first_name: undefined }));
    }
    if (!data.last_name.trim() || data.last_name.length < 2) {
      setErrors((prevState) => ({
        ...prevState,
        last_name: "Field last name is required",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, last_name: undefined }));
    }
    if (
      !data.confirmation_password.trim() ||
      data.confirmation_password.length < 6
    ) {
      setErrors((prevState) => ({
        ...prevState,
        confirmation_password: "Field confirmation is required",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        confirmation_password: undefined,
      }));
    }
    if (!data.privacy_policy) {
      setErrors((prevState) => ({
        ...prevState,
        privacy_policy: "Field privacy policy is required",
      }));
      isValid = false;
    } else {
      setErrors((prevState) => ({
        ...prevState,
        privacy_policy: undefined,
      }));
    }

    return isValid;
  };

  const onSubmit = async () => {
    const isValid = validate();

    if (isValid) {
      if (data.password === data.confirmation_password) {
        dispatch(
          registerThunk({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            password: data.password,
          }),
        )
          .unwrap()
          .then(() => {
            setData({
              email: "",
              password: "",
              first_name: "",
              last_name: "",
              confirmation_password: "",
              privacy_policy: false,
            });
            navigate(AppRoutes.projects);
          });
      } else {
        setErrors((prevState) => ({
          ...prevState,
          confirmation_password: "Passwords don't match",
        }));
      }
    }
  };

  return (
    <Page>
      <div className={themeClass}>
        <form className={`${themeClass}__card`} onSubmit={onSubmit}>
          <h1 className={`${themeClass}__title`}>Sign Up</h1>
          <div className={`${themeClass}__form`}>
            <div className={`${themeClass}__row`}>
              <TextInput
                label="First name"
                type={"on-bgd"}
                error={errors.first_name}
                placeholder="Enter your first name"
                name="first_name"
                value={data.first_name}
                onChange={onChange}
              />
              <TextInput
                label="Last name"
                type={"on-bgd"}
                error={errors.last_name}
                placeholder="Enter your last name"
                name="last_name"
                value={data.last_name}
                onChange={onChange}
              />
            </div>
            <TextInput
              label="Email"
              type={"on-bgd"}
              error={errors.email}
              placeholder="Enter your email address"
              name="email"
              value={data.email}
              onChange={onChange}
            />
            <div className={`${themeClass}__row`}>
              <TextInput
                label="Password"
                type={"on-bgd"}
                error={errors.password}
                placeholder="Enter your password"
                name="password"
                value={data.password}
                onChange={onChange}
                inputType={"password"}
              />
              <TextInput
                label="Confirmation"
                type={"on-bgd"}
                error={errors.confirmation_password}
                placeholder="Repeat your password"
                name="confirmation_password"
                value={data.confirmation_password}
                onChange={onChange}
                inputType={"password"}
              />
            </div>
            <div className={`${themeClass}__row`}>
              <div
                className={`${themeClass}__checkboxRow`}
                onClick={() =>
                  onChange({
                    target: {
                      name: "privacy_policy",
                      value: !data.privacy_policy,
                    },
                  })
                }
              >
                <Checkbox
                  checked={data.privacy_policy}
                  btnClassName={`${themeClass}__checkbox ${
                    errors.privacy_policy ? "-error" : ""
                  }`}
                />
                <span className={`${themeClass}__checkboxLabel`}>
                  Do you accept privacy policy?
                </span>
              </div>
            </div>
          </div>
          <CustomButton
            type={"primary"}
            size={"md"}
            title={"Create account"}
            className={`${themeClass}__button`}
            clickHandler={onSubmit}
          />
        </form>
      </div>
    </Page>
  );
};
export default SignUpPage;
