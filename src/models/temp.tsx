import React from "react"
import { Vector2 } from "three"
import { Bloom, ChromaticAberration, DepthOfField, EffectComposer } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const Temp = () => {
    return (
        <EffectComposer multisampling={8} autoClear={false}>
              <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={400} />
              <Bloom 
                blendFunction={BlendFunction.ADD}
                intensity={0}
                width={300}
                height={300}
                kernelSize={5}
                luminanceThreshold={0.15}
                luminanceSmoothing={0.025}
              />
              <ChromaticAberration 
                blendFunction={BlendFunction.NORMAL}
                offset={new Vector2(0.0005, 0.00012)}
                radialModulation={false}
                modulationOffset={0}
              />
            </EffectComposer>
    )
}
