import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import styles from "../styles";
import { theme } from "../colors";
import { LoadData, SaveToDo } from "../helper/storageSave";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Card(props) {
  const [edit, setEdit] = useState(false);
  const [todoText, setText] = useState("");
  const [savedText, setSavedText] = useState(null);
  const onEditClick = () => {
    setEdit(!edit);
  };
  const onChangeText = (text) => {
    setText(text);
  };
  const onSubmit = async () => {
    const newToDo = {
      ...props.toDos,
    };
    newToDo[props.item] = {
      ...newToDo[props.item],
      text: todoText,
    };
    await SaveToDo(newToDo);
    setEdit(false);
    setText("");
    setSavedText(todoText);
  };

  return (
    <TouchableOpacity
      style={
        props.isChecked
          ? { ...styles.ToDo, backgroundColor: "grey" }
          : styles.ToDo
      }
      onPress={props.onPress}
    >
      {!edit ? (
        <Text
          style={
            props.isChecked
              ? {
                  ...styles.ToDoText,
                  color: "white",
                  textDecorationLine: "line-through",
                }
              : styles.ToDoText
          }
        >
          {savedText ? savedText : props.toDos[props.item].text}
        </Text>
      ) : (
        <TextInput
          onSubmitEditing={onSubmit}
          onChangeText={onChangeText}
          value={todoText}
          style={styles.cardInput}
          placeholder="Edit To Do"
        />
      )}
      <View style={styles.IconBox}>
        {!props.isChecked ? (
          <TouchableOpacity
            onPress={() => {
              onEditClick();
            }}
          >
            <Entypo name="pencil" size={18} color={theme.box} />
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => props.onDelete(props.item)}
        >
          <Fontisto
            name="trash"
            size={18}
            color={props.isChecked ? "white" : theme.box}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default Card;
