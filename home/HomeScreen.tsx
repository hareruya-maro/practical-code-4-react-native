import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { SectionList, View } from 'react-native';
import { Appbar, Colors, Divider, List, useTheme } from 'react-native-paper';
import { StackParamList } from '../App';

type Props = NativeStackNavigationProp<StackParamList, 'Home'>;

export default function HomeScreen() {
    const navigation = useNavigation<Props>();
    const { colors, dark } = useTheme();

    const renderSectionHeader = ({ section }: { section: { title: string } }) => {
        return (
            <View style={{ backgroundColor: dark ? Colors.indigo900 : Colors.indigo100, opacity: 0.8, }}>
                <List.Subheader style={{ opacity: 1, margin: 8 }}>{section.title}</List.Subheader>
                <Divider />
            </View>
        )
    }

    const renderItem = ({ item }: { item: { icon: string, title: string, description: string, routeName: keyof StackParamList } }) => {
        return (
            <View style={{ backgroundColor: colors.surface }}>
                <List.Item
                    title={item.title}
                    titleNumberOfLines={2}
                    description={item.description}
                    descriptionNumberOfLines={3}
                    onPress={() => navigation.navigate(item.routeName)}
                    left={() => <View style={{ justifyContent: 'center' }}><List.Icon icon={item.icon} /></View>}
                    right={() => <View style={{ justifyContent: 'center' }}><List.Icon icon="chevron-right" /></View>}
                />
                <Divider />
            </View>
        )
    }

    const sections: { title: string, data: { icon: string, title: string, description: string, routeName: keyof StackParamList }[] }[]
        = [{
            title: '画面表示系',
            data: [{
                icon: "invert-colors",
                title: "Dark Mode (React Native Paper)",
                description: "React Native Paper利用時にダークモード機能を組み込む場合のサンプル",
                routeName: 'DarkModePaper',
            }, {
                icon: "store",
                title: "ストアレビュー",
                description: "ストアレビュー機能を組み込む場合のサンプル",
                routeName: 'StoreReview'
            }]
        }];

    return (
        <View style={{ flex: 1 }}>
            <Appbar.Header>
                <Appbar.Content title="Home" />
            </Appbar.Header>
            <SectionList
                style={{ flex: 1, backgroundColor: colors.background }}
                keyExtractor={(item, index) => item.routeName}
                sections={sections}
                renderSectionHeader={renderSectionHeader}
                renderItem={renderItem}
            />
        </View>);
}