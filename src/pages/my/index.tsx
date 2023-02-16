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
import transparentProfile from '../../../public/transparentProfile.png';
import { useImgInput } from '@/hooks';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const MyPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [usersList, setUsersList] = useState<any[]>([]);
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [nickname, setNickname] = useState<any>('');
  const [editNickname, setEditNickname] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [profileImg, setProfileImg] = useState('');

  // 파일 업로드 시 업로드한 파일을 담아둘 state
  const [imageUpload, setImageUpload] = useState<any>(null);

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

    return array;
  };

  // [닉네임 수정 완료] 버튼 클릭 시 작동
  const changeNicknameHandler = async () => {
    const checkNickname = usersList.find((user) => user.userName === editNickname);
    if (checkNickname) {
      alert('이미 존재하는 닉네임입니다. 다시 입력해주세요.');
      return;
    }
    const updateUser = {
      userName: editNickname,
    };
    await updateDoc(doc(db, 'Users', email), updateUser);
    setNickname(editNickname)
    alert('닉네임 수정 완료!');
  };

  // 이미지 업로드 시 이미지 미리보기 바로 반영됨
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImageUpload(e.target.files[0])
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // setImageUpload(reader.result);
          setProfileImg(reader.result);
        }
      };
    }
  };

  //TODO: 이미지 업로드 시 용량 줄여서 올리기
  // [프사 수정 완료] 버튼 클릭 시 작동
  const uploadImage = async () => {
    // 이미지를 업로드하지 않았다면 작동하지 않음
    if (imageUpload === null) return;

    const imageTitle = uuidv4();

    const imageRef = ref(storage, `profileImages/${imageTitle}`);
    // Storage에 이미지 업로드
    await uploadBytes(imageRef, imageUpload);
    // 업로드한 이미지의 url 가져오기
    const downloadUrl = await getDownloadURL(imageRef);

    // 업로드한 이미지 url로 Firestore 정보 업데이트
    const updateUser = {
      userImage: downloadUrl,
    };
    await updateDoc(doc(db, 'Users', email), updateUser);
    // setProfileImg(downloadUrl)

    alert('프로필 이미지 업로드가 완료되었습니다.');
  };

  // Users 데이터 불러오기
  const { data: users, isLoading }: any = useQuery('users', getUsersList, {
    enabled: !!session, // session이 ture인 경우에만 useQuery를 실행함
  });

  // 닉네임 변경
  const editNicknameMutation: any = useMutation(changeNicknameHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  useEffect(() => {
    // session(유저 정보)가 들어오면 getUsersList 함수 실행
    if (session) getUsersList();
     // 비로그인 유저일 경우 접근 제한
    if (status === 'unauthenticated') router.push('/');
  }, [session]);

  useEffect(() => {
    if (users) {
      setNickname(users[0]?.userName);
      setEmail(users[0]?.userEmail);
      setProfileImg(users[0]?.userImage);
      setEditNickname(users[0]?.userName)
    }
  }, [users]);

  return (
    <>
      <div>닉네임: {nickname}</div>
      <button onClick={() => setIsInputOpen(!isInputOpen)}>닉네임 수정</button>
      {isInputOpen ? (
        <>
          <input
            value={editNickname}
            onChange={(e) => setEditNickname(e.target.value)}
          />
          <button onClick={editNicknameMutation.mutate}>닉네임 수정 완료</button>
        </>
      ) : null}
      <h4>프로필 사진</h4>
      <Image
        // 프로필 정보 불러오기 전에는 투명한 이미지를 보여줌(엑박 뜨지 않도록)
        src={
          usersList.length === 0 ? transparentProfile : profileImg
        }
        alt="profile"
        width={300}
        height={300}
        quality={75}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
        priority={true}
      />
      <input
        type="file"
        accept="images/*"
        // style={{display: "none"}}
        // onChange={(event: any) => {
        //   setImageUpload(event.target.files[0]);
        // }}
        onChange={(e) => onImageChange(e)}
      />
      <button onClick={uploadImage}>프사 수정 완료</button>
    </>
  );
};

export default MyPage;
