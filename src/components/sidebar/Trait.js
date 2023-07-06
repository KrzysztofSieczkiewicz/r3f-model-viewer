export function Trait(props) {

    //handle props types
    function handleTraitType() {
        if(props.type === 'field-digit') {
            return (
                <input className="trait-input"></input>
            );
        }
    }

    return (
        <div className='trait'>
            <label className='trait-name'></label>
            <div className='trait-input'></div>
        </div>
    );
}