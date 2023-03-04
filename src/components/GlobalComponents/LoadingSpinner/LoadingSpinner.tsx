import spinner from '../../../../public/assets/spinner.gif';
import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <Image
        src={spinner}
        alt="spinner"
        height={60}
        quality={75}
        priority={true}
      />
    </div>
  );
};

export default LoadingSpinner;
