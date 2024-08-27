"use client"
import React, { useState } from "react";
import { updatePassword } from "@/lib/server/appwrite";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handlePasswordChange = async (event: React.FormEvent) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const result = await updatePassword(currentPassword, newPassword);
      if (result.success) {
        setSuccess(true);
        setError(null);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setSuccess(false);
        setError(result.error || "Password update failed.");
      }
    } catch (err) {
      console.error("Password update error:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="border-2 rounded-xl p-6 bg-card">
      <div className="flex flex-col gap-0.5">
        <div className="text-2xl font-semibold">Change Password</div>
        <div className="text-sm text-gray-500">Update your account password.</div>
      </div>
      <form onSubmit={handlePasswordChange}>
        <div className="grid gap-6 mt-12">
          <div className="grid gap-2">
            <label className="font-semibold text-sm" htmlFor="current-password">
              Current Password
            </label>
            <input
              className="border-[1px] text-sm bg-card rounded-md p-2 outline-none"
              id="current-password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="font-semibold text-sm" htmlFor="new-password">
              New Password
            </label>
            <input
              className="border-[1px] text-sm bg-card rounded-md p-2 outline-none"
              id="new-password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="font-semibold text-sm" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="border-[1px] text-sm bg-card rounded-md p-2 outline-none"
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 m-3 p-2 px-3 rounded-lg text-sm text-[#faf6f6] bg-rose-700"
        >
          Update Password
        </button>
        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        {success && (
          <div className="mt-4 text-green-500 text-sm">Password updated successfully.</div>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
