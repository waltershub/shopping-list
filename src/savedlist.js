import React from 'react';
import SavedItem from './saveditem';

var Savedlist = (props) =>{
 console.log("savedlist", props);
  return(
    <div>
       List
       {props.list.date}
       {props.list.items.map((item ,i)=>
         <SavedItem
           key ={i}
           item ={item}
           />
       )}
    </div>
  );

};

export default Savedlist;
