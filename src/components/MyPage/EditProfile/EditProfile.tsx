import Image from 'next/image';
import { useState } from 'react';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import transparentProfile from '../../../../public/assets/transparentProfile.png';
import * as S from './style';
import naver from '../../../../public/assets/naver.png';
import kakao from '../../../../public/assets/kakao.png';
import google from '../../../../public/assets/google.png';
import facebook from '../../../../public/assets/facebook.png';
import transparentImage from '../../../../public/assets/transparentProfile.png';
import { signOut } from 'next-auth/react';
import { confirmAlert } from 'react-confirm-alert';

const EditProfile = ({ currentUser }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // [로그아웃] 버튼 클릭 시 작동
  const LogOutHandler = () => {
    confirmAlert({
      message: '로그아웃하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => signOut({ callbackUrl: '/' }),
        },

        {
          label: '취소',
          onClick: () => onclose,
        },
      ],
    });
  };

  return (
    <S.Wrapper>
      {/* 회원정보 수정 모달 */}
      {isModalOpen && <EditProfileModal setIsModalOpen={setIsModalOpen} />}

      <S.EditProfileContainer>
        <Image
          src={
            currentUser.userImage ? currentUser.userImage : transparentProfile
          }
          alt="profile"
          width={140}
          height={140}
          quality={75}
          style={{ borderRadius: '50%', objectFit: 'cover' }}
          priority={true}
        />
        <S.Nickname>{currentUser.userName}</S.Nickname>
        <S.EmailContainer>
          <Image
            src={
              currentUser.provider === 'naver'
                ? naver
                : currentUser.provider === 'kakao'
                ? kakao
                : currentUser.provider === 'google'
                ? google
                : currentUser.provider === 'facebook'
                ? facebook
                : transparentImage
            }
            alt="providerLogo"
            height={16}
            quality={100}
            priority={true}
          />
          <S.Email>{currentUser.userEmail}</S.Email>
        </S.EmailContainer>
        <S.ProfileBtn
          bg={'#356EFF'}
          text={'white'}
          onClick={() => setIsModalOpen(true)}
        >
          프로필 수정
        </S.ProfileBtn>
        <S.ProfileBtn bg={'#E5EDFF'} text={'#356EFF'} onClick={LogOutHandler}>
          로그아웃
        </S.ProfileBtn>
        {/* <S.Line /> */}
      </S.EditProfileContainer>
    </S.Wrapper>
  );
};

export default EditProfile;
