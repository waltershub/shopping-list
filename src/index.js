import React from 'react';
import ReactDOM from 'react-dom';
import data from './exampleData';

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      shoppingList: data.data,
      listField:'Your list goes here',


    };
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({listField: event.target.value});
  }

  handelSubmit(event){
    var store = 'koherMarket';
    var user = 'walter';
    console.log(this.state.listField);
    var items = this.state.listField.split(" ");
    this.setState({listField: ''});
    items.forEach((item)=>{
      var shopObject = {
        id:data.data[data.data.length-1].id+1,
        store:'kosher market',
        user:'walter',
        item: item,
        bought:false
      };
      data.data.push(shopObject);
      this.setState({shoppingList:data.data});
    });

  }

  render(){
    console.log(this.state.shoppingList);
    console.log(this.state.listField);
    return(
      <center>
        <h1>A.D.D Shopping List</h1>
          <textarea placeholder="Your list goes here" rows="4" cols="25" value={this.state.listField} onChange={this.handleChange} >
            </textarea>
            <div>
            <button type="button" onClick={this.handelSubmit}>Submit!</button>
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
  <div>
     <input type="checkbox" id="shopItem" value="item">
     </input>
     <label >{props.item}</label>
  </div>

);
};

ReactDOM.render(<App />, document.getElementById('root'));
