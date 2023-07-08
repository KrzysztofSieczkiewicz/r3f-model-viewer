export function Trait(props) {

    //handle props types
    function handleTraitType() {
        if(props.type === 'number-input') {
            return (
                <input className="trait-input"
                    type="number"
                    value={props.value}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    onChange={props.handleChange}
                />
            );
        }
    }

    return (
        <div className='trait'>
            <label className='trait-name'>{props.name}</label>
            {handleTraitType()}
        </div>
    );
}