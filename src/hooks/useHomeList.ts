import { getToday } from "@/common/utils";

const useHomeList = (list: ItemJ[]) => {

    // 오늘 날짜
    const today = getToday();

    // 청약 가능 리스트
    const todayList = list.filter(
        (item: ItemJ) =>
            item.RCEPT_BGNDE <= today &&
            item.RCEPT_ENDDE >= today &&
            item.HOUSE_SECD !== '04',
    );

    // 청약 예정 리스트
    const comingList = list.filter(
        (item: ItemJ) => item.RCEPT_BGNDE > today && item.HOUSE_SECD !== '04',
    );

    // 무순위 리스트
    const randomList = list.filter(
        (item: ItemJ) => item.HOUSE_SECD === '04' && item.RCEPT_BGNDE >= today,
    );

    // 전체 리스트
    const AllList: {}[] = [];
    todayList.map((item) => AllList.push(item));
    comingList.map((item) => AllList.push(item));
    randomList.map((item) => AllList.push(item));


    return { todayList, comingList, randomList, AllList };

}

export default useHomeList