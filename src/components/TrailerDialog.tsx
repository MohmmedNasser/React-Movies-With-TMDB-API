import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
    AlertDialogCancel,
    AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";

import { TvMinimalPlay, X } from "lucide-react";
import { Button } from "./ui/button";
import type { Video } from "@/types/movies";

const TrailerDialog = ({ trailer }: { trailer: Video | null }) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant="outline"
                    className="cursor-pointer !border-red-600 !text-white !bg-red-600 flex items-center gap-2 "
                >
                    <TvMinimalPlay className="size-5" />
                    <span>Watch Trailer</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="!max-w-3xl !min-h-[400px]">
                <AlertDialogCancel className="absolute -end-2 -top-2 cursor-pointer text-gray-200 border border-white bg-neutral-900 hover:bg-neutral-700 hover:border-gray-100 transition rounded-full p-1">
                    <X className="size-4 text-white" />
                </AlertDialogCancel>
                <AlertDialogHeader>
                    <AlertDialogTitle></AlertDialogTitle>
                    <AlertDialogDescription>
                        <iframe
                            width="100%"
                            height="400px"
                            src={`https://www.youtube.com/embed/${trailer?.key}?si=${trailer?.id}`}
                            title="YouTube video player"
                            allowFullScreen
                        ></iframe>
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default TrailerDialog;
