"use client";

import clsx from "clsx";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import useAuthStore from "@/zustand/Auth";
import { USER_ROLES } from "@/utils/constants";

import PersonalCard from "./PersonalCard";
import FanCard from "./FanCard";
import SecurityCard from "./SecurityCard";

export default function Profile() {
  const auth = useAuthStore();

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full flex-col overflow-x-hidden">
      <div className="flex w-full justify-center p-[32px]">
        <Tabs defaultValue="personal" className="w-full md:max-w-[768px]">
          <TabsList
            className={clsx(
              "grid w-full",
              auth.role === USER_ROLES.CREATOR ? "grid-cols-3" : "grid-cols-2"
            )}
          >
            <TabsTrigger
              className="font-ms data-[state=active]:bg-[#00AFF0] data-[state=active]:text-[#FFFFFF]"
              value="personal"
            >
              Personal
            </TabsTrigger>

            {auth.role === USER_ROLES.CREATOR && (
              <TabsTrigger
                className="font-ms data-[state=active]:bg-[#00AFF0] data-[state=active]:text-[#FFFFFF]"
                value="fan"
              >
                Fan
              </TabsTrigger>
            )}

            <TabsTrigger
              className="font-ms data-[state=active]:bg-[#00AFF0] data-[state=active]:text-[#FFFFFF]"
              value="security"
            >
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalCard />
          </TabsContent>

          {auth.role === USER_ROLES.CREATOR && (
            <TabsContent value="fan">
              <FanCard />
            </TabsContent>
          )}

          <TabsContent value="security">
            <SecurityCard />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
