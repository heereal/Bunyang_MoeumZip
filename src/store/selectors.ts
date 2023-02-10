import { useEffect } from 'react';
import { useSubscription } from '@/hooks';
import { atom } from 'recoil';

// const { testst, test2 } = useSubscription();

// useEffect(() => {
//     testst()
// }, []);

export const subscriptionList: any = atom({
    key: 'subscriptionList',
    default: []
})