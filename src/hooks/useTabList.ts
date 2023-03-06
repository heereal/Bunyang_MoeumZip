import { selectedRegionList, selectedTypeList } from "@/store/selectors";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

/**
 * CountTabs.tsx에서 쓰이는 customHook 
 * useHomeList customHook에서 반환된 리스트(5가지 리스트)별 청약가능, 청약예정, 무순위, 전체 리스트를 받아온다.
 * @param regionTypeList : 지역과 분양형태 필터를 모두 선택했을 때 리스트 ex. regionFilteredTypeComingList(청약예정)
 * @param regionList 지역 필터를 선택했을 때 리스트 ex.regionCategoryRandomList(무순위)
 * @param TypeList : 분양형태 필터를 선택했을 때 리스트 ex.typeCategoryTodayList(청약가능)
 * @param userList : 유저의 관심 지역 및 분양형태 필터 리스트 ex.userComingList(청약예정)
 * @param basicList : 로그인 하지 않았을 때 보이는 기본 리스트 ex.comingList(청약예정)
 * @returns : 반환된 리스트는 CountTabs의 tabList - content와 count로 활용되어 선택한 Tab별(전체, 청약가능~) 리스트와 리스트 개수를 보여준다.
 */
const useTabList = (regionTypeList: ItemJ[], regionList: ItemJ[], TypeList: ItemJ[], userList: ItemJ[], basicList: ItemJ[]) => {
    // 로그인 여부 확인
    const { data: session } = useSession();

    // CategoryBar에서 선택된 지역, 분양 형태 리스트 가져오기
    const [selectedRegionArray] = useRecoilState(selectedRegionList);
    const [selectedTypeArray] = useRecoilState(selectedTypeList);

    // 지역과 분양형태를 모두 선택했을 때 / 선택하지 않았을 때
    // 지역만 선택했을 때 / 분양형태만 선택했을 때
    // 카테고리를 선택 안 했을 때는 로그인 여부에 따라 리스트 다르게 보임
    const ListContent = selectedRegionArray?.length && selectedTypeArray.length !== 0
        ? regionTypeList
        : selectedRegionArray?.length !== 0
            ? regionList
            : selectedTypeArray.length !== 0
                ? TypeList
                : session
                    ? userList
                    : basicList


    // 각 리스트의 길이를 구해서 CountTab에 숫자로 표시
    const ListCount = selectedRegionArray?.length && selectedTypeArray.length !== 0
        ? regionTypeList.length
        : selectedRegionArray?.length !== 0
            ? regionList.length
            : selectedTypeArray.length !== 0
                ? TypeList.length
                : session
                    ? userList.length
                    : basicList.length

    return { ListContent, ListCount };
}

export default useTabList
