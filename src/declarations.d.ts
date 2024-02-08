declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
}

declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module 'three/examples/jsm/loaders/GLTFLoader';
declare module 'three/src/math/Vector3';
declare module 'three/src/math/Euler';