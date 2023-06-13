export function Sidebar(props) {
    const lightsList = props.lightsList;
    const addLight = props.addLight;
    const updateLight = props.addLight;

    return (
        <div id="sidebar">
            <p>TEST SIDEBAR LOCATION</p>
            <button onClick={addLight}>Add Light</button>
        </div>
    );

}