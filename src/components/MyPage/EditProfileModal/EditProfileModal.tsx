import { MdClose } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { db, storage } from '@/common/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { confirmAlert } from 'react-confirm-alert';
import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import transparentProfile from '../../../assets/transparentProfile.png';
import { uuidv4 } from '@firebase/util';
import * as S from './style';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentUserState, usersListState } from '@/store/selectors';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';

const EditProfileModal = ({ setIsModalOpen }: any) => {
  const queryClient = useQueryClient();

  const [editNickname, setEditNickname] = useState<any>('');
  const [nickname, setNickname] = useState<any>('');
  //   const [email, setEmail] = useState<any>('');
  const [profileImg, setProfileImg] = useState('');

  // 파일 업로드 시 업로드한 파일을 담아둘 state
  const [imageUpload, setImageUpload] = useState<any>('');

  // 전체 유저의 firestore 정보
  const users = useRecoilValue(usersListState);

  // 현재 로그인한 유저의 firestore 유저 정보
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  //TODO: 이미지 업로드 시 용량 줄여서 올리기
  // [수정 완료] 버튼 클릭 시 작동
  const editProfileHandler = async () => {
    // 중복되는 닉네임이 있는지 검색하기
    const checkNickname = users.find(
      (user: userProps) =>
        user.userName === editNickname && !currentUser.userName,
    );

    // 중복되는 닉네임이 있는 경우
    if (checkNickname) {
      alert('이미 존재하는 닉네임입니다. 다시 입력해주세요.');
      return;
    }

    // 닉네임을 입력하지 않았을 경우
    if (!editNickname) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    // if (imageUpload === null) return;

    const imageRef = ref(storage, `profileImages/${uuidv4()}`);
    // Storage에 이미지 업로드
    const response = await uploadBytes(imageRef, imageUpload);
    // 업로드한 이미지의 url 가져오기
    const downloadUrl = await getDownloadURL(response.ref);

    console.log(downloadUrl);

    const updateUser = {
      userName: editNickname,
      userImage: imageUpload ? downloadUrl : currentUser.userImage,
    };

    await updateDoc(doc(db, 'Users', currentUser.userEmail), updateUser);
    setIsModalOpen(false);
    setNickname(editNickname);
    alert('회원정보 수정 완료');
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

//   const editProfileMutation = useMutation('users', editProfileHandler, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('users');
//     //   setCurrentUser(
//     //     usersData.find(
//     //       (user: userProps) => user.userEmail === session?.user?.email,
//     //     ),
//     //   );

//     },
//   });

  // firestore에서 유저 정보 불러오면 state에 저장함
  useEffect(() => {
    if (users) {
      //   setNickname(currentUser.userName);
      //   setEmail(currentUser.userEmail);
      setProfileImg(currentUser.userImage);
      setEditNickname(currentUser.userName);
    }
    // eslint-disable-next-line
  }, [users]);

  return (
    <S.ModalBackground>
      <S.ModalContainer>
        <S.CloseBtnContainer>
          <MdClose
            size="30"
            onClick={() => setIsModalOpen(false)}
            style={{ cursor: 'pointer' }}
          />
        </S.CloseBtnContainer>

        <S.EditProfileContainer>
          <Image
            // 프로필 정보 불러오기 전에는 투명한 이미지를 보여줌(엑박 뜨지 않도록)
            src={!users ? transparentProfile : profileImg}
            alt="profile"
            width={180}
            height={180}
            quality={75}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
              cursor: 'pointer',
            }}
            priority={true}
          />
          <input
            type="file"
            accept="images/*"
            onChange={(e) => onImageChange(e)}
          />
          <S.NicknameInput
            value={editNickname}
            onChange={(e) => setEditNickname(e.target.value)}
            autoFocus
          />
          <S.ProfileBtn onClick={editProfileHandler}>
            수정 완료
          </S.ProfileBtn>
        </S.EditProfileContainer>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default EditProfileModal;
