import { selectedRegionList, selectedTypeList } from "@/store/selectors";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

const useTabList = (regionTypeList: ItemJ[], regionList: ItemJ[], TypeList: ItemJ[], userList: ItemJ[], basicList: ItemJ[]) => {
    // 로그인 여부 확인
    const { data: session } = useSession();

    // CategoryBar에서 선택된 지역, 분양 형태 리스트 가져오기
    const [selectedRegionArray] = useRecoilState(selectedRegionList);
    const [selectedTypeArray] = useRecoilState(selectedTypeList);

    // 지역과 분양형태를 모두 선택했을 때 / 아닐 때
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
