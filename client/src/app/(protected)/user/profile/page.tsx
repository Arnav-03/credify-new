import Link from "next/link"
import ProfileInfo from "./components/ProfileInfo"
import AccountDetails from "./components/AccountDetails"
import ChangePassword from "./components/ChangePassword"
import VerificationSettings from "./components/VerificationSettings"
import SupportAndHelp from "./components/SupportAndHelp"
import SecuritySetting from "./components/SecuritySetting"
export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <main className="flex-1 grid gap-8 p-4 sm:p-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-8">
          <ProfileInfo/>
          <AccountDetails/>
          <ChangePassword/>
        </div>
        <div className="space-y-8">
          <VerificationSettings/>
          <SecuritySetting/>
          <SupportAndHelp/>
        </div>
      </main>
      <footer className="bg-background border-t px-4 sm:px-6 py-4 flex items-center justify-between">
        <button className=" p-2 px-4 rounded-lg text-md text-[#faf6f6] bg-[#ec1e3d]">Save Changes</button>
      </footer>
    </div>
  )
}
