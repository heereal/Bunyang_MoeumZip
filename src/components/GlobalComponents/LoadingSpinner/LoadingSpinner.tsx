import spinner from '../../../../public/assets/spinner.gif';
import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <Image
      src={spinner}
      alt="spinner"
      height={60}
      quality={75}
      priority={true}
    />
  );
};

export default LoadingSpinner;
