export function Assets(props) {
    const assetsList = props.assetsList

    /*
    THIS SHOULD GET LIST OF PROPERTIES FROM ASSET, then return 
    <mesh castShadow geometry={nodes.T_Shirt_male.geometry} material={materials.lambert1} material-roughness={1} {...props} dispose={null}>
      <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={texture} map-anisotropy={16} />
    </mesh>

    get how to recover pure geometry and material from gltf
    */
    return (<>
        {assetsList.map((asset) => {
            <mesh key={asset.id} object={asset.object} />
        })}
    </>);

}