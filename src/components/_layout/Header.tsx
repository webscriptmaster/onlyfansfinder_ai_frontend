"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  LuDollarSign,
  LuHeart,
  LuLogOut,
  LuUser,
  LuUserCircle2
} from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { SITE_TITLE } from "@/utils/constants";
import useAuthStore from "@/zustand/Auth";

import ResponsiveLogo from "./ResponsiveLogo";

export default function Header() {
  const router = useRouter();
  const auth = useAuthStore();

  const handleMenuClick = (newRoute: string) => () => {
    router.push(newRoute);
  };

  const handleLogout = () => {
    auth.logoutAction(router);
  };

  return (
    <header className="flex h-[64px] w-full items-center justify-between bg-[#00AFF0] px-[12px]">
      <Link
        href="/search"
        className="flex items-center justify-center gap-[12px]"
      >
        <ResponsiveLogo className="h-[40px] w-[40px]" />

        <h1 className="font-bc text-[32px] font-[500] text-[#FFFFFF]">
          {SITE_TITLE}
        </h1>
      </Link>

      <div className="flex gap-2">
        <Link href="/favorite">
          <LuHeart className="h-[40px] w-[40px] text-[#FFFFFF]" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-0 bg-transparent ring-0 hover:bg-transparent hover:opacity-50 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <LuUserCircle2 className="h-[40px] w-[40px] text-[#FFFFFF]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={12} className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleMenuClick("/profile")}>
                <LuUser className="w-[32px]" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleMenuClick("/subscription")}>
                <LuDollarSign className="w-[32px]" />
                Subscription
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleLogout}>
                <LuLogOut className="w-[32px]" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
