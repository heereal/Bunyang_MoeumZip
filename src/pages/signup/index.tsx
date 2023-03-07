import { getUsersList } from '@/common/api';
import { db } from '@/common/firebase';
import { customUIAlert } from '@/common/utils';
import SelectMyRegion from '@/components/GlobalComponents/SelectMyRegion/SelectMyRegion';
import SelectMyTypes from '@/components/GlobalComponents/SelectMyTypes/SelectMyTypes';
import {
  currentUserState,
  myRegionArrayState,
  myTypeArrayState,
  usersListState,
} from '@/store/selectors';
import { doc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import * as S from '../../styles/signup.style';

//TODO: 회원가입 페이지 새로고침 할 때 "작성한 정보가 모두 사라집니다" alert 주기
const SignUp = () => {
  const router = useRouter();

  // 유저의 세션 정보 받아오기
  const { data: session, status }: any = useSession();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [users, setUsers] = useRecoilState(usersListState);

  // 유저가 선택한 카테고리 필터링 리스트
  const [myTypeArray, setMyTypeArray] = useRecoilState<any>(myTypeArrayState);
  const [myRegionArray, setMyRegionArray] =
    useRecoilState<any>(myRegionArrayState);

  // 닉네임 중복 검사 시 사용
  const [isValidNickname, setIsValidNickname] = useState(false);

  const [nickname, setNickname] = useState<any>('');

  // [닉네임 중복 확인] 버튼 클릭 시 작동
  const checkNicknameHandler = () => {
    const checkNickname = users.find(
      (user: userProps) => user.userName === nickname,
    );

    //닉네임을 입력하지 않았을 때
    if (!nickname) {
      customUIAlert('닉네임을 입력해주세요.');
      setIsValidNickname(false);
      return;
    }
    if (!checkNickname) {
      customUIAlert('사용 가능한 닉네임입니다.');
      setIsValidNickname(true);
      return;
    }

    if (checkNickname) {
      customUIAlert('이미 존재하는 닉네임입니다. 다시 입력해주세요.');
      setIsValidNickname(false);
      return;
    }
  };

  // [회원가입 완료] 버튼 클릭 시 작동
  const signupHandler = async () => {
    if (!isValidNickname) {
      customUIAlert('닉네임 중복 검사를 완료해주세요.');
      return;
    }
    // 관심 카테고리 선택하지 않으면 전체 리스트를 선택한 것으로 간주함
    const updateUser = {
      userName: nickname,
      regions: myRegionArray,
      types: myTypeArray,
    };

    await updateDoc(
      doc(db, 'Users', `${currentUser.provider}_${currentUser.userEmail}`),
      updateUser,
    );
    customUIAlert('회원가입이 완료되었습니다.');
    router.push('/');
  };

  // Users 데이터 불러오기
  const { data: usersData }: any = useQuery('users', getUsersList, {
    enabled: !!session, // session이 true인 경우에만 useQuery를 실행함
    // users를 불러오는 데 성공하면 현재 로그인한 유저의 정보를 찾아서 setCurrentUser에 담음
    onSuccess: (usersData) => {
      setUsers(
        usersData.filter(
          (user: userProps) =>
            user.userEmail !== session?.user?.email &&
            user.provider !== session?.user?.provider,
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
    if (status === 'unauthenticated' || router.query.loading === undefined)
      router.push('/', undefined, { shallow: true });
    // eslint-disable-next-line
  }, [session]);

  useEffect(() => {
    // session(유저 정보)가 들어왔을 때만 함수를 실행함
    if (currentUser) {
      setNickname(currentUser.userName);
      setMyRegionArray(currentUser.regions);
      setMyTypeArray(currentUser.types);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <S.Wrapper>
      <NextSeo
        title="회원가입 -"
        description="전국 분양정보를 한눈에 확인할 수 있는 플랫폼입니다."
      />

      <S.SignUpContainer>
        <S.SignUpDesc>
          <h1>회원가입</h1>
          <p>분양정보 추천을 위한 추가정보를 입력해주세요.</p>
        </S.SignUpDesc>

        {/* 닉네임 제출 */}
        <S.SubmitNicknameContainer>
          <S.NicknameTitle>
            닉네임<span>*</span>
          </S.NicknameTitle>
          <S.InputBtnContainer>
            <S.NicknameInput
              value={nickname || ''}
              onChange={(e) => setNickname(e.target.value)}
            />
            <S.CheckNicknameBtn onClick={checkNicknameHandler}>
              중복확인
            </S.CheckNicknameBtn>
          </S.InputBtnContainer>
        </S.SubmitNicknameContainer>

        {/* 관심 지역 카테고리 선택 */}
        <S.CategoryTitle>관심 지역</S.CategoryTitle>
        <SelectMyRegion width={'100%'} path={'/signup'} />

        {/* 관심 분양 형태 카테고리 선택 */}
        <S.CategoryTitle>관심 분양형태</S.CategoryTitle>
        <SelectMyTypes width={'100%'} path={'/signup'} />

        <S.SignUpBtnContainer>
          <S.SignUpBtn onClick={signupHandler}>가입완료</S.SignUpBtn>
        </S.SignUpBtnContainer>
      </S.SignUpContainer>
    </S.Wrapper>
  );
};

export default SignUp;
