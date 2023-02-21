import { getHomeList, getUsersList } from '@/common/api';
import EditProfile from '@/components/MyPage/EditProfile/EditProfile';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

const MyPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // const [isInputOpen, setIsInputOpen] = useState(false);
  // const [nickname, setNickname] = useState<any>('');
  // // const [editNickname, setEditNickname] = useState<any>('');
  // const [email, setEmail] = useState<any>('');
  // const [profileImg, setProfileImg] = useState('');
  const [currentUser, setCurrentUser] = useState<any>('');

  // const [usersList, setUsersList] = useRecoilState(usersListState);

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  // // [닉네임 수정 완료] 버튼 클릭 시 작동
  // const changeNicknameHandler = async () => {
  //   const checkNickname = users.find(
  //     (user: userProps) => user.userName === editNickname,
  //   );
  //   if (checkNickname) {
  //     confirmAlert({
  //       customUI: ({ onClose }) => {
  //         return (
  //           <AlertUI
  //             alertText="이미 존재하는 닉네임입니다. 다시 입력해주세요."
  //             onClose={onClose}
  //           />
  //         );
  //       },
  //     });

  //     return;
  //   }
  //   const updateUser = {
  //     userName: editNickname,
  //   };
  //   //FIXME: THEN 없애도됨
  //   await updateDoc(doc(db, 'Users', email), updateUser).then(() => {
  //     setNickname(editNickname);
  //     confirmAlert({
  //       customUI: ({ onClose }) => {
  //         return <AlertUI alertText="닉네임 수정 완료!" onClose={onClose} />;
  //       },
  //     });
  //   });
  // };

  // Users 데이터 불러오기
  const { data: users, isLoading }: any = useQuery('users', getUsersList, {
    enabled: !!session, // session이 true인 경우에만 useQuery를 실행함
    // users를 불러오는 데 성공하면 현재 로그인한 유저의 정보를 찾아서 setCurrentUser에 담음
    onSuccess: (users) => {
      setCurrentUser(
        users.find(
          (user: userProps) => user.userEmail === session?.user?.email,
        ),
      );
      // setUsersList(users);
    },
  });

  const { data: homeList } = useQuery('HomeList', getHomeList);

  // 전체 분양 정보 리스트에서 내가 북마크한 정보만 필터링하기
  const myBookmarkList = homeList?.allHomeData?.filter(
    (item: ItemJ) =>
      item.PBLANC_NO && currentUser?.bookmarkList?.includes(item.PBLANC_NO),
  );

  //TODO: 로딩페이지에서 넘어온 거 아니면 접근 못하도록 제한하기
  useEffect(() => {
    // 비로그인 유저일 경우 접근 제한
    if (status === 'unauthenticated') router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
 
      <EditProfile
        users={users}
        currentUser={currentUser}
      />
      <h2>나의 북마크 목록</h2>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {myBookmarkList?.map((item: any, index: number) => {
          return (
            <div key={item.PBLANC_NO}>
              북마크{index + 1}번: {item.HOUSE_NM}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPage;
