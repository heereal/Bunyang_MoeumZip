import { getToday } from "@/common/utils";

const useHomeList = (list: ItemJ[]) => {

    // 오늘 날짜
    const today = getToday();

    const todayList = list.filter(
        (item: ItemJ) =>
            item.RCEPT_BGNDE <= today &&
            item.RCEPT_ENDDE >= today &&
            item.HOUSE_SECD !== '04',
    );

    const comingList = list.filter(
        (item: ItemJ) => item.RCEPT_BGNDE > today && item.HOUSE_SECD !== '04',
    );
    const randomList = list.filter(
        (item: ItemJ) => item.HOUSE_SECD === '04' && item.RCEPT_BGNDE >= today,
    );

    const AllList: {}[] = [];
    todayList.map((item) => AllList.push(item));
    comingList.map((item) => AllList.push(item));
    randomList.map((item) => AllList.push(item));


    return { todayList, comingList, randomList, AllList };

}

export default useHomeList