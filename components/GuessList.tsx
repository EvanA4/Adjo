import { Guess } from "@/types/guess";
import { Dispatch, SetStateAction } from "react";

function GuessList(props: {
    guesses: Guess[]
    setGuesses: Dispatch<SetStateAction<Guess[]>>
}) {
    const MAX_LENGTH = 5;
    const guesses = props.guesses.filter((val, idx) => idx < MAX_LENGTH);

    function guessDisplayName(guess: Guess) {
        return guess.commonNames.length ?
            guess.commonNames[0] :
            guess.family + " " + guess.genus;
    }

    function scoreColor(idx: number) {
        if (idx == 0) {
            return "text-green-500";
        } else if (idx == 1) {
            return "text-green-300";
        } else if (idx == 2) {
            return "text-green-200";
        } else {
            return "text-white";
        }
    }

    return (
        <div>
            <p className="text-xl mt-5 mb-3">
                Here's what it could be:
            </p>
            <div className="flex flex-col items-center gap-2">
                {
                    guesses.map((guess, idx) => 
                        <div key={idx} className="p-3 flex justify-between w-full gap-3 rounded-xl">
                            <b className={scoreColor(idx)}>{(guess.score * 100).toFixed(1)}</b>
                            <p>{guessDisplayName(guess)}</p>
                        </div>
                    )
                }
            </div>
            <div className="w-full flex justify-center mt-5">
                <button
                    className="px-3 py-2 bg-blue-600 active:bg-blue-500 rounded-lg cursor-pointer"
                    onClick={() => props.setGuesses([])}
                >
                    Clear results
                </button>
            </div>
        </div>
    )
}

export default GuessList;