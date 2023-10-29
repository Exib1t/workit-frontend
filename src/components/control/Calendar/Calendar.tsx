import { useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import useThemeClass from "../../../hooks/useThemeClass.ts";
import { EventInput } from "@fullcalendar/core";

import "./Calendar.styles.scss";

const Calendar = () => {
  const [events, setEvents] = useState<EventInput[]>([
    { title: "test drag", duration: 2, id: "12", date: new Date() },
  ]);
  const listRef = useRef(null);
  const themeClass = useThemeClass("b-calendar");

  useEffect(() => {
    const externalEvents = listRef.current.getElementsByClassName(
      `${themeClass}_taskItem`,
    );
    const calendar = listRef.current.getElementsByClassName("fc-daygrid-event");

    const enableDrag = () => {
      for (const event of externalEvents) {
        event.setAttribute("draggable", true);
        event.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", e.target.innerText);
        });
      }
    };

    const enableDrop = () => {
      for (const day of calendar) {
        day.addEventListener("dragover", (e) => e.preventDefault());
        day.addEventListener("drop", (e) => {
          e.preventDefault();
          const title = e.dataTransfer.getData("text/plain");
          const date = new Date(day.getAttribute("data-date"));
          const newEvent = { title, date };
          setEvents([...events, newEvent]);
        });
      }
    };

    enableDrag();
    enableDrop();
  }, [events, themeClass]);

  const renderEventContent = (eventInfo) => {
    return (
      <div
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData("text/plain", eventInfo.event.title);
        }}
      >
        {eventInfo.event.title}
      </div>
    );
  };

  return (
    <div className={themeClass}>
      <div className={`${themeClass}_taskList`} ref={listRef}>
        <div className={`${themeClass}_taskItem`} draggable>
          New task
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        contentHeight={"auto"}
        dayCellClassNames={`${themeClass}_cell`}
        dayHeaderClassNames={`${themeClass}_headerCell`}
        eventContent={renderEventContent}
        events={events}
        eventDrop={(info) => {
          console.log(info, "drop");
        }}
        eventReceive={(info) => {
          console.log(info, "receive");
        }}
        eventDragStop={(info) => {
          console.log(info, "drag");
        }}
        editable
        droppable
        eventDurationEditable
        slotMinTime={{ hour: 9 }}
        slotMaxTime={{ hour: 18 }}
      />
    </div>
  );
};
export default Calendar;
