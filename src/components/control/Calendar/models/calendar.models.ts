export interface CalendarConstantsModel {
  monthNames: MonthModel[];
  dayOfWeekNames: DayWeekModel[];
}

export type MonthModel =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type DayWeekModel =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
