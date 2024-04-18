
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
                            width={300}
                            height={300}
                            kernelSize={5}
                            luminanceThreshold={0.15}
                            luminanceSmoothing={0.025}
                        />
                    </EffectComposer> 
                );
            }
        })
    );

}