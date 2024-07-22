"use client";

import { useEffect } from "react";

import { LuHeartOff } from "react-icons/lu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import useFavoriteStore from "@/zustand/Favorite";

export default function Favorite() {
  const favorite = useFavoriteStore();

  const handleDislikeClick = (creatorId: string) => () => {
    favorite.dislikeCreatorAction({ creatorId });
  };

  useEffect(() => {
    favorite.getFavoritesAction();
  }, []);

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full flex-col overflow-x-hidden">
      <div className="w-full p-[32px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="text-center">*</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {favorite.favorites && favorite.favorites.length > 0 ? (
              favorite.favorites.map((f) => (
                <TableRow key={f._id}>
                  <TableCell>
                    <img
                      className="h-[40px] w-[40px] rounded-[50%]"
                      src={
                        f.isStatic
                          ? `${process.env.NEXT_PUBLIC_API_SERVER}/${f.avatar}`
                          : `${f.avatar}`
                      }
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        (e.target as HTMLImageElement).src = "/logo/logo.svg";
                      }}
                      alt="Creator Avatar"
                    />
                  </TableCell>
                  <TableCell>
                    <a
                      href={f.includes ?? ""}
                      target="_blank"
                      className="font-ms text-[#00AEEF] underline"
                    >
                      {f.name}
                    </a>
                  </TableCell>
                  <TableCell>${f.cost}</TableCell>
                  <TableCell className="flex justify-center">
                    <LuHeartOff
                      onClick={handleDislikeClick(f._id ?? "")}
                      className="h-[24px] w-[24px] cursor-pointer"
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  There is no favorite items.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
