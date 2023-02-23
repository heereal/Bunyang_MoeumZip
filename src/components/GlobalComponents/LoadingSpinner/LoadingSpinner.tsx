import spinner from '../../../assets/spinner.gif';
import Image from 'next/image';

const LoadingSpinner = () => {
  return (
    <div style={{ margin: 'auto' }}>
      <Image
        src={spinner}
        alt="spinner"
        width={120}
        height={120}
        quality={75}
        priority={true}
      />
    </div>
  );
};
 
export default LoadingSpinner;