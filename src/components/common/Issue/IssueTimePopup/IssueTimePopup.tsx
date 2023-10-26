import { ChangeEvent, FC, useEffect, useState } from "react";
import TextInput from "../../../control/TextInput/TextInput.tsx";

import "./IssueTimePopupStyles.scss";
import { useAppDispatch } from "../../../../store";
import { logIssueTime } from "../../../../store/issues/issuesThunks.ts";
import DialogPopUp from "../../../control/DialogPopUp/DialogPopUp.tsx";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  estimated: number;
  issueId: number;
}

const IssueTimePopup: FC<IProps> = ({
  onClose,
  isOpen,
  onSuccess,
  estimated,
  issueId,
}) => {
  const [logTime, setLogTime] = useState("0");
  const [estimatedTime, setEstimatedTime] = useState("0");
  const dispatch = useAppDispatch();

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
    dispatch(
      logIssueTime({
        data: {
          id: issueId,
          time: { logged: logTime, estimated: estimatedTime },
        },
        callbacks: { onSuccess },
      }),
    );
    setLogTime("0");
    onClose();
  };

  return (
    <DialogPopUp
      open={isOpen}
      onClose={onClose}
      title={"Log Time"}
      dividedHeader
      paperMaxWidth={"500px"}
      renderModalContent={() => (
        <>
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
        </>
      )}
      secondaryText={"Cancel"}
      primaryText={"Log"}
      handleOnSecondary={onClose}
      handleOnPrimary={handleLog}
    />
  );
};
export default IssueTimePopup;
