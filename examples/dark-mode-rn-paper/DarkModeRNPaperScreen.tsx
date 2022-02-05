import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { Appbar, Subheading, Surface, Switch, Text, Title, useTheme } from 'react-native-paper';
import { StackParamList } from '../../App';
import { DarkModeContext } from '../../context/DarkModeContext';

type Props = NativeStackNavigationProp<StackParamList, 'DarkModePaper'>;

export default function DarkModeRNPaperScreen() {
    const navigation = useNavigation<Props>();
    const { colors, roundness } = useTheme();

    const { dark, setDark, useDeviceColorScheme, setUseDeviceColorScheme } = React.useContext(DarkModeContext);

    // ダークモードスイッチ切り替え
    const toggleDark = (value: boolean) => {
        setDark(value);

        // ダークモードをOFFにする場合は端末設定利用の値もOFFにする
        if (!value) {
            setUseDeviceColorScheme(false);
        }
    }

    // 端末設定利用スイッチ切り替え
    const toggleUseDeviceColorScheme = (value: boolean) => {
        setUseDeviceColorScheme(value);
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title="Dark Mode" />
            </Appbar.Header>
            <View style={{ padding: 16 }}>
                <Surface style={{ padding: 8, borderRadius: roundness, marginBottom: 16 }}>
                    <Title style={{ textAlign: 'center' }}>ダークモードサンプル{'\n'}（React Native Paper利用時）</Title>
                </Surface>
                <Surface style={{ padding: 8, borderRadius: roundness, marginBottom: 16 }}>
                    <Text >ダークモードを利用する場合、以下の２つの設定を切り替えられるようにすると、親切になります。</Text>
                    <View style={{ margin: 8 }}>
                        <Text>＊ダークモードを利用するか否か</Text>
                        <Text>＊端末の設定に合わせて自動で切り替えるか否か</Text>
                    </View>
                    <Text >ダークモードを利用する場合、以下の２つの設定を切り替えられるようにすると、親切になります。</Text>
                </Surface>
                <Surface style={{ padding: 16, borderRadius: roundness, marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 8, flex: 1 }}>
                            <Subheading>ダークモード利用</Subheading>
                        </View>
                        <Switch
                            value={dark}
                            onValueChange={toggleDark}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 8, flex: 1 }}>
                            <Subheading>端末設定利用</Subheading>
                        </View>
                        <Switch
                            value={useDeviceColorScheme}
                            onValueChange={toggleUseDeviceColorScheme}
                            disabled={!dark}
                        />
                    </View>
                </Surface>
            </View>
        </View>
    );
}