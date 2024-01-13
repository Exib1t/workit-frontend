import cn from "classnames";
import { CalendarConstants } from "../../constants/calendar.constants.ts";
import useThemeClass from "../../../../../hooks/useThemeClass.ts";
import { useDroppable } from "@dnd-kit/core";
import { IIssue } from "../../../../../models/IIssue/IIssue.ts";
import CalendarEvent from "../CalendarEvent/CalendarEvent.tsx";
import moment from "moment";

const CalendarDay = ({
  currentIssues,
  dateNow,
  currentDayOfWeek,
  index,
}: {
  currentIssues: IIssue[];
  dateNow: Date;
  currentDayOfWeek: string;
  index: number;
}) => {
  const themeClass = useThemeClass("b-calendar");

  const { isOver, setNodeRef } = useDroppable({
    id: `day-${index}`,
    data: {
      date: moment(dateNow).add(index, "day"),
    },
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  const dayIndex = (dateNow.getDay() + index) % 7;
  const dayName = CalendarConstants.dayOfWeekNames[dayIndex];
  const isToday = currentDayOfWeek === dayName;

  return (
    <div className={`${themeClass}_day`}>
      <div className={`${themeClass}_day_header`}>
        <span
          className={cn(`${themeClass}_day_title`, {
            ["-today"]: isToday,
          })}
        >
          {dayName}
        </span>
      </div>
      <div
        className={`${themeClass}_day_content`}
        ref={setNodeRef}
        style={style}
      >
        {currentIssues
          .filter(
            (event) =>
              new Date(event.createdAt).getDate() === dateNow.getDate() + index,
          )
          .map((event, index) => {
            return (
              <CalendarEvent
                event={event}
                themeClass={themeClass}
                key={index}
              />
            );
          })}
      </div>
    </div>
  );
};
export default CalendarDay;
