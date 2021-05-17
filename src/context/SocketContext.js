import React from "react";
import { Socket } from "phoenix";

let socket = null;
const getSocketInstance = () => socket;
const createSocketConnection = (token) => {
	if (!socket) {
		socket = new Socket("https://harmony-weath.fun/socket", { params: { token } });
		socket.onError((e) => {
			console.log(e, "error socket connection");
		});
		socket.onOpen(() => {
			console.log("successfully socket connection");
		});
		socket.connect();
	}
	return socket;
};
const disconnect = () => {
	if (socket) socket.disconnect();
};

const SocketContext = React.createContext({ disconnect, getSocketInstance, createSocketConnection });

export default SocketContext;
