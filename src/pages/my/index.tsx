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
import { NextSeo } from 'next-seo';

const MyPage = () => {
  const router = useRouter();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [users, setUsers] = useRecoilState(usersListState);

  // 유저의 세션 정보 받아오기
  const { data: session, status }: any = useSession();

  // Users 데이터 불러오기
  const { data: usersData }: any = useQuery('users', getUsersList, {
    enabled: !!session, // session이 true인 경우에만 useQuery를 실행함
    // users를 불러오는 데 성공하면 현재 로그인한 유저의 정보를 찾아서 setCurrentUser에 담음
    onSuccess: (usersData) => {
      setUsers(
        usersData.filter(
          (user: userProps) =>
            user.userEmail !== session.user.email &&
            user.provider !== session.user.provider,
        ),
      );
      setCurrentUser(
        usersData.find(
          (user: userProps) =>
            user.userEmail === session?.user?.email &&
            user.provider === session?.user?.provider,
        ),
      );
    },
  });

  useEffect(() => {
    // 비로그인 유저일 경우 접근 제한
    if (status === 'unauthenticated' || currentUser === undefined)
      router.push('/');
    // eslint-disable-next-line
  }, [session]);

  return (
    <S.Wrapper>
      <NextSeo
        title="마이페이지 -"
        description="전국 분양정보를 한눈에 확인할 수 있는 플랫폼입니다."
      />

      <EditProfile currentUser={currentUser} />
      <MyTabs />
    </S.Wrapper>
  );
};

export default MyPage;
