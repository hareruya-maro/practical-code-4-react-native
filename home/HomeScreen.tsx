import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { StackParamList } from '../App';

type Props = NativeStackNavigationProp<StackParamList, 'Home'>;

export default function HomeScreen() {
    const navigation = useNavigation<Props>();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text>Home Screen</Text>
            <Button onPress={() => navigation.navigate('DarkModePaper')}>Dark Mode (React Native Paper)</Button>
        </View>);
}