import { useEffect, useState } from "react";
import { Texture, TextureLoader } from "three";

export const useSafeTextureLoader = (url: string | null) => {
    const [texture, setTexture] = useState<Texture | null>(null);

    const loader = new TextureLoader();

    useEffect(() => {
        if(!url) {
            setTexture(null);
            return;
        }

        loader
            .loadAsync(url)
            .then(texture => setTexture(texture));
    }, [url]);

    return texture;
}