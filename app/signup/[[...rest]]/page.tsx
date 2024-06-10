import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <SignUp path="/signup" routing="path" signInUrl="/login" />
      </div>
    </div>
  );
}
