import { onConversationUpdate } from "@/hooks/useConversations";
import { queryClient } from "@/lib/react-query";
import { Message } from "@/types/Message";
import { getRandomId } from "@/utils/randomId";
import storage from "@/utils/storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

type SocketProviderProps = {
    children: ReactNode;
};

export function SocketProvider({ children }: SocketProviderProps) {
    const [socket, setSocket] = useState<Socket | null>(null);

    const onReceiveMessage = (message: Message) => {
        const conversationId = message.conversationId;
        console.log(message);
        queryClient.setQueryData(["conversation", "messages", conversationId], (prev: any) => {
            if (!prev) return prev;

            message._id = getRandomId().toString();

            onConversationUpdate(conversationId, { message, seen: [] });

            message.isNewMessage = true;

            const firstPageMessages = [...prev.pages[0].messages, message];

            const newModifiedFirstPage = { messages: firstPageMessages, page: 1 };

            prev.pages.shift();

            return { ...prev, pages: [newModifiedFirstPage, ...prev.pages] };
        });
    };

    useEffect(() => {
        const socketInstance = io("http://localhost:5000", { auth: { token: storage.getToken() } });
        setSocket(socketInstance);

        socketInstance.on("connect_error", (err) => {
            console.log(err instanceof Error); // true
            console.log(err);
        });
        return () => {
            socketInstance.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!socket) return;

        socket?.on("message", onReceiveMessage);
    }, [socket]);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}

type Options = {
    onMessage?: (message: Message) => void;
};

export function useSocket({ onMessage }: Options = {}) {
    const socket = useContext(SocketContext);

    const sendMessage = async (message: Message) => {
        socket?.emit("message", message);

        return message;
    };

    // onMessage && socket?.on("message", onMessage);

    if (socket === null) {
        console.log("Socket is not initialise");
    }
    return { socket, sendMessage };
}
