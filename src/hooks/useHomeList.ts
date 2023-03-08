import { getToday } from "@/common/utils";
import { useEffect, useState } from "react";

/**
 * CountTabs.tsx에서 쓰이는 customHook 
 * @param list : 기본리스트(카테고리 필터를 선택하지 않았을 때),유저의 관심리스트, 지역 필터링 리스트, 분양형태 필터링 리스트, 지역 및 분양형태 필터링 리스트  
 * @returns : param으로 받은 리스트마다 청약가능, 청약예정, 무순위, 전체 리스트를 반환. 
 */

const useHomeList = (list: ItemJ[]) => {
    const [isToday, setIsToday] = useState('')

    useEffect(() => {
        const today = getToday();
        setIsToday(today)

    }, [])
    // 오늘 날짜

    // 청약 가능 리스트
    const todayList = list.filter(
        (item: ItemJ) =>
            item.RCEPT_BGNDE <= isToday &&
            item.RCEPT_ENDDE >= isToday &&
            item.HOUSE_SECD !== '04',
    );

    // 청약 예정 리스트
    const comingList = list.filter(
        (item: ItemJ) => item.RCEPT_BGNDE > isToday && item.HOUSE_SECD !== '04',
    );

    // 무순위 리스트
    const randomList = list.filter(
        (item: ItemJ) => item.HOUSE_SECD === '04' && item.RCEPT_BGNDE >= isToday,
    );

    // 전체 리스트
    const AllList: {}[] = [];
    todayList.map((item) => AllList.push(item));
    comingList.map((item) => AllList.push(item));
    randomList.map((item) => AllList.push(item));

    return { todayList, comingList, randomList, AllList };

}

export default useHomeList