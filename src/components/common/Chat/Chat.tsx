import { useState } from "react";
import CustomButton from "../../control/ButtonComponents/CustomButton/CustomButton.tsx";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import IconButtonCustom from "../../control/IconButtonCustom/IconButtonCustom.tsx";
import Icon from "../../control/Icon/Icon.tsx";
import TextInput from "../../control/TextInput/TextInput.tsx";
import useChatSocket from "../../../hooks/useChatSocket.ts";

import "./Chat.styles.scss";
import { useAppSelector } from "../../../store";
import cn from "classnames";

const Chat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { handleSend, data } = useChatSocket();
  const { id: userId } = useAppSelector((state) => state.auth);
  const themeClass = useThemeClass("b-chat");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      handleSend(JSON.stringify({ message: message, userId }));
    }
  };

  if (isOpen) {
    return (
      <div className={themeClass}>
        <div className={`${themeClass}_container`}>
          <div className={`${themeClass}_header`}>
            <span className={`${themeClass}_header_title`}>Chats</span>
            <IconButtonCustom size={"small"} onClick={handleClose}>
              <Icon type={"close"} size={24} />
            </IconButtonCustom>
          </div>
          <div className={`${themeClass}_content`}>
            <ul className={`${themeClass}_list`}>
              {data.map((item) => (
                <li className={`${themeClass}_message`}>
                  <span
                    className={cn(`${themeClass}_message_author`, {
                      ["-assigned"]: item.author.id === userId,
                    })}
                  >
                    {item.author.first_name} {item.author.last_name}
                  </span>
                  <span className={`${themeClass}_message_text`}>
                    {item.body}
                  </span>
                </li>
              ))}
            </ul>
            <div className={`${themeClass}_content_row`}>
              <TextInput
                type={"on-bgd"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <CustomButton
                type={"selection-activated"}
                size={"md"}
                title={"Send"}
                disabled={!message.trim()}
                clickHandler={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={themeClass}>
      <CustomButton
        className={`${themeClass}_button`}
        type={"primary"}
        size={"md"}
        title={"Chat"}
        clickHandler={handleOpen}
      />
    </div>
  );
};
export default Chat;
