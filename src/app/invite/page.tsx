"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Share,
  Mail,
  MessageCircle,
  Copy,
  Users,
  Gift,
  Check
} from "lucide-react";
import { BottomNav } from "@/components/bottom-nav";

export default function InvitePage() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [inviteEmails, setInviteEmails] = useState("");

  const inviteLink = "https://splitmate.app/invite/abc123";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSendEmails = () => {
    // Simulate sending emails
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setInviteEmails("");
    }, 3000);
  };

  const shareOptions = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-500",
      action: () => {
        const message = `Hey! I'm using SplitMate to manage group expenses. Join me: ${inviteLink}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
      }
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-blue-500",
      action: () => {
        const subject = "Join me on SplitMate!";
        const body = `I'm using SplitMate to split expenses with friends. Join me: ${inviteLink}`;
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
      }
    },
    {
      name: "Copy Link",
      icon: Copy,
      color: "bg-gray-500",
      action: handleCopyLink
    },
  ];

  return (
    <div className="min-h-screen nm pb-20">
      <div className="max-w-md mx-auto p-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Invite Friends
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share SplitMate with friends and start splitting expenses together
          </p>
        </div>

        {/* Referral Bonus */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-green-800 dark:text-green-200">
                  Earn ₹50 for each friend!
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  You and your friend both get ₹50 credit when they join
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Share */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share className="h-5 w-5 mr-2" />
              Quick Share
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {shareOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className="flex flex-col items-center space-y-2 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center`}>
                    <option.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium">{option.name}</span>
                  {option.name === "Copy Link" && copiedLink && (
                    <div className="flex items-center text-green-600 text-xs">
                      <Check className="h-3 w-3 mr-1" />
                      Copied!
                    </div>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invite Link */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Invite Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 p-3 border rounded-lg bg-gray-50 dark:bg-gray-800 text-sm"
              />
              <Button onClick={handleCopyLink} size="sm">
                {copiedLink ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Invites */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Send Email Invites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <textarea
              placeholder="Enter email addresses separated by commas"
              value={inviteEmails}
              onChange={(e) => setInviteEmails(e.target.value)}
              className="w-full p-3 border rounded-lg h-24 resize-none"
            />
            <Button
              onClick={handleSendEmails}
              className="w-full"
              disabled={!inviteEmails.trim() || emailSent}
            >
              {emailSent ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Invites Sent!
                </>
              ) : (
                <>
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invites
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Invited Friends */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Invites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Rahul Kumar", email: "rahul@example.com", status: "Joined", date: "2 days ago" },
                { name: "Priya Sharma", email: "priya@example.com", status: "Pending", date: "1 week ago" },
                { name: "Amit Singh", email: "amit@example.com", status: "Joined", date: "2 weeks ago" },
              ].map((invite, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{invite.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{invite.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${invite.status === "Joined"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}>
                      {invite.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{invite.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <BottomNav />
    </div>
  );
}
