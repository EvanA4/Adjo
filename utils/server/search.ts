import { Guess } from "@/types/guess";
import { PlantNetResponse } from "@/types/plantnet";
import { Result } from "@/types/results";

export async function guessPlantById(id: string): Promise<Result<Guess[]>> {
    const rawRes = await fetch("https://api.plantnet.org/v1/projects/k-world-flora/queries/identify?illustratedOnly=true&clientType=web&clientVersion=3.0.0&kt=true&mediaSource=file&lang=en", {
        "credentials": "omit",
        "headers": {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:148.0) Gecko/20100101 Firefox/148.0",
            "Accept": "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-site",
            "Sec-GPC": "1",
            "Priority": "u=4"
        },
        "referrer": "https://identify.plantnet.org/",
        "body": `{\"images\":[{\"url\":\"${process.env.IMAGEDB_HOST}/images?_id=${id}\",\"organ\":\"habit\"}]}`,
        "method": "POST",
        "mode": "cors"
    });
    const res = await rawRes.json() as PlantNetResponse;
    if (res.error) {
        return new Result({
            error: true,
            message: res.message || "Failed to generate list of guesses."
        });
    }
    return new Result({
        error: false,
        message: "Successfully recieved guesses.",
        value: res.results.map(val => ({
            score: val.score,
            ...val.species
        }))
    });
}