import React, { useCallback, useContext, useRef, useSyncExternalStore } from "react";
import { ReactNode, createContext } from "react";

import { AssetWrapper, INIT_ASSET_LIST } from "../../models/Asset";
import { LightWrapper } from "../../models/Light";

export type EditableWrapper = AssetWrapper | LightWrapper

function useAssetData(): {
  get: () => AssetWrapper[];
  set: (asset: AssetWrapper) => void;
  subscribe: (callback: () => void) => () => void;
} {

  const assets = useRef({
    ...INIT_ASSET_LIST
  });
  const subscribers = useRef(new Set<()=>void>());

  const updateAsset = (newAsset: AssetWrapper) => {
    const index = assets.current.findIndex(asset => asset.id === newAsset.id);
    assets.current[index] = newAsset
  };
  
  const get = useCallback( () => assets.current, []);
  
  const set = useCallback( (asset: AssetWrapper) => {
    updateAsset(asset)
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

type FastContext = ReturnType<typeof useAssetData>;

export const FastContext = createContext<FastContext | null>( null );

export const FastContextProvider = (props: {children: ReactNode}): JSX.Element => {
  const assets = useAssetData();

    return (
        <FastContext.Provider value={assets} >
            {props.children}
        </FastContext.Provider>
    );
}

export const useFastContext = (): [AssetWrapper[], (asset: AssetWrapper) => void] => {
  const assets = useContext(FastContext);

  if (assets === null) {
      throw new Error("useFastContext must be used within a FastContextProvider")
  }

  const state = useSyncExternalStore(assets.subscribe, assets.get);

  return [state, assets.set];
}