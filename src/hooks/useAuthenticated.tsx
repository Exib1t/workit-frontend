import { useAppSelector } from "../store";

export default function useAuthenticated(): boolean {
  const { id } = useAppSelector((state) => state.auth);

  return !!id;
}
