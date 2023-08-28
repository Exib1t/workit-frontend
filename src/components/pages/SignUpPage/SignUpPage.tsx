import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./SignUpPageStyles.scss";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import ButtonCustom from "../../control/ButtonCustom/ButtonCustom.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormDataInterface } from "../../../models/forms/SignUpForm.types.ts";
import { useAppDispatch } from "../../../store";
import { registerThunk } from "../../../store/thunks/authThunks.ts";

const SignUpPage = () => {
  const themeClass = useThemeClass("b-signUp");
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    setError,
    reset,
    formState: { errors },
  } = useForm<SignUpFormDataInterface>();

  const getErrorMessage = (): string | null => {
    if (Object.keys(errors).length) {
      const keys = Object.keys(errors);
      // @ts-ignore
      const field = errors[keys[0]];
      return field.type === "required" && !field.message
        ? `Field ${keys[0]} is required`
        : field.message;
    } else {
      return null;
    }
  };

  const onSubmit: SubmitHandler<SignUpFormDataInterface> = async (data) => {
    if (data.password === data.confirmationPassword) {
      await dispatch(
        registerThunk({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          password: data.password,
        }),
      );
      reset();
    } else {
      setError("confirmationPassword", {
        type: "validate",
        message: "Passwords are different",
      });
    }
  };

  return (
    <div className={themeClass}>
      <form className={`${themeClass}__card`} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={`${themeClass}__title`}>Sign Up</h1>
        <div className={`${themeClass}__form`}>
          <div className={`${themeClass}__row`}>
            <TextField
              size="small"
              label="First Name"
              placeholder="John"
              error={!!errors.firstName?.type}
              {...register("firstName", { required: true })}
            />
            <TextField
              size="small"
              label="Last Name"
              placeholder="Doe"
              error={!!errors.lastName?.type}
              {...register("lastName", { required: true })}
            />
          </div>
          <TextField
            size="small"
            label="Email"
            error={!!errors.email?.type}
            {...register("email", { required: true })}
          />
          <div className={`${themeClass}__row`}>
            <TextField
              size="small"
              label="Password"
              type="password"
              error={!!errors.password?.type}
              {...register("password", { required: true, minLength: 6 })}
            />
            <TextField
              size="small"
              label="Confirm"
              type="password"
              error={!!errors.confirmationPassword?.type}
              {...register("confirmationPassword", {
                required: true,
                minLength: 6,
              })}
            />
          </div>
          <div className={`${themeClass}__row`}>
            <FormControlLabel
              control={<Checkbox />}
              className={`${themeClass}__controlLabel`}
              label="Do you accept privacy policy?"
              {...register("privacyPolicy", { required: true })}
            />
          </div>
          <span className={`${themeClass}__errorLabel`}>
            {getErrorMessage()}
          </span>
        </div>
        <ButtonCustom className={`${themeClass}__button`} type="submit">
          Create account
        </ButtonCustom>
      </form>
    </div>
  );
};
export default SignUpPage;
