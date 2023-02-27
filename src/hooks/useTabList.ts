import { selectedRegionList, selectedTypeList } from "@/store/selectors";
import { useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

const useTabList = (regionTypeList: ItemJ[], regionList: ItemJ[], TypeList: ItemJ[], userList: ItemJ[], basicList: ItemJ[]) => {
    // 로그인 여부 확인
    const { data: session } = useSession();

    const [selectedRegionArray] = useRecoilState(selectedRegionList);
    const [selectedTypeArray] = useRecoilState(selectedTypeList);

    const ListContent = selectedRegionArray.length && selectedTypeArray.length !== 0
        ? regionTypeList
        : selectedRegionArray.length !== 0
            ? regionList
            : selectedTypeArray.length !== 0
                ? TypeList
                : session
                    ? userList
                    : basicList

    const ListCount = selectedRegionArray.length && selectedTypeArray.length !== 0
        ? regionTypeList.length
        : selectedRegionArray.length !== 0
            ? regionList.length
            : selectedTypeArray.length !== 0
                ? TypeList.length
                : session
                    ? userList.length
                    : basicList.length

    return { ListContent, ListCount };


}

export default useTabList
