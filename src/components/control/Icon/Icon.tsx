import { FC } from "react";
import { SvgIcon } from "@mui/material";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import "./IconStyles.scss";

export type IconTypes =
  | "logout"
  | "more"
  | "return"
  | "settings"
  | "filter"
  | "close"
  | "search"
  | "chevron-down"
  | "tick"
  | "edit"
  | "delete"
  | "projects"
  | "calendar"
  | "plus"
  | "drag"
  | "chevron-low"
  | "chevron-medium"
  | "chevron-high"
  | "task"
  | "open"
  | "subtask"
  | "bug"
  | "folder";

interface IProps {
  type: IconTypes;
  size?: 12 | 16 | 20 | 24 | 32 | 64 | 128;
  color?: "primary" | "secondary" | "tick" | "error";
}

const Icon: FC<IProps> = ({ type, size = 12, color = "secondary" }) => {
  const themeClass = useThemeClass("b-icon");

  switch (type) {
    case "logout":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 6.5C2 4.01472 4.01472 2 6.5 2H12C14.2091 2 16 3.79086 16 6V7C16 7.55228 15.5523 8 15 8C14.4477 8 14 7.55228 14 7V6C14 4.89543 13.1046 4 12 4H6.5C5.11929 4 4 5.11929 4 6.5V17.5C4 18.8807 5.11929 20 6.5 20H12C13.1046 20 14 19.1046 14 18V17C14 16.4477 14.4477 16 15 16C15.5523 16 16 16.4477 16 17V18C16 20.2091 14.2091 22 12 22H6.5C4.01472 22 2 19.9853 2 17.5V6.5ZM18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289L22.7071 11.2929C23.0976 11.6834 23.0976 12.3166 22.7071 12.7071L19.7071 15.7071C19.3166 16.0976 18.6834 16.0976 18.2929 15.7071C17.9024 15.3166 17.9024 14.6834 18.2929 14.2929L19.5858 13L11 13C10.4477 13 10 12.5523 10 12C10 11.4477 10.4477 11 11 11L19.5858 11L18.2929 9.70711C17.9024 9.31658 17.9024 8.68342 18.2929 8.29289Z"
            fill="#22304DFF"
          ></path>
        </SvgIcon>
      );
    case "more":
      return (
        <SvgIcon
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <path
            fill="#000000"
            fillRule="evenodd"
            d="M12 3a2 2 0 10-4 0 2 2 0 004 0zm-2 5a2 2 0 110 4 2 2 0 010-4zm0 7a2 2 0 110 4 2 2 0 010-4z"
          ></path>
        </SvgIcon>
      );
    case "return":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <path
            d="M20 10L20.7071 10.7071L21.4142 10L20.7071 9.29289L20 10ZM3 18C3 18.5523 3.44772 19 4 19C4.55229 19 5 18.5523 5 18L3 18ZM15.7071 15.7071L20.7071 10.7071L19.2929 9.29289L14.2929 14.2929L15.7071 15.7071ZM20.7071 9.29289L15.7071 4.29289L14.2929 5.70711L19.2929 10.7071L20.7071 9.29289ZM20 9L10 9L10 11L20 11L20 9ZM3 16L3 18L5 18L5 16L3 16ZM10 9C6.13401 9 3 12.134 3 16L5 16C5 13.2386 7.23858 11 10 11L10 9Z"
            fill="#33363F"
          ></path>
        </SvgIcon>
      );
    case "settings":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 8.25C9.92894 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92894 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25ZM9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
            fill="#1C274C"
          ></path>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.9747 1.25C11.5303 1.24999 11.1592 1.24999 10.8546 1.27077C10.5375 1.29241 10.238 1.33905 9.94761 1.45933C9.27379 1.73844 8.73843 2.27379 8.45932 2.94762C8.31402 3.29842 8.27467 3.66812 8.25964 4.06996C8.24756 4.39299 8.08454 4.66251 7.84395 4.80141C7.60337 4.94031 7.28845 4.94673 7.00266 4.79568C6.64714 4.60777 6.30729 4.45699 5.93083 4.40743C5.20773 4.31223 4.47642 4.50819 3.89779 4.95219C3.64843 5.14353 3.45827 5.3796 3.28099 5.6434C3.11068 5.89681 2.92517 6.21815 2.70294 6.60307L2.67769 6.64681C2.45545 7.03172 2.26993 7.35304 2.13562 7.62723C1.99581 7.91267 1.88644 8.19539 1.84541 8.50701C1.75021 9.23012 1.94617 9.96142 2.39016 10.5401C2.62128 10.8412 2.92173 11.0602 3.26217 11.2741C3.53595 11.4461 3.68788 11.7221 3.68786 12C3.68785 12.2778 3.53592 12.5538 3.26217 12.7258C2.92169 12.9397 2.62121 13.1587 2.39007 13.4599C1.94607 14.0385 1.75012 14.7698 1.84531 15.4929C1.88634 15.8045 1.99571 16.0873 2.13552 16.3727C2.26983 16.6469 2.45535 16.9682 2.67758 17.3531L2.70284 17.3969C2.92507 17.7818 3.11058 18.1031 3.28089 18.3565C3.45817 18.6203 3.64833 18.8564 3.89769 19.0477C4.47632 19.4917 5.20763 19.6877 5.93073 19.5925C6.30717 19.5429 6.647 19.3922 7.0025 19.2043C7.28833 19.0532 7.60329 19.0596 7.8439 19.1986C8.08452 19.3375 8.24756 19.607 8.25964 19.9301C8.27467 20.3319 8.31403 20.7016 8.45932 21.0524C8.73843 21.7262 9.27379 22.2616 9.94761 22.5407C10.238 22.661 10.5375 22.7076 10.8546 22.7292C11.1592 22.75 11.5303 22.75 11.9747 22.75H12.0252C12.4697 22.75 12.8407 22.75 13.1454 22.7292C13.4625 22.7076 13.762 22.661 14.0524 22.5407C14.7262 22.2616 15.2616 21.7262 15.5407 21.0524C15.686 20.7016 15.7253 20.3319 15.7403 19.93C15.7524 19.607 15.9154 19.3375 16.156 19.1985C16.3966 19.0596 16.7116 19.0532 16.9974 19.2042C17.3529 19.3921 17.6927 19.5429 18.0692 19.5924C18.7923 19.6876 19.5236 19.4917 20.1022 19.0477C20.3516 18.8563 20.5417 18.6203 20.719 18.3565C20.8893 18.1031 21.0748 17.7818 21.297 17.3969L21.3223 17.3531C21.5445 16.9682 21.7301 16.6468 21.8644 16.3726C22.0042 16.0872 22.1135 15.8045 22.1546 15.4929C22.2498 14.7697 22.0538 14.0384 21.6098 13.4598C21.3787 13.1586 21.0782 12.9397 20.7378 12.7258C20.464 12.5538 20.3121 12.2778 20.3121 11.9999C20.3121 11.7221 20.464 11.4462 20.7377 11.2742C21.0783 11.0603 21.3788 10.8414 21.6099 10.5401C22.0539 9.96149 22.2499 9.23019 22.1547 8.50708C22.1136 8.19546 22.0043 7.91274 21.8645 7.6273C21.7302 7.35313 21.5447 7.03183 21.3224 6.64695L21.2972 6.60318C21.0749 6.21825 20.8894 5.89688 20.7191 5.64347C20.5418 5.37967 20.3517 5.1436 20.1023 4.95225C19.5237 4.50826 18.7924 4.3123 18.0692 4.4075C17.6928 4.45706 17.353 4.60782 16.9975 4.79572C16.7117 4.94679 16.3967 4.94036 16.1561 4.80144C15.9155 4.66253 15.7524 4.39297 15.7403 4.06991C15.7253 3.66808 15.686 3.2984 15.5407 2.94762C15.2616 2.27379 14.7262 1.73844 14.0524 1.45933C13.762 1.33905 13.4625 1.29241 13.1454 1.27077C12.8407 1.24999 12.4697 1.24999 12.0252 1.25H11.9747ZM10.5216 2.84515C10.5988 2.81319 10.716 2.78372 10.9567 2.76729C11.2042 2.75041 11.5238 2.75 12 2.75C12.4762 2.75 12.7958 2.75041 13.0432 2.76729C13.284 2.78372 13.4012 2.81319 13.4783 2.84515C13.7846 2.97202 14.028 3.21536 14.1548 3.52165C14.1949 3.61826 14.228 3.76887 14.2414 4.12597C14.271 4.91835 14.68 5.68129 15.4061 6.10048C16.1321 6.51968 16.9974 6.4924 17.6984 6.12188C18.0143 5.9549 18.1614 5.90832 18.265 5.89467C18.5937 5.8514 18.9261 5.94047 19.1891 6.14228C19.2554 6.19312 19.3395 6.27989 19.4741 6.48016C19.6125 6.68603 19.7726 6.9626 20.0107 7.375C20.2488 7.78741 20.4083 8.06438 20.5174 8.28713C20.6235 8.50382 20.6566 8.62007 20.6675 8.70287C20.7108 9.03155 20.6217 9.36397 20.4199 9.62698C20.3562 9.70995 20.2424 9.81399 19.9397 10.0041C19.2684 10.426 18.8122 11.1616 18.8121 11.9999C18.8121 12.8383 19.2683 13.574 19.9397 13.9959C20.2423 14.186 20.3561 14.29 20.4198 14.373C20.6216 14.636 20.7107 14.9684 20.6674 15.2971C20.6565 15.3799 20.6234 15.4961 20.5173 15.7128C20.4082 15.9355 20.2487 16.2125 20.0106 16.6249C19.7725 17.0373 19.6124 17.3139 19.474 17.5198C19.3394 17.72 19.2553 17.8068 19.189 17.8576C18.926 18.0595 18.5936 18.1485 18.2649 18.1053C18.1613 18.0916 18.0142 18.045 17.6983 17.8781C16.9973 17.5075 16.132 17.4803 15.4059 17.8995C14.68 18.3187 14.271 19.0816 14.2414 19.874C14.228 20.2311 14.1949 20.3817 14.1548 20.4784C14.028 20.7846 13.7846 21.028 13.4783 21.1549C13.4012 21.1868 13.284 21.2163 13.0432 21.2327C12.7958 21.2496 12.4762 21.25 12 21.25C11.5238 21.25 11.2042 21.2496 10.9567 21.2327C10.716 21.2163 10.5988 21.1868 10.5216 21.1549C10.2154 21.028 9.97201 20.7846 9.84514 20.4784C9.80512 20.3817 9.77195 20.2311 9.75859 19.874C9.72896 19.0817 9.31997 18.3187 8.5939 17.8995C7.86784 17.4803 7.00262 17.5076 6.30158 17.8781C5.98565 18.0451 5.83863 18.0917 5.73495 18.1053C5.40626 18.1486 5.07385 18.0595 4.81084 17.8577C4.74458 17.8069 4.66045 17.7201 4.52586 17.5198C4.38751 17.314 4.22736 17.0374 3.98926 16.625C3.75115 16.2126 3.59171 15.9356 3.4826 15.7129C3.37646 15.4962 3.34338 15.3799 3.33248 15.2971C3.28921 14.9684 3.37828 14.636 3.5801 14.373C3.64376 14.2901 3.75761 14.186 4.0602 13.9959C4.73158 13.5741 5.18782 12.8384 5.18786 12.0001C5.18791 11.1616 4.73165 10.4259 4.06021 10.004C3.75769 9.81389 3.64385 9.70987 3.58019 9.62691C3.37838 9.3639 3.28931 9.03149 3.33258 8.7028C3.34348 8.62001 3.37656 8.50375 3.4827 8.28707C3.59181 8.06431 3.75125 7.78734 3.98935 7.37493C4.22746 6.96253 4.3876 6.68596 4.52596 6.48009C4.66055 6.27983 4.74468 6.19305 4.81093 6.14222C5.07395 5.9404 5.40636 5.85133 5.73504 5.8946C5.83873 5.90825 5.98576 5.95483 6.30173 6.12184C7.00273 6.49235 7.86791 6.51962 8.59394 6.10045C9.31998 5.68128 9.72896 4.91837 9.75859 4.12602C9.77195 3.76889 9.80512 3.61827 9.84514 3.52165C9.97201 3.21536 10.2154 2.97202 10.5216 2.84515Z"
            fill="#1C274C"
          ></path>
        </SvgIcon>
      );
    case "filter":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -fillPrimary`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 7C3 6.44772 3.44772 6 4 6H20C20.5523 6 21 6.44772 21 7C21 7.55228 20.5523 8 20 8H4C3.44772 8 3 7.55228 3 7ZM6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12ZM9 17C9 16.4477 9.44772 16 10 16H14C14.5523 16 15 16.4477 15 17C15 17.5523 14.5523 18 14 18H10C9.44772 18 9 17.5523 9 17Z"
            fill="#000000"
          ></path>
        </SvgIcon>
      );
    case "close":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path
            d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </SvgIcon>
      );
    case "chevron-down":
      return (
        <SvgIcon
          viewBox="0 -4.5 20 20"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <g transform="translate(-220.000000, -6684.000000)" fill="#000000">
            <g transform="translate(56.000000, 160.000000)">
              <path d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"></path>
            </g>
          </g>
        </SvgIcon>
      );
    case "tick":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path
            d="M18 7L9.42857 17L6 13"
            stroke="#363853"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </SvgIcon>
      );
    case "folder":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.85929 1.25001C6.88904 1.25001 6.91919 1.25002 6.94976 1.25002L6.98675 1.25001C7.33818 1.24999 7.56433 1.24998 7.78542 1.27065C8.68728 1.35499 9.54516 1.69531 10.2586 2.25002H16.5C16.5196 2.25002 16.5389 2.25001 16.5579 2.25001C16.9666 2.24994 17.2449 2.2499 17.4895 2.2821C19.1722 2.50364 20.4964 3.82779 20.7179 5.51054C20.7263 5.57397 20.7325 5.63966 20.737 5.70931C21.0145 5.83579 21.2715 5.99934 21.5077 6.21185C21.6061 6.30032 21.6997 6.39394 21.7882 6.49231C22.3165 7.07965 22.5422 7.79459 22.648 8.63601C22.75 9.4479 22.75 10.4741 22.75 11.747V14.0564C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4393 19.6615 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6615 22.4393 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H9.94361C8.10584 22.75 6.65021 22.75 5.51099 22.5969C4.33857 22.4393 3.38962 22.1071 2.64126 21.3588C1.8929 20.6104 1.56078 19.6615 1.40315 18.489C1.24999 17.3498 1.25 15.8942 1.25002 14.0564L1.25002 6.94976C1.25002 6.91919 1.25001 6.88904 1.25001 6.85929C1.2499 6.06338 1.24982 5.55685 1.33237 5.11935C1.6949 3.19788 3.19788 1.6949 5.11935 1.33237C5.55685 1.24982 6.06338 1.2499 6.85929 1.25001ZM19.1474 5.32768C18.8895 4.5029 18.1732 3.88506 17.2937 3.76927C17.1598 3.75163 16.9883 3.75002 16.5 3.75002H11.8113C12.4542 4.38908 12.7459 4.65598 13.0768 4.84005C13.2948 4.96134 13.526 5.05713 13.766 5.12552C14.1793 5.24333 14.6324 5.25002 15.8284 5.25002L16.253 5.25002C17.4153 5.25 18.3718 5.24999 19.1474 5.32768ZM6.94976 2.75002C6.03312 2.75002 5.67873 2.75329 5.39746 2.80636C4.08277 3.05441 3.05441 4.08277 2.80636 5.39746C2.75329 5.67873 2.75002 6.03312 2.75002 6.94976V14C2.75002 15.9068 2.75161 17.2615 2.88978 18.2892C3.02504 19.2953 3.27871 19.8749 3.70192 20.2981C4.12513 20.7213 4.70478 20.975 5.71087 21.1103C6.73853 21.2484 8.0932 21.25 10 21.25H14C15.9068 21.25 17.2615 21.2484 18.2892 21.1103C19.2953 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2953 21.1103 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14V11.7979C21.25 10.4621 21.2486 9.5305 21.1597 8.82312C21.0731 8.13448 20.9141 7.76356 20.6729 7.49539C20.6198 7.43637 20.5637 7.3802 20.5046 7.32712C20.2365 7.08592 19.8656 6.92692 19.1769 6.84034C18.4695 6.75141 17.538 6.75002 16.2021 6.75002H15.8284C15.7912 6.75002 15.7545 6.75002 15.7182 6.75003C14.6702 6.75025 13.9944 6.75038 13.3548 6.56806C13.0041 6.46811 12.6661 6.32811 12.3475 6.15083C11.7663 5.82747 11.2885 5.3495 10.5476 4.60833C10.522 4.58265 10.496 4.55666 10.4697 4.53035L9.91943 3.98009C9.63616 3.69682 9.52778 3.58951 9.41731 3.49793C8.91403 3.08073 8.29664 2.825 7.64576 2.76413C7.50289 2.75077 7.35038 2.75002 6.94976 2.75002ZM12.25 10C12.25 9.5858 12.5858 9.25002 13 9.25002H18C18.4142 9.25002 18.75 9.5858 18.75 10C18.75 10.4142 18.4142 10.75 18 10.75H13C12.5858 10.75 12.25 10.4142 12.25 10Z"
            fill="#1C274C"
          ></path>
        </SvgIcon>
      );
    case "edit":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
            fill="#0F0F0F"
          ></path>
        </SvgIcon>
      );
    case "delete":
      return (
        <SvgIcon
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path
            d="M8.21252 9.99997V14.4688"
            stroke="#4F46E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.7876 9.99997V14.4688"
            stroke="#4F46E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.84985 5.53116H17.1501"
            stroke="#4F46E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4.63745 8.21246V15.3626C4.63745 16.8435 5.83792 18.0439 7.31876 18.0439H12.6814C14.1623 18.0439 15.3627 16.8435 15.3627 15.3626V8.21246"
            stroke="#4F46E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.3186 3.74362C7.3186 2.75639 8.11891 1.95609 9.10614 1.95609H10.8937C11.8809 1.95609 12.6812 2.75639 12.6812 3.74362V5.53116H7.3186V3.74362Z"
            stroke="#4F46E5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </SvgIcon>
      );
    case "projects":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <line
            className="cls-1"
            x1="17.73"
            y1="14.86"
            x2="10.09"
            y2="14.86"
          ></line>
          <line
            className="cls-1"
            x1="17.73"
            y1="18.68"
            x2="10.09"
            y2="18.68"
          ></line>
          <path
            className="cls-1"
            d="M12,3.41,10.09,1.5H1.5V20.59A1.9,1.9,0,0,0,3.41,22.5H20.59a1.9,1.9,0,0,0,1.91-1.91V3.41Z"
          ></path>
          <line className="cls-1" x1="1.5" y1="7.23" x2="22.5" y2="7.23"></line>
          <line
            className="cls-1"
            x1="6.27"
            y1="14.86"
            x2="8.18"
            y2="14.86"
          ></line>
          <line
            className="cls-1"
            x1="17.73"
            y1="11.05"
            x2="10.09"
            y2="11.05"
          ></line>
          <line
            className="cls-1"
            x1="6.27"
            y1="11.05"
            x2="8.18"
            y2="11.05"
          ></line>
          <line
            className="cls-1"
            x1="6.27"
            y1="18.68"
            x2="8.18"
            y2="18.68"
          ></line>
        </SvgIcon>
      );
    case "calendar":
      return (
        <SvgIcon
          viewBox="-1 0 32 32"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000000"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(-309.000000, -359.000000)" fill="#000000">
              <path
                d="M323,383 L325,383 L325,385 L323,385 L323,383 Z M323,387 L325,387 C326.104,387 327,386.104 327,385 L327,383 C327,381.896 326.104,381 325,381 L323,381 C321.896,381 321,381.896 321,383 L321,385 C321,386.104 321.896,387 323,387 L323,387 Z M315,383 L317,383 L317,385 L315,385 L315,383 Z M315,387 L317,387 C318.104,387 319,386.104 319,385 L319,383 C319,381.896 318.104,381 317,381 L315,381 C313.896,381 313,381.896 313,383 L313,385 C313,386.104 313.896,387 315,387 L315,387 Z M323,375 L325,375 L325,377 L323,377 L323,375 Z M323,379 L325,379 C326.104,379 327,378.104 327,377 L327,375 C327,373.896 326.104,373 325,373 L323,373 C321.896,373 321,373.896 321,375 L321,377 C321,378.104 321.896,379 323,379 L323,379 Z M315,375 L317,375 L317,377 L315,377 L315,375 Z M315,379 L317,379 C318.104,379 319,378.104 319,377 L319,375 C319,373.896 318.104,373 317,373 L315,373 C313.896,373 313,373.896 313,375 L313,377 C313,378.104 313.896,379 315,379 L315,379 Z M337,367 L311,367 L311,365 C311,363.896 311.896,363 313,363 L317,363 L317,364 C317,364.553 317.447,365 318,365 C318.553,365 319,364.553 319,364 L319,363 L329,363 L329,364 C329,364.553 329.447,365 330,365 C330.553,365 331,364.553 331,364 L331,363 L335,363 C336.104,363 337,363.896 337,365 L337,367 L337,367 Z M337,387 C337,388.104 336.104,389 335,389 L313,389 C311.896,389 311,388.104 311,387 L311,369 L337,369 L337,387 L337,387 Z M335,361 L331,361 L331,360 C331,359.448 330.553,359 330,359 C329.447,359 329,359.448 329,360 L329,361 L319,361 L319,360 C319,359.448 318.553,359 318,359 C317.447,359 317,359.448 317,360 L317,361 L313,361 C310.791,361 309,362.791 309,365 L309,387 C309,389.209 310.791,391 313,391 L335,391 C337.209,391 339,389.209 339,387 L339,365 C339,362.791 337.209,361 335,361 L335,361 Z M331,375 L333,375 L333,377 L331,377 L331,375 Z M331,379 L333,379 C334.104,379 335,378.104 335,377 L335,375 C335,373.896 334.104,373 333,373 L331,373 C329.896,373 329,373.896 329,375 L329,377 C329,378.104 329.896,379 331,379 L331,379 Z M331,383 L333,383 L333,385 L331,385 L331,383 Z M331,387 L333,387 C334.104,387 335,386.104 335,385 L335,383 C335,381.896 334.104,381 333,381 L331,381 C329.896,381 329,381.896 329,383 L329,385 C329,386.104 329.896,387 331,387 L331,387 Z"
                id="calendar"
              ></path>
            </g>
          </g>
        </SvgIcon>
      );
    case "plus":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path
            d="M6 12H18M12 6V18"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </SvgIcon>
      );
    case "chevron-low":
      return (
        <SvgIcon
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path d="M5 12.5L10 7.49998" stroke="#DBA34E" strokeLinecap="round" />
          <path
            d="M15 12.5L9.99998 7.49998"
            stroke="#DBA34E"
            strokeLinecap="round"
          />
        </SvgIcon>
      );
    case "chevron-medium":
      return (
        <SvgIcon
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path d="M5 10L10 4.99998" stroke="#DBA34E" strokeLinecap="round" />
          <path
            d="M15 10L9.99998 4.99998"
            stroke="#DBA34E"
            strokeLinecap="round"
          />
          <path d="M5 15L10 10" stroke="#DBA34E" strokeLinecap="round" />
          <path d="M15 15L9.99998 10" stroke="#DBA34E" strokeLinecap="round" />
        </SvgIcon>
      );
    case "chevron-high":
      return (
        <SvgIcon
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path d="M5 7.5L10 2.49998" stroke="#DBA34E" strokeLinecap="round" />
          <path
            d="M15 7.5L9.99998 2.49998"
            stroke="#DBA34E"
            strokeLinecap="round"
          />
          <path d="M5 12.5L10 7.50001" stroke="#DBA34E" strokeLinecap="round" />
          <path
            d="M15 12.5L9.99998 7.50001"
            stroke="#DBA34E"
            strokeLinecap="round"
          />
          <path d="M5 17.5L10 12.5" stroke="#DBA34E" strokeLinecap="round" />
          <path
            d="M15 17.5L9.99998 12.5"
            stroke="#DBA34E"
            strokeLinecap="round"
          />
        </SvgIcon>
      );
    case "subtask":
      return (
        <SvgIcon
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path
            d="M13.5 9.5V4.5C13.5 3.94772 13.0523 3.5 12.5 3.5H4.5C3.94772 3.5 3.5 3.94772 3.5 4.5V12.5C3.5 13.0523 3.94772 13.5 4.5 13.5H9.5M13.5 9.5H10.5C9.94772 9.5 9.5 9.94772 9.5 10.5V13.5M13.5 9.5H16.5C17.0523 9.5 17.5 9.94772 17.5 10.5V16.5C17.5 17.0523 17.0523 17.5 16.5 17.5H10.5C9.94772 17.5 9.5 17.0523 9.5 16.5V13.5"
            stroke="#4F46E5"
            strokeWidth="2"
          />
        </SvgIcon>
      );
    case "bug":
      return (
        <SvgIcon
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -fill`}
        >
          <circle cx="10" cy="10" r="5" fill="#4F46E5" />
        </SvgIcon>
      );
    case "task":
      return (
        <SvgIcon
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <line
            x1="1"
            y1="-1"
            x2="8.52"
            y2="-1"
            transform="matrix(0.700736 0.713421 -0.700736 0.713421 0.561523 10.7951)"
            stroke="#4F46E5"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M18 4.41309L7.44941 16.0734"
            stroke="#4F46E5"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </SvgIcon>
      );
    case "drag":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <path
            d="M18 14C17.4477 14 17 14.4477 17 15C17 15.5523 17.4477 16 18 16C18.5523 16 19 15.5523 19 15C19 14.4477 18.5523 14 18 14Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 14C11.4477 14 11 14.4477 11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15C13 14.4477 12.5523 14 12 14Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M6 14C5.44772 14 5 14.4477 5 15C5 15.5523 5.44772 16 6 16C6.55228 16 7 15.5523 7 15C7 14.4477 6.55228 14 6 14Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M18 8C17.4477 8 17 8.44772 17 9C17 9.55228 17.4477 10 18 10C18.5523 10 19 9.55228 19 9C19 8.44772 18.5523 8 18 8Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 8C11.4477 8 11 8.44772 11 9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9C13 8.44772 12.5523 8 12 8Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M6 8C5.44772 8 5 8.44772 5 9C5 9.55228 5.44772 10 6 10C6.55228 10 7 9.55228 7 9C7 8.44772 6.55228 8 6 8Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </SvgIcon>
      );
    case "open":
      return (
        <SvgIcon
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${themeClass} color-${color} size-${size} -stroke`}
        >
          <circle
            cx="12"
            cy="12"
            r="3"
            stroke="#33363F"
            strokeWidth="2"
          ></circle>
          <path
            d="M21 12C21 12 20 4 12 4C4 4 3 12 3 12"
            stroke="#33363F"
            strokeWidth="2"
          ></path>
        </SvgIcon>
      );
    default:
      return null;
  }
};
export default Icon;
