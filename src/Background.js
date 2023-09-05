import { Environment } from "@react-three/drei";

export function Background(props) {
    return (
        <>
            <color args={[0.01, 0.01, 0.01]} attach="background" />
            <Environment preset="forest" background  />
        </>
    );
}