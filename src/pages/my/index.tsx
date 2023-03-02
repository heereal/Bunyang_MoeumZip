import { getUsersList } from '@/common/api';
import HeadTitle from '@/components/GlobalComponents/HeadTitle/HeadTitle';
import EditProfile from '@/components/MyPage/EditProfile/EditProfile';
import MyTabs from '@/components/MyPage/MyTabs/MyTabs';
import { currentUserState, usersListState } from '@/store/selectors';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import * as S from '../../styles/my.style';

const MyPage = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [users, setUsers] = useRecoilState(usersListState);

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();
  console.log('session:', session);

  // Users 데이터 불러오기
  const { data: usersData }: any = useQuery('users', getUsersList, {
    enabled: !!session, // session이 true인 경우에만 useQuery를 실행함
    // users를 불러오는 데 성공하면 현재 로그인한 유저의 정보를 찾아서 setCurrentUser에 담음
    onSuccess: (usersData) => {
      setUsers(usersData);
      setCurrentUser(
        usersData.find(
          (user: userProps) => user.userEmail === session?.user?.email,
        ),
      );
    },
  });

  //TODO: 로딩페이지에서 넘어온 거 아니면 접근 못하도록 제한하기
  useEffect(() => {
    // 비로그인 유저일 경우 접근 제한
    if (status === 'unauthenticated' || currentUser === undefined)
      router.push('/');
    // eslint-disable-next-line
  }, [session]);

  return (
    <S.Wrapper>
      <HeadTitle title="마이페이지 |" />

      <EditProfile users={users} currentUser={currentUser} />
      <MyTabs />
    </S.Wrapper>
  );
};

export default MyPage;
