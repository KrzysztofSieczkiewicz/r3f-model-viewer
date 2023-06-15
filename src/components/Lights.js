export function Lights(props) {
    const lightsList = props.lightsList;

    return (
        <>
            {lightsList.map((light) => {
                if (light.type === 'pointLight') {
                return <pointLight 
                    key={light.ref} 
                    position={light.position}
                    color={light.color} 
                    intensity={light.intensity} 
                    />;
                } else if (light.type === 'spotLight') {
                return <spotLight 
                    key={light.ref} 
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