'use client';

import { useState } from "react";
import { Guess } from "@/types/guess";
import PlantForm from "./PlantForm";
import GuessList from "./GuessList";

function UploadOrList() {
    const [guesses, setGuesses] = useState<Guess[]>([]);

    return (
        <div className="px-3">
            {
                guesses.length ?
                <GuessList guesses={guesses} setGuesses={setGuesses} /> :
                <PlantForm setGuesses={setGuesses} />
            }
        </div>
    )
}

export default UploadOrList