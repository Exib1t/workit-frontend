import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../store";
import { setChatData } from "../store/chat/chatSlice.ts";
import {Resources} from "../services/resources.ts";

export default function useChatSocket() {
  const [socket, setSocket] = useState<Socket>();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.chat);

  useEffect(() => {
    const newSocket = io(Resources.BACKEND_URL);
    setSocket(newSocket);
  }, []);

  const handleSend = (data: string) => {
    socket?.emit("chat-create", data);
  };

  const handleGetMessage = (data: any) => {
    dispatch(setChatData(data));
  };

  socket?.on("connect", () => {
    // console.log("connect");
  });

  socket?.on("connect_error", () => {
    console.log("connect error");
  });

  socket?.on("chat", handleGetMessage);

  return { data, handleSend };
}
