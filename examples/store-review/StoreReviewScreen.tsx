import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as React from 'react';
import { View } from 'react-native';
import { Appbar, Button, Paragraph, Subheading, Surface, Text, Title, useTheme } from 'react-native-paper';
import { StackParamList } from '../../App';
import useStoreReview from './useStoreReview';

type Props = NativeStackNavigationProp<StackParamList, 'StoreReview'>;

export default function StoreReview() {
    const navigation = useNavigation<Props>();
    const { colors, roundness } = useTheme();
    const { requestReview, nextReviewDate, resetNextReviewDate } = useStoreReview();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <Appbar.Header>
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content title="ストアレビュー" />
            </Appbar.Header>
            <View style={{ padding: 16 }}>
                <Surface style={{ padding: 8, borderRadius: roundness, marginBottom: 16 }}>
                    <Title style={{ textAlign: 'center' }}>ストアレビューサンプル</Title>
                </Surface>
                <Surface style={{ padding: 8, borderRadius: roundness, marginBottom: 16 }}>
                    <Text >ストアレビューの依頼は、以下のような点を気をつける必要があります。</Text>
                    <View style={{ margin: 8 }}>
                        <Text>＊短期間に何度もレビュー依頼しないこと</Text>
                        <Text>＊アプリの操作の途中でレビュー依頼しないこと</Text>
                        <Text>＊レビュー依頼の表示中はその他のメッセージを表示したりしないこと</Text>
                    </View>
                    <Text >そのため、基本的には以下のような条件でレビュー依頼を表示します。</Text>
                    <View style={{ margin: 8 }}>
                        <Text>＊アプリの利用開始からNカ月経過していること</Text>
                        <Text>＊前回レビューを依頼してからNカ月経過していること</Text>
                        <Text>＊何かの操作が完了してキリがいいタイミングで呼び出すこと</Text>
                    </View>
                    <Text>実装する際には、「前回レビュー依頼した日」をAsyncStorageなどで保存しておき、それを元に呼び出すタイミングを制御するカスタムhookを作って対応します。</Text>
                </Surface>
                <Surface style={{ padding: 16, borderRadius: roundness, marginBottom: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 8, flex: 1 }}>
                            <Subheading>ストアレビュー呼び出し</Subheading>
                            <Paragraph>次回レビュー予定日：{nextReviewDate?.toLocaleDateString()}</Paragraph>
                        </View>
                        <Button mode='contained' onPress={requestReview} uppercase={false}>Review</Button>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ padding: 8, flex: 1 }}>
                            <Subheading>予定日を昨日にリセットする</Subheading>
                        </View>
                        <Button mode='contained' onPress={resetNextReviewDate} uppercase={false} color={colors.error}>Reset</Button>
                    </View>
                </Surface>
            </View>
        </View>
    );
}