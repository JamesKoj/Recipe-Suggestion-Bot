import React from 'react';

const Card = (props) => {
    return (
        <div className="col s10 offset-s1">
            <div className="card">
                <div className="card-image">
                  <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />
                  <span className="card-title">{props.payload.fields.header.stringValue}</span>
                </div>
                <div className="card-content">
                  "{props.payload.fields.description.stringValue}"
                </div>
                <div className="card-action">
                  <a target="_blank" rel="noopener noreferrer" href={props.payload.fields.link.stringValue}>Go to recipe </a>
                </div>
            </div>
        </div>
    );

};

export default Card;