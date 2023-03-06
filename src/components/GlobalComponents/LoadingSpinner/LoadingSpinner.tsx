import spinner from '../../../../public/assets/spinner.gif';
import Image from 'next/image';
import styled from 'styled-components';

const LoadingSpinner = () => {
  return (
    <LoadingWrapper>
      <Image
        src={spinner}
        alt="spinner"
        height={60}
        quality={75}
        priority={true}
      />
    </LoadingWrapper>
  );
};

export default LoadingSpinner;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
