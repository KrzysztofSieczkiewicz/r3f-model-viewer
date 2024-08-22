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
        const abortController = new AbortController() 

        loader
            .loadAsync(url)
            .then(texture => setTexture(texture))
            .catch(() => setTexture(null));

        return () => {
            abortController.abort()
        }
    }, [url]);

    return texture;
}