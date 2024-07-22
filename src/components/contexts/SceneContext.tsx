import React, { useCallback, useContext, useRef, useSyncExternalStore } from "react";
import { ReactNode, createContext } from "react";
import { INITIAL_SCENE_SETTINGS, SceneWrapper } from "../../models/Scene";

function useSceneData() {

  const scene = useRef<SceneWrapper>({...INITIAL_SCENE_SETTINGS});
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

export function useScene(): [SceneWrapper, (value: Partial<SceneWrapper>) => void] {
  const scene = useContext(SceneContext);

  if (scene === null) {
      throw new Error("useSceneContext must be used within a SceneContextProvider")
  }
  const state = useSyncExternalStore(scene.subscribe, scene.get);
  return [state, scene.set];
}

export function useSceneValue<SelectorOutput>(selector: (scene: SceneWrapper) => SelectorOutput): [SelectorOutput, (value: Partial<SceneWrapper>) => void] {
  const scene = useContext(SceneContext);

  if (scene === null) {
      throw new Error("useSceneContext must be used within a SceneContextProvider")
  }
  const state = useSyncExternalStore(scene.subscribe, () => selector(scene.get()));
  return [state, scene.set];
}