import { useSession } from 'next-auth/react';
import { db, storage } from '@/common/firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import transparentProfile from "../../../public/transparentProfile.png"

const MyPage = () => {
  const router = useRouter();
  const [usersList, setUsersList] = useState<any[]>([]);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [nickname, setNickname] = useState<any>('');
  const [email, setEmail] = useState<any>('');

  // 파일 업로드 시 업로드한 파일을 담아둘 state
  const [imageUpload, setImageUpload] = useState(null);

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  // firestore에서 'Users' 데이터 볼러 옴
  const getUsersList = async () => {
    const array: any[] = [];

    const q = query(
      collection(db, 'Users'),
      where('userEmail', '==', session?.user?.email),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      array.push({
        ...doc.data(),
      }),
    );
    setUsersList(array);
    setNickname(usersList[0]?.userName);
    setEmail(usersList[0]?.userEmail);
  };

  // [닉네임 수정 완료] 버튼 클릭 시 작동
  const changeNicknameHandler = async () => {
    const checkNickname = usersList.find((user) => user.userName === nickname);
    if (checkNickname) {
      alert('이미 존재하는 닉네임입니다. 다시 입력해주세요.');
      return;
    }
    const updateUser = {
      userName: nickname,
    };
    await updateDoc(doc(db, 'Users', email), updateUser);
    alert('닉네임 수정 완료!');
  };

  // [프사 수정 완료] 버튼 클릭 시 작동
  const uploadImage = async () => {
    // 이미지를 업로드하지 않았다면 작동하지 않음
    if (imageUpload === null) return;

    const imageTitle = uuidv4();

    const imageRef = ref(storage, `profileImages/${imageTitle}`);
    // Storage에 이미지 업로드
    await uploadBytes(imageRef, imageUpload)
    // 업로드한 이미지의 url 가져오기
    const downloadUrl = await getDownloadURL(imageRef);
    
    // 업로드한 이미지 url로 Firestore 정보 업데이트
    const updateUser = {
      userImage: downloadUrl,
    };
    await updateDoc(doc(db, 'Users', email), updateUser);

    alert("프로필 이미지 업로드가 완료되었습니다.")
  };

  // 비로그인 유저일 경우 접근 제한
  useEffect(() => {
    if (status === 'unauthenticated') router.push('/');
  }, [status]);

  // session(유저 정보)가 들어오면 getUsersList 함수 실행
  useEffect(() => {
    if (session) getUsersList();
  }, [session]);

  return (
    <>
      <div>닉네임: {usersList[0]?.userName}</div>
      <button onClick={() => setIsInputOpen(!isInputOpen)}>닉네임 수정</button>
      {isInputOpen ? (
        <>
          <input
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button onClick={changeNicknameHandler}>닉네임 수정 완료</button>
        </>
      ) : null}
      <h4>프로필 사진</h4>
      <Image
        // 프로필 정보 불러오기 전에는 투명한 이미지를 보여줌(엑박 뜨지 않도록)
        src={usersList.length === 0 ? transparentProfile : usersList[0]?.userImage}
        alt="profile"
        width={100}
        height={100}
        quality={75}
        style={{ borderRadius: 60 }}
        priority={true}
      />
      <input type="file" onChange={(event: any) => {
          setImageUpload(event.target.files[0]);
        }}/>
      <button onClick={uploadImage}>프사 수정 완료</button>
    </>
  );
};

export default MyPage;
