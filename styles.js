import { StyleSheet, Dimensions } from "react-native";
import { theme } from "./colors";
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.box,
  },
  ToDoBox: {
    width: SCREEN_WIDTH,
    backgroundColor: theme.box,
    padding: 20,
  },
  Header: {
    flex: 1,
    justifyContent: "center",
  },
  HeaderText: {
    fontSize: 30,
    fontWeight: "600",
    color: theme.text,
  },
  CompleteRate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  ToDos: {
    flex: 10,
  },
  ToDo: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme.todo,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  ToDoText: {
    fontSize: 18,
    fontWeight: "600",
  },
  Input: {
    flex: 0.2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: theme.todo,
    borderRadius: 8,
    color: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 2,
    marginVertical: 10,
  },
  Menu: {
    flex: 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    backgroundColor: theme.box,
  },
  Add: {
    width: 70,
    height: 70,
    backgroundColor: theme.bg,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 4,
  },

  IconBox: {
    flexDirection: "row",
  },
  Icon: {
    marginHorizontal: 10,
  },

  cardInput: {
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 2,
  },
});

export default styles;
