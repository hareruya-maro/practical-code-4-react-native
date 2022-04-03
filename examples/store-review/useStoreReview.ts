import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import * as StoreReview from 'expo-store-review';
import { useEffect, useState } from 'react';

export default function useStoreReview(periodByMonth = 6) {
    const [isAvailable, setIsAvailable] = useState(false);
    const [nextReviewDate, setNextReviewDate] = useState<Date>();

    // 次回のレビュー日を計算し保存する
    const saveNextReviewDate = async () => {
        try {
            const nextReviewDate = dayjs().add(periodByMonth, 'month')
            AsyncStorage.setItem('nextReviewDate', nextReviewDate.format('YYYY-MM-DD'))
                .catch(e => console.log(e));
            setNextReviewDate(nextReviewDate.toDate());
        } catch (error) {
            console.log(error);
        }
    }

    // レビュー日を昨日に設定する（動作検証用）
    const resetNextReviewDate = () => {
        const nextReviewDate = dayjs().add(-1, 'day')
        AsyncStorage.setItem('nextReviewDate', nextReviewDate.format('YYYY-MM-DD'))
            .catch(e => console.log(e));
        setNextReviewDate(nextReviewDate.toDate());
    }

    useEffect(() => {
        // ストアレビュー機能を利用できるかどうかを判定する
        StoreReview.isAvailableAsync().then(setIsAvailable);

        // 次回のレビュー日を取得する
        AsyncStorage.getItem('nextReviewDate').then(value => {
            // 取得できた場合
            if (value) {
                setNextReviewDate(dayjs(value, 'YYYY-MM-DD').toDate());
            } else {
                // 取得できなかった場合はまだ一度もレビューを依頼していないので、
                // 次回のレビュー日を計算し保存する
                saveNextReviewDate();
            }
        });
    }, [periodByMonth]);

    // レビュー依頼
    const requestReview = async () => {
        if (isAvailable && dayjs(nextReviewDate).isBefore(dayjs())) {
            await StoreReview.requestReview();
            saveNextReviewDate();
        }
    }

    return { requestReview, nextReviewDate, resetNextReviewDate };

}