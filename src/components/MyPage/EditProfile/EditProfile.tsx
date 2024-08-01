import Image from 'next/image';
import { useState } from 'react';
import EditProfileModal from '../EditProfileModal/EditProfileModal';
import transparentProfile from 'public/assets/transparentProfile.png';
import * as S from './style';
import naver from 'public/assets/naver.png';
import kakao from 'public/assets/kakao2.png';
import google from 'public/assets/google.png';
import facebook from 'public/assets/facebook.png';
import transparentImage from 'public/assets/transparentProfile.png';
import { signOut } from 'next-auth/react';
import { confirmAlert } from 'react-confirm-alert';
import AlertUI from '@/components/GlobalComponents/AlertUI/AlertUI';
import Link from 'next/link';

interface editProfileProps {
  currentUser: userProps;
}

const EditProfile = ({ currentUser }: editProfileProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // [로그아웃] 버튼 클릭 시 작동
  const LogOutHandler = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <AlertUI
            alertText="로그아웃하시겠습니까?"
            onClose={onClose}
            onClick={() => signOut({ callbackUrl: '/' })}
            eventText="확인"
          />
        );
      },
    });
    // 로그아웃 시 sessionStorage를 삭제하면 메인에서 전체 리스트가 보임
    sessionStorage.clear();
  };

  return (
    <S.Wrapper>
      {/* 회원정보 수정 모달 */}
      {isModalOpen && <EditProfileModal setIsModalOpen={setIsModalOpen} />}

      <S.EditProfileContainer>
        <>
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
            className="profileImage"
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
              className="providerLogo"
            />
            <S.Email>{currentUser.userEmail}</S.Email>
          </S.EmailContainer>
        </>
        <S.ProfileBtnContainer>
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
        </S.ProfileBtnContainer>
      </S.EditProfileContainer>
      {(currentUser?.userEmail === 'suk921@gmail.com' ||
        currentUser?.userEmail === 'psh5575@gmail.com' ||
        currentUser?.userEmail === 'mika013@naver.com') && (
        <S.AdminBtn>
          <Link href={'/admin/nemo042116'} style={{ all: 'unset' }}>
            {currentUser.userName} 관리자님 환영합니다.
          </Link>
        </S.AdminBtn>
      )}
    </S.Wrapper>
  );
};

export default EditProfile;
