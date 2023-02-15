import { db } from '@/common/firebase';
import { addDoc, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as S from "../../styles/signup.style"

//TODO: 회원가입 페이지 새로고침 할 때 "작성한 정보가 모두 사라집니다" alert 주기
const SignUp = () => {
  const regionArray = ["서울", "강원", "대전", "충남", "세종", "충북", "인천", "경기", "광주", "전남", "전북", "부산", "경남", "울산", "제주", "대구", "경북"]
  const typesArray = ["국민임대", "장기전세", "민간분양", "일반 민간임대", "10년 공공임대", "영구임대", "5년 공공임대", "공공분양", "5년 민간임대", "뉴스테이", "행복주택"]
  const router = useRouter();

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();
  console.log(session);

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState<any[]>([])
  const [myRegionArray, setMyRegionArray] = useState<any[]>([])
  const [myTypeArray, setMyTypeArray] = useState<any[]>([])

  // 현재 로그인한 유저의 정보가 firestore 'Users' collection에 존재하는지 비교함
  const redirectUser = async () => {
    const array: any[] = [];
    let email2: any = "";

    const q = query(
      collection(db, 'Users'),
      // where('userEmail', '==', session?.user?.email),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      array.push({
        // id: doc.id,
        ...doc.data(),
      }),
    );

    setUserData(array)

    const newUser = {
      userEmail: session?.user?.email,
      userName: session?.user?.name,
      userImage: session?.user?.image,
      regions: [],
      types: [],
    };

    email2 = session?.user?.email

    // const filteredArray = array.filter((user) => user.userEmail === session?.user?.email)

    // 이미 가입한 유저라면 메인으로 이동,
    // 최초 로그인한 유저라면 firestior에 유저 정보를 새로 저장함
    if (array.filter((user) => user.userEmail === email2).length >= 1) {
      // router.push('/');
      console.log('이미 가입한 유저임');
    } else {
      console.log('최초 로그인 유저임');
      // await addDoc(collection(db, 'Users'), newUser);
      await setDoc(doc(db, "Users", email2), newUser);
    }
  };

  // [닉네임 중복 확인] 버튼 클릭 시 작동
  const checkNicknameHandler = () => {
    const checkNickname = userData.find((user) => user.userName === nickname);
    console.log(checkNickname);
    if (!checkNickname) {
      alert("사용 가능한 닉네임입니다.")
      return true;
    } else {
      alert("이미 존재하는 닉네임입니다. 다시 입력해주세요.")
      return false;
    }
  };

  //TODO: 카테고리 선택 안하면 전체 카테고리 선택돼서 들어감
  // 최소 몇 개 이상 선택 조건은 없음
  // [회원가입 완료] 버튼 클릭 시 작동
  const signupHandler = async () => {
    const updateUser = {
      userName: nickname,
      regions: myRegionArray,
      types: myTypeArray
    }

    await updateDoc(doc(db, 'Users', email), updateUser);
    // router.push('/');
    console.log('유저 정보 수정 완료!');
  };
  console.log(myRegionArray);

  useEffect(() => {
    // session(유저 정보)가 들어왔을 때만 함수를 실행함
    if (session) {
      redirectUser();
      setNickname(session?.user?.name);
      setEmail(session?.user?.email)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <div style={{ flexDirection: 'column' }}>
      <h1>회원가입</h1>
      <h4>닉네임</h4>
      <input value={nickname} onChange={(e) => setNickname(e.target.value)}></input>
      <button onClick={checkNicknameHandler}>닉네임 중복 확인</button>
      <button onClick={signupHandler}>회원가입 완료</button>
      {/* 관심 지역 카테고리 선택 */}
      <h3>관심 지역 선택</h3>
      <S.CategoryContainer>
        {regionArray.map((region, index) => (
          region && myRegionArray.includes(region) ? 
          <S.CatrgoryBtn onClick={() => setMyRegionArray(myRegionArray.filter((item) => item !== region))} key={index} bg={"lightblue"}>{region}</S.CatrgoryBtn> :
          <S.CatrgoryBtn onClick={() => setMyRegionArray([...myRegionArray, region])} key={index} bg={"transparent"}>{region}</S.CatrgoryBtn>
        ))
        }
      </S.CategoryContainer>
      {/* 관심 분양 형태 카테고리 선택 */}
      <h3>관심 분양 형태 선택</h3>
      <S.CategoryContainer>
        {typesArray.map((type, index) => (
          type && myTypeArray.includes(type) ? 
          <S.CatrgoryBtn onClick={() => setMyTypeArray(myTypeArray.filter((item) => item !== type))} key={index} bg={"lightblue"}>{type}</S.CatrgoryBtn> :
          <S.CatrgoryBtn onClick={() => setMyTypeArray([...myTypeArray, type])} key={index} bg={"transparent"}>{type}</S.CatrgoryBtn>
        ))
        }
      </S.CategoryContainer>
    </div>
  );
};

export default SignUp;
