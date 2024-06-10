// pages/login.tsx
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <SignIn path="/login" routing="path" signUpUrl="/signup"/>
      </div>
    </div>
  );
}
