import { IImage } from "@/types/imagedb";
import { APIResult, Result } from "@/types/results";
import { Guess } from "@/types/guess";


async function uploadImage(image: File) {
    const tmp_fd = new FormData();
    tmp_fd.append("images", image);    
    const rawRes = await fetch(`/api/images`, {
        method: "POST",
        body: tmp_fd,
    });
    const res = await rawRes.json() as APIResult<IImage[]>;
    return new Result<IImage>({
        error: res.error,
        message: res.message,
        value: res.value && res.value.length ? res.value[0] : undefined
    });
}


async function deleteImage(image: IImage) {
    const rawRes = await fetch(`/api/images?_id=${image._id}`, {
        method: "DELETE"
    });
    const res = await rawRes.json() as APIResult<IImage>;
    return new Result<IImage>({
        error: res.error,
        message: res.message,
        value: res.value
    });
}


async function searchPlantById(id: string) {
    const rawRes = await fetch(`/api/guess?_id=${id}`);
    const res = await rawRes.json() as APIResult<Guess[]>;
    return new Result<Guess[]>(res);
}


export async function searchImage(image: File): Promise<Result<Guess[]>> {
    // upload image of plant to local db
    const uploadRes = await uploadImage(image);
    let rerr = uploadRes.anticipate();
    if (rerr.error) return new Result(rerr);
    const uploaded = uploadRes.unwrap();
    
    // guess what plant it is
    const guessRes = await searchPlantById(uploaded._id!);
    rerr = guessRes.anticipate();
    if (rerr.error) {
        deleteImage(uploaded);
        return new Result(rerr);
    }

    // delete image of plant from local db
    const deleteRes = await deleteImage(uploaded);
    rerr = deleteRes.anticipate();
    if (rerr.error) return new Result(rerr);

    return new Result({
        error: false,
        message: "Successfully fetched guesses!",
        value: guessRes.unwrap()
    });
}