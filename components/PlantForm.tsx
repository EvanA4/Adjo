'use client';

import { Dispatch, SetStateAction, useState } from "react";
import FileUploader from "./FileUploader";
import { Guess } from "@/types/guess";
import { searchImage } from "@/utils/client/image";
import imageCompression from "browser-image-compression";

function PlantForm(props: {
    setGuesses: Dispatch<SetStateAction<Guess[]>>
}) {
    const [uploaded, setUploaded] = useState<File | undefined>();
    const [processing, setProcessing] = useState<boolean>(false);

    async function handleSubmit() {
        if (uploaded) {
            setProcessing(true);

            try {
                const splitdot = uploaded.name.split(".");
                const ext = splitdot[splitdot.length-1];
                const largeFile = new File([uploaded], `delete-adjo.${ext}`, {
                    type: uploaded.type,
                    lastModified: uploaded.lastModified
                });
    
                // shrink file
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                };
                const smallFile = await imageCompression(largeFile, options);
    
                const res = await searchImage(smallFile);
                const rerr = res.anticipate();
                if (rerr.error) {
                    console.log(`Failed to get guesses: ${rerr.message}`);
                } else {
                    props.setGuesses(res.unwrap());
                }

            } catch (e) {
                const err = e as { message?: string };
                if (err.message) {
                    console.log(`Error trying to guess plant: ${err.message}`);
                } else {
                    console.log("Error trying to guess plant.", e);
                }

            } finally {
                setProcessing(false);
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
                    disabled={processing}
                    onClick={handleSubmit}
                    className={"bg-green-600 active:bg-green-500 px-3 py-2 rounded-lg mt-3 " + (processing ? "opacity-50" : "")}
                >
                    Search
                </button>
            </div>
        </div>
    )
}

export default PlantForm;