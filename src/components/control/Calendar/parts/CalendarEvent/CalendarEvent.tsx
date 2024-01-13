import { FC } from "react";
import { IIssue } from "../../../../../models/IIssue/IIssue.ts";
import IssueBlock from "../../../../common/Issue/IssueBlock/IssueBlock.tsx";
import Icon from "../../../Icon/Icon.tsx";
import { useDraggable } from "@dnd-kit/core";

interface IProps {
  event: IIssue;
  themeClass: string;
}
const CalendarEvent: FC<IProps> = ({ event, themeClass }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
    data: event,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      className={`${themeClass}_event`}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <IssueBlock issue={event} />
      <div className={`${themeClass}_event_drag`}>
        <Icon type={"drag"} size={24} color={"secondary"} />
      </div>
    </div>
  );
};

export default CalendarEvent;
