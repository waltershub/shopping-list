import React from 'react';
import Savedlist from './savedlist';

var Savedlists = (props) =>{
  console.log('savedlists', props);
  return(
    <div className = "lists">
       {props.lists.map((list,i) =>
         <Savedlist
           save ={props.save}
           key={i}
           list={list}
           />
       )}
    </div>
    );
};

export default Savedlists;
