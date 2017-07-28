import React from 'react';
import ReactDOM from 'react-dom';
import data from './exampleData';

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      shoppingList: data.data
    };
  }
  render(){
    console.log(this.state.shoppingList);
    return(
      <center>
        <h1>A.D.D Shopping List</h1>
          <textarea rows="4" cols="50">
            </textarea>
            <div>
            <button type="button">Submit!</button>
            </div>
            <div>
            <List
              list={this.state.shoppingList}
            />
            </div>
        </center>
        );
    }
}

var List = (props)=>

{

return(
  <div className = "list">
    List
    {props.list.map(item =>
      <ShopItem
        key = {item.id}
        item={item.item}/>
    )}
  </div>
);
};

var ShopItem = (props) =>
{
console.log(props);
return (
  //console.log(props)
  <div >
    <div>{props.item}</div>
  </div>

);
};

ReactDOM.render(<App />, document.getElementById('root'));
