import { SessionDataStorage } from "@/controller/session/server";


export default function isLogged() {
  const { customerId } = new SessionDataStorage().getData();
  return customerId ? true : false; 
}