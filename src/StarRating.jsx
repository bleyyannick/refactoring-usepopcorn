import { useState } from "react";
import { Star } from "./Star";


/* eslint-disable react/prop-types */
export const StarRating = ({maxRating= 10})=> {

 const containerStyle = {
    display: 'flex', 
    alignItems: 'center', 
    gap: '16px'

 }; 

 const starContainerStyle = {
     display: 'flex', 
    gap: '4px',
 }; 

 const textStyle = {
    lineHeight: "1", 
    margin: "0"
 }

 const [rating, setRating] = useState(0); 
 const [tempRating, setTempRating] = useState(0)

 return(
    <div style={containerStyle}>
        <div style={starContainerStyle}>
            {Array.from({length: maxRating}, (_, i) => (
               <Star key={i} 
                onClick={() => setRating(i +1)} 
                full={tempRating ? tempRating >= i+ 1 : rating >= i+ 1}
                onHoverIn={() => setTempRating(i + 1)}
                onHoverOut={() => setTempRating(0)}
                />
            ))}
        </div>
        <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
 )
}; 