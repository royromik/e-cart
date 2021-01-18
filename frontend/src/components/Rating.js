import React from 'react';

const Rating = ({value, text}) => {
    return ( 
        <div className="rating">
            {[...Array(5).keys()].map((v,i)=>(
                <span key={i + 1}>
                    <i className={
                        value>=i+1?'fas fa-star':value>=i+0.5?'fas fa-star-half-alt':'far fa-star'
                    }></i>
                </span>
            ))}
            <span className="ml-2">{text && text}</span>
        </div>
     );
}
 
export default Rating;