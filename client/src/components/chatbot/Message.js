import React from 'react';

// True and "expression" will return the second expression
const Message = (props) => (
    <div className="row card-chat">
    <div className="col s12">
        <div className="card-panel-4">
                {props.speaks==='Bot' && 
                <div className="row">
                    <div className="col s2">
                        <a className="btn-floating btn-Large waves-effect waves-light red">{props.speaks}</a>
                    </div>
                    <div className="col s10">
                        <span className="black-text">
                            {props.text}
                        </span>
                    </div>
                </div>
                }

                {props.speaks==='Me' &&
                <div className="row">
                    <div className="col s10">
                        <span className="black-text">
                            {props.text}
                        </span>
                    </div>
                    <div className="col s2">
                        <a className="btn-floating btn-Large waves-effect waves-light red">{props.speaks}</a>
                    </div>
                </div>
                }
            </div>
    </div>  
    </div>
    
);

export default Message;