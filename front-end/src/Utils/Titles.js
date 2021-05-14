import React from 'react'

export default function Titles(props) {
    return (
        <div className="container p-2 ">
            <div className="row justify-content-center">
                <div className="col-auto mr-auto">
                    <img src={props.src} alt="image temporaire" style={{ height: '50px', width: '50px' }} />
                </div>

                <div className="col-auto align-self-center mr-auto ">
                    <span className="align-middle font-weight-bold h4">
                        {props.text}
                    </span>
                </div>

            </div>

        </div>
    )
}
