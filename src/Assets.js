export function Assets(props) {
    const assetsList = props.assetsList

    return (<>
        {lightsList.map((asset) => {
            <primitive key={asset.id} object={asset.object} />
        })}
    </>);

}