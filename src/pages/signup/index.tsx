import { db } from '@/common/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as S from '../../styles/signup.style';
import { regionArray, typesArray } from '@/common/categoryList';
import { useQuery } from 'react-query';
import { getUsersList } from '@/common/api';
import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import { confirmAlert } from 'react-confirm-alert';

//TODO: 회원가입 페이지 새로고침 할 때 "작성한 정보가 모두 사라집니다" alert 주기
// TODO: isSignedUp이라는 속성을 하나 추가할까? 회원가입 완료해야 true가 됨 (닉네임 중복 검사해야되기 때문에)
const SignUp = () => {
  const router = useRouter();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  // 닉네임 중복 검사 시 사용
  const [isValidNickname, setIsValidNickname] = useState(false);

  // 유저가 선택한 카테고리 필터링 리스트
  const [myRegionArray, setMyRegionArray] = useState<string[]>([]);
  const [myTypeArray, setMyTypeArray] = useState<string[]>([]);

  const [nickname, setNickname] = useState<any>('');
  const [email, setEmail] = useState<any>('');

  // [닉네임 중복 확인] 버튼 클릭 시 작동
  const checkNicknameHandler = () => {
    const checkNickname = users.find(
      (user: userProps) => user.userName === nickname,
    );
    //닉네임을 입력하지 않았을 때
    if (!nickname) {
      alert('닉네임을 입력해주세요.');
      setIsValidNickname(false);
      return;
    }
    if (!checkNickname) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <AlertUI alertText="사용 가능한 닉네임입니다." onClose={onClose} />
          );
        },
      }),
        setIsValidNickname(true);
    } else {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <AlertUI
              alertText="이미 존재하는 닉네임입니다. 다시 입력해주세요."
              onClose={onClose}
            />
          );
        },
      }),
        setIsValidNickname(false);
    }
  };

  // [회원가입 완료] 버튼 클릭 시 작동
  const signupHandler = async () => {
    if (!isValidNickname) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <AlertUI
              alertText="닉네임 중복 검사를 완료해주세요"
              onClose={onClose}
            />
          );
        },
      });
      return;
    }
    // 관심 카테고리 선택하지 않으면 전체 리스트를 선택한 것으로 간주함
    const updateUser = {
      userName: nickname,
      regions: myRegionArray.length === 0 ? regionArray : myRegionArray,
      types: myTypeArray.length === 0 ? typesArray : myTypeArray,
    };

    await updateDoc(doc(db, 'Users', email), updateUser);
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <AlertUI alertText="회원가입이 완료되었습니다." onClose={onClose} />
        );
      },
    });

    router.push('/');
  };

  // Users 데이터 불러오기
  const { data: users, isLoading }: any = useQuery('users', getUsersList);

  useEffect(() => {
    // 비로그인 유저일 경우 접근 제한
    if (status === 'unauthenticated') router.push('/');
    // eslint-disable-next-line
  }, [session]);

  useEffect(() => {
    // session(유저 정보)가 들어왔을 때만 함수를 실행함
    if (session) {
      setNickname(session?.user?.name);
      setEmail(session?.user?.email);
    }
    // eslint-disable-next-line
  }, [session]);

  return (
    <S.Wrapper>
      <S.SignUpContainer>
        <S.SignUpDesc>
          <h1>회원가입</h1>
          <p>분양정보 추천을 위한 추가정보를 선택해주세요.</p>
        </S.SignUpDesc>

        {/* 닉네임 제출 */}
        <S.SubmitNicknameContainer>
          <S.NicknameTitle>
            닉네임<span>*</span>
          </S.NicknameTitle>
          <S.InputBtnContainer>
            <S.NicknameInput
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요."
            />
            <S.CheckNicknameBtn onClick={checkNicknameHandler}>
              중복확인
            </S.CheckNicknameBtn>
          </S.InputBtnContainer>
        </S.SubmitNicknameContainer>

        {/* 관심 지역 카테고리 선택 */}
        <S.CategoryTitle>관심 지역 선택</S.CategoryTitle>
        <S.CategoryContainer>
          {regionArray.map((region, index) =>
            region && myRegionArray.includes(region) ? (
              <S.CategoryBtn
                onClick={() =>
                  setMyRegionArray(
                    myRegionArray.filter((item) => item !== region),
                  )
                }
                key={index}
                bg={'#F1F6FF'}
                text={'#3D7FFF'}
                border={'#3D7FFF'}
              >
                {region}
              </S.CategoryBtn>
            ) : (
              <S.CategoryBtn
                onClick={() => setMyRegionArray([...myRegionArray, region])}
                key={index}
                bg={'white'}
                text={'#7b7b7b'}
                border={'#F4F4F4'}
              >
                {region}
              </S.CategoryBtn>
            ),
          )}
          <S.CategoryBtn
            bg={'white'}
            text={'#7b7b7b'}
            border={'#F4F4F4'}
            onClick={() => setMyRegionArray([])}
          >
            전체 초기화
          </S.CategoryBtn>
          <S.CategoryBtn
            bg={'white'}
            text={'#7b7b7b'}
            border={'#F4F4F4'}
            onClick={() => setMyRegionArray(regionArray)}
          >
            전체 선택
          </S.CategoryBtn>
        </S.CategoryContainer>

        {/* 관심 분양 형태 카테고리 선택 */}
        <S.CategoryTitle>관심 분양 형태 선택</S.CategoryTitle>
        <S.CategoryContainer>
          {typesArray.map((type, index) =>
            type && myTypeArray.includes(type) ? (
              <S.CategoryBtn
                onClick={() =>
                  setMyTypeArray(myTypeArray.filter((item) => item !== type))
                }
                key={index}
                bg={'#F1F6FF'}
                text={'#3D7FFF'}
                border={'#3D7FFF'}
              >
                {type}
              </S.CategoryBtn>
            ) : (
              <S.CategoryBtn
                onClick={() => setMyTypeArray([...myTypeArray, type])}
                key={index}
                bg={'white'}
                text={'#7b7b7b'}
                border={'#F4F4F4'}
              >
                {type}
              </S.CategoryBtn>
            ),
          )}
          <S.CategoryBtn
            bg={'white'}
            text={'#7b7b7b'}
            border={'#F4F4F4'}
            onClick={() => setMyTypeArray([])}
          >
            전체 초기화
          </S.CategoryBtn>
          <S.CategoryBtn
            bg={'white'}
            text={'#7b7b7b'}
            border={'#F4F4F4'}
            onClick={() => setMyTypeArray(typesArray)}
          >
            전체 선택
          </S.CategoryBtn>
        </S.CategoryContainer>
        <S.SignUpBtn onClick={signupHandler}>가입완료</S.SignUpBtn>
      </S.SignUpContainer>
    </S.Wrapper>
  );
};

export default SignUp;
