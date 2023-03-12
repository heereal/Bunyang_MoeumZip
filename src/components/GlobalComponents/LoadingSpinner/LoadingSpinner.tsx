import spinner from 'public/assets/logo.png';
import Image from 'next/image';
import styled, { keyframes } from 'styled-components';

const LoadingSpinner = () => {
  return (
    <Loading>
      <Image
        className="loader"
        src={spinner}
        alt="spinner"
        height={80}
        quality={75}
        priority={true}
      />
    </Loading>
  );
};

export default LoadingSpinner;

const slideDown = keyframes`
0%{
    transform: translateY(-10%)
}
100%{
    transform: translateY(15%);
}
`;

const Loading = styled.div`
  .loader {
    animation: ${slideDown} 0.7s linear infinite alternate;
  }
`;
