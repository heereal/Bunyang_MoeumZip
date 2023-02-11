import ReactModal from "react-modal";

interface loginModalProps{
    isOpen: boolean,
}

const LoginModal = ({isOpen}: loginModalProps) => {
  return (
    <ReactModal isOpen={isOpen} />
  );
};
 
export default LoginModal;