import { Socket } from "phoenix";

class SocketService {
  static socket = null;

  static getSocketInstance = () => this.socket;

  static createSocketConnection = (token) => {
    if (!this.socket) {
      this.socket = new Socket("https://harmony-weath.fun/socket", { params: { token } });
      this.socket.onError((e) => {
        console.log(e, "error socket connection");
      });
      this.socket.onOpen(() => {
        console.log("successfully socket connection");
      });
      this.socket.connect();
    }
    return this.socket;
  };

  static disconnect = () => {
    if (this.socket) this.socket.disconnect();
  };
}

export default SocketService;
