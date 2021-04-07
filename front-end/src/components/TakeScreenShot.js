import React, { useEffect, createRef } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";
import html2canvas from 'html2canvas';

export default function TakeScreenShot() {
    const ref = createRef(null);
    const [image, takeScreenShot] = useScreenshot();


    const getImage = () => {
       
       
        takeScreenShot(ref.current.contentWindow)
    };


   // console.log(image)

    const downloadImage= ()=>{

        const iframeContent = document.getElementById("capture");

        console.log(iframeContent.contentWindow)

        html2canvas(document.getElementById("capture")).then(canvas => {

          
            document.body.appendChild(canvas);
        });
        
        }



    return (
        <div>
            <button  onClick={getImage}>Take screenshot</button>
            <div>
            <iframe
             id="capture"
                                ref={ref}
                width="730"
                height="570"
                align="middle"
                src={"https://claurendeau-estd.omnivox.ca/estd/hrre/VersionImp.ovx?dateCal="}
            />


            </div>
            


           
            <div >
                <p>
                    <strong>image</strong>
                </p>
            </div>

            <img src={image} alt={'Screenshot'} />

        </div>
    );
};


