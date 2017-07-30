import React from 'react';

var SavedItem = (props) =>{
console.log("props" ,props);
return(
  <div>
    {props.item.item}
  </div>
);

};

export default SavedItem;
