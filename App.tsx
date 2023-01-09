import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { DarkModeContext } from "./context/DarkModeContext";
import DarkModeRNPaperScreen from "./examples/dark-mode-rn-paper/DarkModeRNPaperScreen";
import StoreReviewScreen from "./examples/store-review/StoreReviewScreen";
import HomeScreen from "./home/HomeScreen";

// Splash Screenを自動で非表示にするのを止める
SplashScreen.preventAutoHideAsync();

export type StackParamList = {
  Home: undefined;
  DarkModePaper: undefined;
  StoreReview: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function App() {
  // *** ダークモード利用関連 ここから ***
  // ダークモード利用有無
  const [dark, setDark] = React.useState(false);

  // 自動切り替え利用有無
  const [useDeviceColorScheme, setUseDeviceColorScheme] = React.useState(false);

  // 端末のカラースキームを取得
  const colorScheme = useColorScheme();

  // 各設定値から適用するテーマを変更
  // 独自テーマを作成してそれを利用することも可能
  const theme =
    dark && (!useDeviceColorScheme || colorScheme === "dark")
      ? DarkTheme
      : DefaultTheme;

  // 設定をAsyncStorageに保存
  const storeData = async (value: object) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("dark_mode_key", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  // 設定をAsyncStorageから読み込み
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("dark_mode_key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // AsyncStorageから設定を読み込む
    const restoreData = () => {
      getData().then((value) => {
        if (value) {
          setDark(value.dark);
          setUseDeviceColorScheme(value.useDeviceColorScheme);
        }

        // 設定の読み込み完了後、3秒待ってSplash Screenを非表示にする（setTimeoutは通常は不要）。
        // その他にも初期化処理（広告準備、有料会員のチェックとか）などがあれば、それらが終わったあとに呼び出すようにする
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 3000);
      });
    };
    restoreData();
  }, []);

  // 設定が変更された際に、AsyncStorageに保存する
  useEffect(() => {
    storeData({ dark, useDeviceColorScheme });
  }, [dark, useDeviceColorScheme]);
  // *** ダークモード利用関連 ここまで ***

  return (
    <DarkModeContext.Provider
      value={{ dark, setDark, useDeviceColorScheme, setUseDeviceColorScheme }}
    >
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="DarkModePaper"
              component={DarkModeRNPaperScreen}
            />
            <Stack.Screen name="StoreReview" component={StoreReviewScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </DarkModeContext.Provider>
  );
}
