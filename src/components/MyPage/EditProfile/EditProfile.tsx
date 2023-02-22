import { nicknameState, profileImgState } from '@/store/selectors';
import Image from 'next/image';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import * as S from './style';

const EditProfile = ({ currentUser }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nickname = useRecoilValue(nicknameState);
  const profileImg = useRecoilValue(profileImgState);

  return (
    <S.Wrapper>
      {/* 회원정보 수정 모달 */}
      {isModalOpen && <EditProfileModal setIsModalOpen={setIsModalOpen} />}

      <S.EditProfileContainer>
        <Image
          src={profileImg}
          alt="profile"
          width={150}
          height={150}
          quality={75}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
          priority={true}
        />
        <S.Nickname>{nickname}</S.Nickname>
        <S.Email>{currentUser.userEmail}</S.Email>
        <S.ProfileBtn onClick={() => setIsModalOpen(true)}>
          회원정보 수정
        </S.ProfileBtn>
        <S.Line />
        <S.WithdrawUserBtnContainer>
          <S.WithdrawUserBtn>회원탈퇴</S.WithdrawUserBtn>
        </S.WithdrawUserBtnContainer>
      </S.EditProfileContainer>
    </S.Wrapper>
  );
};

export default EditProfile;
