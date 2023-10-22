import { ChangeEvent, FC, useEffect, useState } from "react";
import ModalCustom from "../../../control/ModalCustom/ModalCustom.tsx";
import useThemeClass from "../../../../hooks/useThemeClass.ts";
import SystemButton from "../../../control/SystemButton/SystemButton.tsx";
import TextInput from "../../../control/TextInput/TextInput.tsx";
import CustomButton from "../../../control/ButtonComponents/CustomButton/CustomButton.tsx";

import "./IssueTimePopupStyles.scss";
import { useAppDispatch } from "../../../../store";
import { logIssueTime } from "../../../../store/thunks/issuesThunks.ts";
import { useParams } from "react-router-dom";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  estimated: number;
}

const IssueTimePopup: FC<IProps> = ({
  onClose,
  isOpen,
  onSuccess,
  estimated,
}) => {
  const { issueLink } = useParams();
  const [logTime, setLogTime] = useState("0");
  const [estimatedTime, setEstimatedTime] = useState("0");
  const dispatch = useAppDispatch();

  const themeClass = useThemeClass("b-issueTimePopup");

  useEffect(() => {
    setEstimatedTime(String(estimated));
  }, [estimated]);

  const handleChangeLog = (e: ChangeEvent<HTMLInputElement>) => {
    setLogTime(e.target.value);
  };

  const handleChangeEstimate = (e: ChangeEvent<HTMLInputElement>) => {
    setEstimatedTime(e.target.value);
  };

  const handleLog = () => {
    if (issueLink) {
      dispatch(
        logIssueTime({
          data: {
            link: issueLink,
            time: { logged: logTime, estimated: estimatedTime },
          },
          callbacks: { onSuccess },
        }),
      );
      onClose();
    }
  };

  return (
    <ModalCustom isOpen={isOpen} handleClose={onClose} className={themeClass}>
      <div className={`${themeClass}_header`}>
        <span className={`${themeClass}_header_title`}>Log Time</span>
        <SystemButton
          type={"close"}
          size={"lg"}
          variant={"transparent"}
          clickHandler={onClose}
        />
      </div>
      <div className={`${themeClass}_content`}>
        <TextInput
          type={"on-bgd"}
          value={logTime}
          onChange={handleChangeLog}
          label={"Time to log (2h, 1d, 1w)"}
        />
        <TextInput
          type={"on-bgd"}
          value={estimatedTime}
          onChange={handleChangeEstimate}
          label={"Time to estimate (2h, 1d, 1w)"}
        />
      </div>
      <div className={`${themeClass}_footer`}>
        <CustomButton
          type={"secondary"}
          size={"md"}
          title={"Cancel"}
          clickHandler={onClose}
        />
        <CustomButton
          type={"primary"}
          size={"md"}
          title={"Log"}
          clickHandler={handleLog}
        />
      </div>
    </ModalCustom>
  );
};
export default IssueTimePopup;
