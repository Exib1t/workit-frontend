import { useAppSelector } from "../store";

export default function useAuthenticated() {
  const { id, isLoading } = useAppSelector((state) => state.auth);

  return {
    isAuthenticated: !!id,
    isLoading,
  };
}
