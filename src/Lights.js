export function Lights(props) {
    const lightsList = props.lightsList;

    return (
        <>
            {lightsList.map((light) => {
                if (light.type === 'pointLight' && light.visible) {
                return <pointLight 
                    key={light.id} 
                    position={light.position}
                    color={light.color} 
                    intensity={light.intensity} 
                    />;
                } else if (light.type === 'spotLight' && light.visible) {
                return <spotLight 
                    key={light.id} 
                    position={light.position}
                    color={light.color} 
                    intensity={light.intensity}
                    />;
                } else {
                return null;
                }
            })}
        </>
    );
}