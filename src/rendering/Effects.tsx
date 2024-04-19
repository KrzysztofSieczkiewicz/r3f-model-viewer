
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import React from 'react';
import { EffectWrapper } from '../models/Effect';

type Props = {
    effectsList: EffectWrapper[]
}

export const Effects = ({ effectsList }: Props) => {
        
    return (
        effectsList.map((effect: EffectWrapper) => {
            if(effect.enabled) {
                return (
                    <EffectComposer multisampling={8} autoClear={false}>
                        <Bloom 
                            blendFunction={BlendFunction.ADD}
                            intensity={effect.intensity}
                            width={1000} // TODO: MOVE THIS TO GLOBAL CONSTANT RELATED TO RENDERING
                            height={1000} // TODO: MOVE THIS TO GLOBAL CONSTANT RELATED TO RENDERING
                            kernelSize={5} // TODO: MOVE THIS TO GLOBAL CONSTANT RELATED TO RENDERING
                            luminanceThreshold={effect.luminanceThreshold}
                            luminanceSmoothing={effect.luminanceSmoothing}
                        />
                    </EffectComposer> 
                );
            }
        })
    );

}