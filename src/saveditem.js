import React from 'react';

var SavedItem = (props) =>{
console.log("props" ,props);
return(
  <div value = {props.item} onClick ={props.save}>
    {props.item.item}
  </div>
);

};

export default SavedItem;
