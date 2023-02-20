import { useSession } from 'next-auth/react';
import { db, storage } from '@/common/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import transparentProfile from '../../assets/transparentProfile.png';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getUsersList, getHomeList } from '@/common/api';
import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import { confirmAlert } from 'react-confirm-alert';

const MyPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isInputOpen, setIsInputOpen] = useState(false);
  const [nickname, setNickname] = useState<any>('');
  const [editNickname, setEditNickname] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [profileImg, setProfileImg] = useState('');
  const [currentUser, setCurrentUser] = useState<any>('');

  // 파일 업로드 시 업로드한 파일을 담아둘 state
  const [imageUpload, setImageUpload] = useState<any>('');

  // 유저의 세션 정보 받아오기
  const { data: session, status } = useSession();

  // [닉네임 수정 완료] 버튼 클릭 시 작동
  const changeNicknameHandler = async () => {
    const checkNickname = users.find(
      (user: userProps) => user.userName === editNickname,
    );
    if (checkNickname) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <AlertUI
              alertText="이미 존재하는 닉네임입니다. 다시 입력해주세요."
              onClose={onClose}
            />
          );
        },
      });

      return;
    }
    const updateUser = {
      userName: editNickname,
    };
    await updateDoc(doc(db, 'Users', email), updateUser).then(() => {
      setNickname(editNickname);
      confirmAlert({
        customUI: ({ onClose }) => {
          return <AlertUI alertText="닉네임 수정 완료!" onClose={onClose} />;
        },
      });
    });
  };

  // 이미지 업로드 시 이미지 미리보기 바로 반영됨
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImageUpload(e.target.files[0]);
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfileImg(reader.result);
        }
      };
    }
  };

  //TODO: 이미지 업로드 시 용량 줄여서 올리기
  //FIXME: 프사 수정 완료 버튼 없이 이미지 업로드하면 바로 변경되도록?
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
    await updateDoc(doc(db, 'Users', email), updateUser).then(() =>
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <AlertUI
              alertText="프로필 이미지 업로드가 완료되었습니다."
              onClose={onClose}
            />
          );
        },
      }),
    );
  };

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
    },
  });

  const { data: homeList } = useQuery('HomeList', getHomeList);

  // 닉네임 변경
  const editNicknameMutation: any = useMutation(changeNicknameHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  // 전체 분양 정보 리스트에서 내가 북마크한 정보만 필터링하기
  const myBookmarkList = homeList?.allHomeData?.filter(
    (item: ItemJ) =>
      item.PBLANC_NO && currentUser?.bookmarkList?.includes(item.PBLANC_NO),
  );

  useEffect(() => {
    // 비로그인 유저일 경우 접근 제한
    if (status === 'unauthenticated') router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // firestore에서 유저 정보 불러오면 state에 저장함
  useEffect(() => {
    if (users) {
      setNickname(currentUser.userName);
      setEmail(currentUser.userEmail);
      setProfileImg(currentUser.userImage);
      setEditNickname(currentUser.userName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
      <div>닉네임: {nickname}</div>
      <button onClick={() => setIsInputOpen(!isInputOpen)}>닉네임 수정</button>
      {isInputOpen ? (
        <>
          <input
            value={editNickname}
            onChange={(e) => setEditNickname(e.target.value)}
          />
          <button onClick={editNicknameMutation.mutate}>
            닉네임 수정 완료
          </button>
        </>
      ) : null}
      <h4>프로필 사진</h4>
      <Image
        // 프로필 정보 불러오기 전에는 투명한 이미지를 보여줌(엑박 뜨지 않도록)
        src={!users ? transparentProfile : profileImg}
        alt="profile"
        width={300}
        height={300}
        quality={75}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
        priority={true}
      />
      <input type="file" accept="images/*" onChange={(e) => onImageChange(e)} />
      <button onClick={uploadImage}>프사 수정 완료</button>
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
