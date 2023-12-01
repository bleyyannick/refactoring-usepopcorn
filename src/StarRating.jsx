import { useState } from "react";
import { Star } from "./Star";


/* eslint-disable react/prop-types */
export const StarRating = ({
   maxRating= 10, 
   color="#ffc419",
   size=48,
   messages=[],
   defaultRating=0, 
   onRate,
})=> {

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
    margin: "0", 
    color, 
    fontSize: `${size/ 1.5}px`,
 }



 const [rating, setRating] = useState(defaultRating); 
 const [tempRating, setTempRating] = useState(0)

 const handleClick = (newRating) => {
   setRating(newRating + 1); 
   onRate ? onRate( newRating + 1): null; 
 }


 return(
    <div style={containerStyle}>
        <div style={starContainerStyle}>
            {Array.from({length: maxRating}, (_, i) => (
               <Star key={i} 
                onClick={() => handleClick(i)} 
                full={tempRating ? tempRating >= i+ 1 : rating >= i+ 1}
                onHoverIn={() => setTempRating(i + 1)}
                onHoverOut={() => setTempRating(0)}
                color={color}
                size={size}
                />
            ))}
        </div>
        <p style={textStyle}>{messages.length === maxRating ? 
                              messages[tempRating ? tempRating - 1 : rating - 1]: 
                              tempRating || rating || ""}
        </p>
    </div>
 )
}; 