declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module 'three/examples/jsm/loaders/GLTFLoader';
declare module 'three/src/math/Vector3';
declare module 'three/src/math/Euler';