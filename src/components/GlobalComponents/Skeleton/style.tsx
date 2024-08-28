import styled, { keyframes } from 'styled-components';

export const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

// Skeleton base style
export const SkeletonBase = styled.div`
  background-color: #e0e0e0;
  background-image: linear-gradient(
    90deg,
    #e0e0e0 0px,
    #f0f0f0 40px,
    #e0e0e0 80px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 10px;
`;

export const SkeletonText = styled(SkeletonBase)<{ width: string }>`
  width: ${({ width }) => width || '100%'};
  height: 14px; /* Set the height to 14px */
`;

export const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
