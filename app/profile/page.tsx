"use client";

import { useUser, AccountSettings } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const user = useUser({ or: "redirect" });
  const router = useRouter();

  // Redirect to sign in if user is not authenticated
  useEffect(() => {
    if (user === null) {
      router.push("/sign-in");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Loading...</h1>
            <p className="mt-2 text-gray-600">Please wait while we load your profile</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
              <p className="mt-2 text-gray-600">Manage your account settings</p>
            </div>
            
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                {user.profileImageUrl ? (
                  <img 
                    src={user.profileImageUrl} 
                    alt={user.displayName || "User"} 
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {user.displayName?.charAt(0) || user.primaryEmail?.charAt(0) || "U"}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.displayName || "No display name"}
                </h2>
                <p className="text-gray-600">{user.primaryEmail}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Member since {user.signedUpAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Settings</h3>
              <AccountSettings 
                fullPage={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}