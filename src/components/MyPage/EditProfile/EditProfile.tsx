import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { db, storage } from '@/common/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { confirmAlert } from 'react-confirm-alert';
import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import Image from 'next/image';
import transparentProfile from '../../../assets/transparentProfile.png';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';
import EditComment from '@/components/DetailPage/Comments/EditComment';
import * as S from './style';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import { currentUserState } from '@/store/selectors';
import { useRecoilValue } from 'recoil';

const EditProfile = ({ users, currentUser }: any) => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editNickname, setEditNickname] = useState<any>('');
  const [nickname, setNickname] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [profileImg, setProfileImg] = useState('');

  // // 파일 업로드 시 업로드한 파일을 담아둘 state
  // const [imageUpload, setImageUpload] = useState<any>('');

  // // [닉네임 수정 완료] 버튼 클릭 시 작동
  // const changeNicknameHandler = async () => {
  //   const checkNickname = users.find(
  //     (user: userProps) => user.userName === editNickname,
  //   );
  //   if (checkNickname) {
  //     confirmAlert({
  //       customUI: ({ onClose }) => {
  //         return (
  //           <AlertUI
  //             alertText="이미 존재하는 닉네임입니다. 다시 입력해주세요."
  //             onClose={onClose}
  //           />
  //         );
  //       },
  //     });

  //     return;
  //   }
  //   const updateUser = {
  //     userName: editNickname,
  //   };
  //   //FIXME: THEN 없애도됨
  //   await updateDoc(doc(db, 'Users', email), updateUser).then(() => {
  //     setNickname(editNickname);
  //     confirmAlert({
  //       customUI: ({ onClose }) => {
  //         return <AlertUI alertText="닉네임 수정 완료!" onClose={onClose} />;
  //       },
  //     });
  //   });
  // };

  // // 이미지 업로드 시 이미지 미리보기 바로 반영됨
  // const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files !== null) {
  //     setImageUpload(e.target.files[0]);
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onloadend = () => {
  //       if (typeof reader.result === 'string') {
  //         setProfileImg(reader.result);
  //       }
  //     };
  //   }
  // };

  // //TODO: 이미지 업로드 시 용량 줄여서 올리기
  // //FIXME: 프사 수정 완료 버튼 없이 이미지 업로드하면 바로 변경되도록?
  // // [프사 수정 완료] 버튼 클릭 시 작동
  // const uploadImage = async () => {
  //   // 이미지를 업로드하지 않았다면 작동하지 않음
  //   if (imageUpload === null) return;

  //   const imageTitle = uuidv4();

  //   const imageRef = ref(storage, `profileImages/${imageTitle}`);
  //   // Storage에 이미지 업로드
  //   await uploadBytes(imageRef, imageUpload);
  //   // 업로드한 이미지의 url 가져오기
  //   const downloadUrl = await getDownloadURL(imageRef);

  //   // 업로드한 이미지 url로 Firestore 정보 업데이트
  //   const updateUser = {
  //     userImage: downloadUrl,
  //   };
  //   await updateDoc(doc(db, 'Users', email), updateUser).then(() =>
  //     confirmAlert({
  //       customUI: ({ onClose }) => {
  //         return (
  //           <AlertUI
  //             alertText="프로필 이미지 업로드가 완료되었습니다."
  //             onClose={onClose}
  //           />
  //         );
  //       },
  //     }),
  //   );
  // };

  // 닉네임 변경
  // const editNicknameMutation: any = useMutation(changeNicknameHandler, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('users');
  //   },
  // });

  // firestore에서 유저 정보 불러오면 state에 저장함
  useEffect(() => {
    if (currentUser) {
      setNickname(currentUser.userName);
      setEmail(currentUser.userEmail);
      setProfileImg(currentUser.userImage);
      setEditNickname(currentUser.userName);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <S.Wrapper>
      <S.EditProfileContainer>
        <Image
          // 프로필 정보 불러오기 전에는 투명한 이미지를 보여줌(엑박 뜨지 않도록)
          src={!users ? transparentProfile : profileImg}
          alt="profile"
          width={150}
          height={150}
          quality={75}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
          priority={true}
        />
        <S.Nickname>{nickname}</S.Nickname>
        <S.Email>{email}</S.Email>
        <S.ProfileBtn onClick={() => setIsModalOpen(true)}>회원정보 수정</S.ProfileBtn>
        {/* 회원정보 수정 모달 */}
        {isModalOpen && <EditProfileModal setIsModalOpen={setIsModalOpen} />}
        {/* <S.ProfileBtn>닉네임 수정</S.ProfileBtn> */}
        <S.Line />
        <S.WithdrawUserBtnContainer>
          <S.WithdrawUserBtn>회원탈퇴</S.WithdrawUserBtn>
        </S.WithdrawUserBtnContainer>
      </S.EditProfileContainer>
    </S.Wrapper>
  );
};

export default EditProfile;
