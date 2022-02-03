import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { AppState, useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { AppContext } from './Context';
import DarkModeRNPaperScreen from './examples/dark-mode-rn-paper/DarkModeRNPaperScreen';
import HomeScreen from './home/HomeScreen';

export type StackParamList = {
  Home: undefined;
  DarkModePaper: undefined;
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
  const theme = dark && (!useDeviceColorScheme || colorScheme === 'dark')
    ? DarkTheme : DefaultTheme;

  // 設定をAsyncStorageに保存
  const storeData = async (value: object) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('dark_mode_key', jsonValue)
    } catch (e) {
      console.log(e);
    }
  }

  // 設定をAsyncStorageから読み込み
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('dark_mode_key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    // AsyncStorageから設定を読み込む
    const restoreData = () => {
      getData().then(value => {
        if (value) {
          setDark(value.dark);
          setUseDeviceColorScheme(value.useDeviceColorScheme);
        }
      })
    }
    restoreData();

    // アプリがバックグラウンドから復帰した際に、テーマの設定をする。
    // バックグラウンドへの遷移前後にColorSchemeが変わった場合に対応するため
    const subscription = AppState.addEventListener("change", async nextAppState => {
      if (nextAppState === "active") {
        restoreData();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [])

  // 設定が変更された際に、AsyncStorageに保存する
  useEffect(() => {
    storeData({ dark, useDeviceColorScheme });
  }, [dark, useDeviceColorScheme]);
  // *** ダークモード利用関連 ここまで *** 

  return (
    <AppContext.Provider value={{ dark, setDark, useDeviceColorScheme, setUseDeviceColorScheme }}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
            <Stack.Screen name="DarkModePaper" component={DarkModeRNPaperScreen} options={{ title: 'Dark Mode' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AppContext.Provider>
  );
}
