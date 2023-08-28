import { useAppSelector } from "../store";

export default function useThemeClass(className: string): string {
  const { theme } = useAppSelector((state) => state.global);

  return `${className}-${theme}`;
}
