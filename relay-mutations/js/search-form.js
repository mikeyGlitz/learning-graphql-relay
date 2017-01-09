import React, {Component, PropTypes} from 'react';

class SearchForm extends Component {
    static propTypes = {
        searchAction: PropTypes.func.isRequired
    };
    
    handleChange(event){
        this.props.searchAction(event.target.value);
    }
    
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <form className="navbar-form" role="search">
                <input type="text" className="form-control"
                    placeholder="search..."
                    onChange={this.handleChange.bind(this)} />
            </form>
        );
    }
}

export default SearchForm;