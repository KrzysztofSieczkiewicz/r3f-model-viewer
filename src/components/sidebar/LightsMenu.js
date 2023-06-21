
export function LightsMenu(props) {
    const lightsList = props.lightsList;
    const light = lightsList[0];

    /* For each light -> create header with type icon, name and circle displaying color and intensity */

    return (
        <div className="dropdown">
            <div class="dropdown-item light-header">
                <div>ICON HERE</div>
                <p>{light.type}</p>
                <div className="color-preview"></div>
                <div>on/off</div>
                <div>Show/Hide</div>
            </div>
        </div>
    );

}