import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import styles, { SCREEN_WIDTH } from "../styles";
import Card from "./card";
import { LoadData, SaveToDo } from "../helper/storageSave";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Boards(props) {
  let LengthCount = 0;
  let CompleteCount = 0;
  const [inputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [completeRate, setCompleteRate] = useState(0);
  useEffect(() => {
    //AsyncStorage.clear();
    LoadData().then((result) => {
      setToDos(result);
    });
  }, [text]);

  const onBtnClick = () => {
    setInputVisible(!inputVisible);
  };
  const onChangeText = (context) => setText(context);

  const onSubmit = async () => {
    const newToDo = {
      ...toDos,
      [Date.now()]: {
        text,
        category: props.name,
        isChecked: false,
      },
    };
    console.log(newToDo);
    setToDos(newToDo);
    await SaveToDo(newToDo);
    onBtnClick();
    setText("");
  };
  const onDelete = async (item) => {
    const tempToDo = { ...toDos };
    delete tempToDo[item];
    await SaveToDo(tempToDo);
    setToDos(tempToDo);
  };

  const onChecked = async (item) => {
    const newToDo = {
      ...toDos,
    };
    const checked = !newToDo[item].isChecked;
    newToDo[item] = {
      ...newToDo[item],
      isChecked: checked,
    };
    setToDos(newToDo);
    await SaveToDo(newToDo);
  };

  useEffect(() => {
    const tempToDo = { ...toDos };
    Object.keys(tempToDo).map((item, index) => {
      if (tempToDo[item].category === props.name) {
        LengthCount += 1;
        if (tempToDo[item].isChecked === true) {
          CompleteCount += 1;
        }
      }
    });
    const rate = CompleteCount / LengthCount;
    rate ? setCompleteRate(rate) : setCompleteRate(0);
  }, [toDos]);
  return (
    <View style={styles.ToDoBox}>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{props.name}</Text>
      </View>

      <View style={styles.CompleteRate}>
        <Progress.Bar progress={completeRate} width={SCREEN_WIDTH * 0.8} />
        <Text>{completeRate * 100}%</Text>
      </View>

      <TextInput
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={text}
        style={styles.Input}
        placeholder={`Write a To Do on ${props.name}`}
      />
      <View style={styles.ToDos}>
        <ScrollView>
          {Object.keys(toDos).map((item, index) => {
            if (toDos[item].category === props.name) {
              return (
                <Card
                  toDos={toDos}
                  item={item}
                  key={index}
                  onDelete={() => onDelete(item)}
                  isChecked={toDos[item].isChecked}
                  onPress={() => onChecked(item)}
                />
              );
            }
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default Boards;
