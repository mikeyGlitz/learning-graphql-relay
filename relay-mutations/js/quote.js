import React, {Component} from 'react';
import Relay, {createContainer} from 'react-relay';

import ThumbsUpMutation from './thumbs-up-mutation';

class Likes extends Component{
    thumbsUpClick(){
        Relay.Store.commitUpdate(
            new ThumbsUpMutation({
                quote: this.props.quote
            })
        );
    }
    
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                {this.props.quote.likesCount}&nbsp;
                <span className="glyphicon glyphicon-thumbs-up"
                    onClick={this.thumbsUpClick.bind(this)}>
                </span>
            </div>
        );
    }
}

class Quote extends Component {
    showLikes(){
        this.props.relay.setVariables({ showLikes: true });
    }
    
    constructor(props){
        super(props);
    }
    
    render(){
        const {relay, quote: {text, author} } = this.props;
        const {showLikes} = relay.variables;
        return(
            <blockquote onClick={ this.showLikes.bind(this) } role={ !showLikes && 'button'} >
                <p>{ text }</p>
                <footer>{ author }</footer>
                { showLikes && <Likes quote={ this.props.quote } /> }
            </blockquote>
        );
    }
}

export default createContainer(Quote, {
    initialVariables: {
        showLikes: false
    },
    fragments: {
        quote: () => Relay.QL `
            fragment OneQuote on Quote {
                ${ThumbsUpMutation.getFragment('quote')}
                text
                author
                likesCount @include(if: $showLikes)
            }
        `
    }
});