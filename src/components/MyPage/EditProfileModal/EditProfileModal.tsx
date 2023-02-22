import { db, storage } from '@/common/firebase';
import { currentUserState, usersListState } from '@/store/selectors';
import { uuidv4 } from '@firebase/util';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { useRecoilState, useRecoilValue } from 'recoil';
import * as S from './style';

const EditProfileModal = ({ setIsModalOpen }: any) => {
  // 현재 로그인한 유저의 firestore 유저 정보
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [editNickname, setEditNickname] = useState<any>(currentUser.userName);
  const [editProfileImg, setEditProfileImg] = useState(currentUser.userImage);

  // 파일 업로드 시 업로드한 파일을 담아둘 state
  const [imageUpload, setImageUpload] = useState<any>('');

  // 전체 유저의 firestore 정보
  const users = useRecoilValue(usersListState);

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

    if (editNickname.length > 9) {
      alert('닉네임은 8자 이하로 입력해주세요.');
      return;
    }

    // if (imageUpload === null) return;

    const imageRef = ref(storage, `profileImages/${uuidv4()}`);
    // Storage에 이미지 업로드
    const response = await uploadBytes(imageRef, imageUpload);
    // 업로드한 이미지의 url 가져오기
    const downloadUrl = await getDownloadURL(response.ref);

    const updateUser = {
      userName: editNickname,
      userImage: imageUpload ? downloadUrl : currentUser.userImage,
    };

    await updateDoc(doc(db, 'Users', currentUser.userEmail), updateUser);
    setIsModalOpen(false);
    setCurrentUser({
      ...currentUser,
      userName: editNickname,
      userImage: imageUpload ? downloadUrl : currentUser.userImage,
    });
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
          setEditProfileImg(reader.result);
        }
      };
    }
  };

  useEffect(() => {}, []);

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
          <S.Title>프로필 수정</S.Title>
          <S.EditProfileImgLabel>
            <Image
              src={editProfileImg}
              alt="profile"
              width={170}
              height={170}
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
              style={{ display: 'none' }}
            />
            <S.CameraIcon>
              <BsCameraFill
                color="gray"
                size="23"
                style={{ marginBottom: 2 }}
              />
            </S.CameraIcon>
          </S.EditProfileImgLabel>
          <S.NicknameInput
            value={editNickname}
            onChange={(e) => setEditNickname(e.target.value)}
            autoFocus
          />
          <S.ProfileBtn
            onClick={editProfileHandler}
            disabled={editNickname === currentUser.userName && !imageUpload}
          >
            수정 완료
          </S.ProfileBtn>
          <S.WithdrawUserBtnContainer>
            <S.WithdrawUserBtn>회원탈퇴</S.WithdrawUserBtn>
          </S.WithdrawUserBtnContainer>
        </S.EditProfileContainer>
      </S.ModalContainer>
    </S.ModalBackground>
  );
};

export default EditProfileModal;
