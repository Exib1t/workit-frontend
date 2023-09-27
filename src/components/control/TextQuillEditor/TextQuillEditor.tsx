import ReactQuill, { ReactQuillProps } from "react-quill";
import { FC } from "react";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "react-quill/dist/quill.snow.css";
import "./TextQuillEditorStyles.scss";
import CustomButton from "../ButtonComponents/CustomButton/CustomButton.tsx";

const quillToolbarOptions = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ align: [] }],
  [{ background: [] }],
  ["clean"],
];

const modules = {
  toolbar: quillToolbarOptions,
};

interface IProps extends ReactQuillProps {
  isFooter?: boolean;
  disabled?: boolean;
  handleSave?: () => void;
}

const TextQuillEditor: FC<IProps> = (props) => {
  const themeClass = useThemeClass("b-textQuillEditor");

  return (
    <div className={`${themeClass}__wrapper`}>
      <ReactQuill
        {...props}
        className={`${themeClass} ${props.isFooter ? "-isFooter" : ""}`}
        modules={modules}
      />
      <div className={`${themeClass}__footer`}>
        <CustomButton
          type={"selection-plain"}
          size={"sm"}
          title={"Save"}
          clickHandler={props.handleSave}
          disabled={props.disabled}
          className={`${themeClass}__button`}
        />
      </div>
    </div>
  );
};
export default TextQuillEditor;
