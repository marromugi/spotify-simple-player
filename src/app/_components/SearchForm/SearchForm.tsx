"use client";

import { AlbumCard } from "@/components/features/album";
import { AlbumBannar } from "@/components/features/album/AlbumBannar/AlbumBannar";
import { Button, Hover, Linkable } from "@/components/ui";
import { FormFieldText } from "@/components/ui/form";
import { APP_URL } from "@/const/app";
import { ROUTES } from "@/const/route";
import { useForm } from "@/libs/hook-form";
import clsx from "clsx";
import { useState } from "react";
import z from "zod";

const schema = z.object({
  q: z.string().min(1, "1文字以上入力してください"),
});

export const SearchFrom = () => {
  const { register, handleSubmit, control } = useForm({
    schema,
  });
  const [results, setResults] =
    useState<SpotifyApi.SearchResponse | null>(null);

  const handleSearch = async ({ q }: { q: string }) => {
    const res = await fetch(`/api/search?q=${q}`, {
      cache: "no-cache",
    });
    setResults(await res.json());
  };

  return (
    <>
      <FormFieldText control={control} name={"q"} />
      <Button type="button" onClick={handleSubmit(handleSearch)}>
        検索
      </Button>
      {results?.albums?.items.map((album) => (
        <Linkable key={album.id} href={ROUTES.album(album.id)}>
          <div
            className={clsx(
              "tw-py-4",
              "tw-border-t tw-border-white",
              "tw-w-48",
            )}
          >
            <Hover type={"bg-gray"} space={"sm"}>
              <AlbumCard album={album} />
            </Hover>
          </div>
        </Linkable>
      ))}
    </>
  );
};
