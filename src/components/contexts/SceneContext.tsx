import React, { useCallback, useContext, useRef, useSyncExternalStore } from "react";
import { ReactNode, createContext } from "react";

/* START EXPORT */
const INITIAL_SCENE = {
  selectedObjectId: "",
  backgroundColor: "#262626",
  ambientColor: "#ffffff",
  ambientIntensity: 0.1,
  viewCameraRotation: [0, 0, 0] as [number,number,number],
}

export type SceneWrapper = {
  selectedObjectId: string,
  backgroundColor: string,
  ambientColor: string,
  ambientIntensity: number,
  viewCameraRotation: [number,number,number],
}
/* END EXPORT */

function useSceneData(): {
  get: () => SceneWrapper;
  set: (scene: Partial<SceneWrapper>) => void;
  subscribe: (callback: () => void) => () => void;
} {

  const scene = useRef({
    ...INITIAL_SCENE
  });
  const subscribers = useRef(new Set<()=>void>());
  
  const get = useCallback( () => scene.current, []);
  
  const set = useCallback( (value: Partial<SceneWrapper>) => {
    scene.current = { ...scene.current, ...value};
    subscribers.current.forEach( (callback) => callback() );
  }, [])

  const subscribe = useCallback( (callback: ()=>void) => {
    subscribers.current.add(callback);
    return () => subscribers.current.delete(callback);
  }, [])

  return {
    get,
    set,
    subscribe,
  };
}

type SceneContext = ReturnType<typeof useSceneData>;

export const SceneContext = createContext<SceneContext | null>( null );

export const SceneContextProvider = (props: {children: ReactNode}): JSX.Element => {
  const assets = useSceneData();

    return (
        <SceneContext.Provider value={assets} >
            {props.children}
        </SceneContext.Provider>
    );
}

export const useSceneContext = (): [SceneWrapper, (value: Partial<SceneWrapper>) => void] => {
  const scene = useContext(SceneContext);

  if (scene === null) {
      throw new Error("useSceneContext must be used within a SceneContextProvider")
  }

  const state = useSyncExternalStore(scene.subscribe, scene.get);

  return [state, scene.set];
}