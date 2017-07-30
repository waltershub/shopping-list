import React from 'react';
import Savedlist from './savedlist';

var Savedlists = (props) =>{
  return(
    <div className = "lists">
      lists coming soon
       {props.lists.map((list,i) =>
         <Savedlist
           key={i}
           list={list}
           />
       )}
    </div>
    );
};

export default Savedlists;
