'use client';

import { Dispatch, SetStateAction, useState } from "react";
import FileUploader from "./FileUploader";
import { Guess } from "@/types/guess";
import { searchImage } from "@/utils/client/image";

function PlantForm(props: {
    setGuesses: Dispatch<SetStateAction<Guess[]>>
}) {
    const [uploaded, setUploaded] = useState<File | undefined>();

    async function handleSubmit() {
        if (uploaded) {
            const splitdot = uploaded.name.split(".");
            const ext = splitdot[splitdot.length-1];
            const toUpload = new File([uploaded], `delete-adjo.${ext}`, {
                type: uploaded.type,
                lastModified: uploaded.lastModified
            });
            const res = await searchImage(toUpload);
            const rerr = res.anticipate();
            if (rerr.error) {
                console.log(`Failed to get guesses: ${rerr.message}`);
            } else {
                props.setGuesses(res.unwrap());
            }
        }
    }

    return (
        <div className="px-3">
            <p className="text-xl mt-5 mb-3">Upload a plant!</p>
            <div>
                <FileUploader
                    onUpload={(files: File[]) => setUploaded(files.length ? files[0] : undefined)}
                    allowedTypes={[
                        "png", "jpg", "heic", "jpeg", "hevc"
                    ]}
                />
            </div>
            <div className="flex justify-end w-full">
                <button
                    onClick={handleSubmit}
                    className="bg-green-600 hover:bg-green-500 px-3 py-2 rounded-lg mt-3"
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default PlantForm;