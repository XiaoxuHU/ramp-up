export class Message{
  status:string;
  message:string;
  constructor(status:string,message:string) {
    this.message = message;
    this.status = status;
  }
}