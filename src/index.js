import React from 'react';
import ReactDOM from 'react-dom';
import data from './exampleData';

class App extends React.Component {
    render(){
        return(
            <div>
                <h1>A.D.D Shopping List</h1>
                <textarea rows="4" cols="50">
                </textarea>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
