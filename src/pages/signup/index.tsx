import { useSession } from 'next-auth/react';

const SignUp = () => {
  const { data: session, status } = useSession();
  console.log(session?.user, status);

  return <div>SignUp</div>;
};

export default SignUp;
