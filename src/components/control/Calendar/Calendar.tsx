import useThemeClass from "../../../hooks/useThemeClass.ts";
import { CalendarConstants } from "./constants/calendar.constants.ts";
import { useAppDispatch, useAppSelector } from "../../../store";
import { useParams } from "react-router-dom";
import useGetOneProject from "../../../hooks/useGetOneProject.ts";
import { useCallback, useEffect, useState } from "react";
import { fetchIssuesByProjectId } from "../../../store/issues/issuesThunks.ts";
import { IIssue } from "../../../models/IIssue/IIssue.ts";
import CalendarDay from "./parts/CalendarDay/CalendarDay.tsx";

import "./Calendar.styles.scss";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const Calendar = () => {
  const dispatch = useAppDispatch();
  const { projectLink } = useParams();
  const { project } = useGetOneProject(projectLink);

  const themeClass = useThemeClass("b-calendar");

  const { issues } = useAppSelector((state) => state.issues);

  const [currentIssues, setCurrentIssues] = useState<IIssue[]>([]);

  const dateNow = new Date();
  const currentMonth = CalendarConstants.monthNames[dateNow.getMonth()];
  const currentDayOfWeek = CalendarConstants.dayOfWeekNames[dateNow.getDay()];
  const currentYear = dateNow.getFullYear();
  const lastDayOfMonth = new Date(currentYear, dateNow.getMonth() + 1, 0);
  const numberOfDays = lastDayOfMonth.getDate();

  const daysViewCount = [0, 1, 2, 3, 4, 5, 6];

  const fetchIssues = useCallback(() => {
    if (project) {
      dispatch(fetchIssuesByProjectId(project.id));
    }
  }, [dispatch, project]);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  useEffect(() => {
    setCurrentIssues(issues);
  }, [issues]);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);
    setCurrentIssues((prevState) =>
      prevState.map((item) => {
        if (item.id === event?.active?.data?.current?.id) {
          return { ...item, createdAt: event.over?.data?.current?.date };
        } else {
          return item;
        }
      }),
    );
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={themeClass}>
        <div className={`${themeClass}_container`}>
          <div className={`${themeClass}_header`}>
            <span className={`${themeClass}_header_title`}>{currentMonth}</span>
          </div>
          <div className={`${themeClass}_timeline`}>
            {daysViewCount.map((i) => (
              <CalendarDay
                key={`day-${i}`}
                currentDayOfWeek={currentDayOfWeek}
                currentIssues={currentIssues}
                dateNow={dateNow}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default Calendar;
