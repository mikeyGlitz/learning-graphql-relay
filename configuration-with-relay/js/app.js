import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                {this.props.greeting} World
            </div>
        );
    }
}
App.defaultProps = { greeting: 'Hello' };

ReactDOM.render(<App />, document.getElementById('react'));