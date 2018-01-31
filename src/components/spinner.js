import React from 'react';

const Spinner = (props) => {
    const spinnerStyle = {
        height: props.height || '1em',
        width: props.width || '100%',
        lineHeight: props.height || '1em',
        backgroundColor: props.bgColor || 'initial'
    }
    const spinnerColor = {
        color: props.color || '#00d664'
    }
    let spinnerAction = <div className='imageSpinner'>
        <div style={spinnerColor} className='bounce1'></div>
        <div style={spinnerColor} className='bounce2'></div>
        <div style={spinnerColor} className='bounce3'></div>
    </div>;
    if (props.hidden) {
        spinnerAction = <div className='imageSpinner'></div>;
    }
    if (props.downError) spinnerAction = `Couldn't load the image`;
    return (
        <div style={spinnerStyle}>
            {spinnerAction}
        </div>
    )
}

export default Spinner;