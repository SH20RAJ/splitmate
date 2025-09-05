import { SignIn } from "@stackframe/stack";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
          <p className="mt-2 text-gray-600">Welcome back! Please sign in to your account</p>
        </div>
        <SignIn 
          fullPage={false}
          automaticRedirect={true}
        />
      </div>
    </div>
  );
}