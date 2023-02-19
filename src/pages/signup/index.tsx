import { db } from '@/common/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as S from '../../styles/signup.style';
import { regionArray, typesArray } from '@/common/categoryList';
import { useQuery } from 'react-query';
import { getUsersList } from '@/common/api';

//TODO: 회원가입 페이지 새로고침 할 때 "작성한 정보가 모두 사라집니다" alert 주기
// TODO: isSignedUp이라는 속성을 하나 추가할까? 회원가입 완료해야 true가 됨 (닉네임 중복 검사해야되기 때문에)
const SignUp = () => {
  const router = useRouter();

  // 유저의 세션 정보 받아오기
  const { data: session } = useSession();

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
    if (!checkNickname) {
      alert('사용 가능한 닉네임입니다.');
      setIsValidNickname(true);
    } else {
      alert('이미 존재하는 닉네임입니다. 다시 입력해주세요.');
      setIsValidNickname(false);
    }
  };

  // [회원가입 완료] 버튼 클릭 시 작동
  const signupHandler = async () => {
    if (!isValidNickname) {
      alert('닉네임 중복 검사를 완료해주세요');
      return;
    }
    // 관심 카테고리 선택하지 않으면 전체 리스트를 선택한 것으로 간주함
    const updateUser = {
      userName: nickname,
      regions: myRegionArray.length === 0 ? regionArray : myRegionArray,
      types: myTypeArray.length === 0 ? typesArray : myTypeArray,
    };

    await updateDoc(doc(db, 'Users', email), updateUser);
    alert('회원가입이 완료되었습니다.');
    router.push('/');
  };

  // Users 데이터 불러오기
  const { data: users, isLoading }: any = useQuery('users', getUsersList);
  console.log(users);

  useEffect(() => {
    // session(유저 정보)가 들어왔을 때만 함수를 실행함
    if (session) {
      setNickname(session?.user?.name);
      setEmail(session?.user?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div style={{ flexDirection: 'column' }}>
      <h1>회원가입</h1>
      <h4>닉네임</h4>
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      ></input>
      <button onClick={checkNicknameHandler}>닉네임 중복 확인</button>
      <button onClick={signupHandler}>회원가입 완료</button>

      {/* 관심 지역 카테고리 선택 */}
      <h3>관심 지역 선택</h3>
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
              bg={'lightblue'}
            >
              {region}
            </S.CategoryBtn>
          ) : (
            <S.CategoryBtn
              onClick={() => setMyRegionArray([...myRegionArray, region])}
              key={index}
              bg={'transparent'}
            >
              {region}
            </S.CategoryBtn>
          ),
        )}
        <S.CategoryBtn bg={'transparent'} onClick={() => setMyRegionArray([])}>
          전체 초기화
        </S.CategoryBtn>
        <S.CategoryBtn
          bg={'transparent'}
          onClick={() => setMyRegionArray(regionArray)}
        >
          전체 선택
        </S.CategoryBtn>
      </S.CategoryContainer>

      {/* 관심 분양 형태 카테고리 선택 */}
      <h3>관심 분양 형태 선택</h3>
      <S.CategoryContainer>
        {typesArray.map((type, index) =>
          type && myTypeArray.includes(type) ? (
            <S.CategoryBtn
              onClick={() =>
                setMyTypeArray(myTypeArray.filter((item) => item !== type))
              }
              key={index}
              bg={'lightblue'}
            >
              {type}
            </S.CategoryBtn>
          ) : (
            <S.CategoryBtn
              onClick={() => setMyTypeArray([...myTypeArray, type])}
              key={index}
              bg={'transparent'}
            >
              {type}
            </S.CategoryBtn>
          ),
        )}
        <S.CategoryBtn bg={'transparent'} onClick={() => setMyTypeArray([])}>
          전체 초기화
        </S.CategoryBtn>
        <S.CategoryBtn
          bg={'transparent'}
          onClick={() => setMyTypeArray(typesArray)}
        >
          전체 선택
        </S.CategoryBtn>
      </S.CategoryContainer>
    </div>
  );
};

export default SignUp;
