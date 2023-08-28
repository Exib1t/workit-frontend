import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./SignInPageStyles.scss";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import ButtonCustom from "../../control/ButtonCustom/ButtonCustom.tsx";
import LinkCustom from "../../control/LinkCustom/LinkCustom.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInFormDataInterface } from "../../../models/forms/SignInForm.types.ts";
import { useAppDispatch } from "../../../store";
import { loginThunk } from "../../../store/thunks/authThunks.ts";

const SignInPage = () => {
  const themeClass = useThemeClass("b-signIn");
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignInFormDataInterface>();

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

  const onSubmit: SubmitHandler<SignInFormDataInterface> = async (data) => {
    await dispatch(loginThunk(data));
    reset();
  };

  return (
    <div className={themeClass}>
      <form className={`${themeClass}__card`} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={`${themeClass}__title`}>Sign In</h1>
        <div className={`${themeClass}__form`}>
          <TextField
            size="small"
            label="Email"
            error={!!errors.email?.type}
            {...register("email", { required: true, minLength: 5 })}
          />
          <TextField
            size="small"
            label="Password"
            type="password"
            error={!!errors.password?.type}
            {...register("password", { required: true, minLength: 6 })}
          />
          <div className={`${themeClass}__row`}>
            <FormControlLabel
              control={<Checkbox />}
              className={`${themeClass}__controlLabel`}
              label="Remember me"
              {...register("isRemember")}
            />
            <LinkCustom to={"/password-reset"}>Forgot password?</LinkCustom>
          </div>
          <span className={`${themeClass}__errorLabel`}>
            {getErrorMessage()}
          </span>
        </div>
        <ButtonCustom className={`${themeClass}__button`} type={"submit"}>
          Login
        </ButtonCustom>
      </form>
    </div>
  );
};
export default SignInPage;
