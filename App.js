import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { theme } from "./colors";
import { Fontisto } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import styles, { SCREEN_WIDTH } from "./styles";
import Boards from "./components/board";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecoilRoot } from "recoil";
import { LoadData } from "./helper/storageSave";
const BOARD_ID = "@boards";
export default function App() {
  const [inputVisible, setVisible] = useState(false);
  const [boardText, setBoardText] = useState();
  const [boardList, setBoardList] = useState(["Work", "Travel"]);
  const ScrollViewRef = useRef(null);
  const onBtnClick = () => setVisible(!inputVisible);
  const onChangeText = (text) => {
    setBoardText(text);
  };
  const SaveBoards = async (save) => {
    await AsyncStorage.setItem(BOARD_ID, JSON.stringify(save));
  };
  const LoadBoards = async () => {
    const stored_data = JSON.parse(await AsyncStorage.getItem(BOARD_ID));
    if (!stored_data) {
      return;
    }
    setBoardList(stored_data);
  };
  useEffect(() => {
    LoadBoards();
  }, []);
  const onSubmit = () => {
    const newBoardList = [...boardList, boardText];
    setBoardList(newBoardList);
    SaveBoards(newBoardList);
    onBtnClick();
    setBoardText("");
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 10 }}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          ref={ScrollViewRef}
          onContentSizeChange={() => {
            if (boardText === "") {
              ScrollViewRef.current.scrollToEnd({
                animated: true,
              });
            }
          }}
        >
          {boardList.map((item, index) => (
            <Boards name={item} key={index} />
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          padding: 20,
        }}
      >
        {inputVisible ? (
          <TextInput
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            style={{ ...styles.Input, flex: 0.4, marginBottom: -20 }}
            value={boardText}
            placeholder="Add a New Board"
          />
        ) : null}
      </View>

      <View style={styles.Menu}>
        <TouchableOpacity>
          <AntDesign name="user" size={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onBtnClick()} style={styles.Add}>
          <Fontisto name="plus-a" size={24} color={theme.text} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name="day-sunny" size={24} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
