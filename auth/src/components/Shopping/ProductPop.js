import React from 'react';
import "./ProductPop.css";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/translucent.css';
import 'tippy.js/animations/shift-away.css';

function ProductPop(props) {
    return (
        
        <div>
           <div className="pop-container">
               <Tippy  className="tippu" interactive={true}
                interactiveBorder={2}
                animation="shift-away"
               theme={"translucent"}
                trigger="click"
                placement="bottom"
                maxWidth="85vw"
                {...props}>
                <button className="pop-button" id="butt">Know how!</button>
                </Tippy>
           </div>
        </div>
    )
}

export default ProductPop

