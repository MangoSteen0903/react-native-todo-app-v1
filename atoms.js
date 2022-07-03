import { atom } from "recoil";
const ToDoKey = "todos";
const BoardKey = "boards";
export const ToDoState = atom({
  key: ToDoKey,
  default: {},
});

export const BoardState = atom({
  key: BoardKey,
  default: ["Works", "Travel"],
});
