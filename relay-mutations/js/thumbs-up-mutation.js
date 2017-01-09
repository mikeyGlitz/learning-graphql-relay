import React from 'react';
import Relay from 'react-relay';

class ThumbsUpMutation extends Relay.Mutation {
    static fragments = {
        quote: () => Relay.QL `
            fragment on Quote {
                id
            }
        `
    };
    
    constructor(props){
        super(props);
    }
    
    getMutation(){
        return Relay.QL `
            mutation {
                thumbsUp
            }
        `;
    }
    
    getVariables(){
        return {
            quoteId: this.props.quote.id
        };
    }
    
    getFatQuery(){
        return Relay.QL `
            fragment on ThumbsUpMutationPayload {
                quote {
                    likesCount
                }
            }
        `;
    }
    
    getOptimisticResponse(){
        return {
            quote: {
                id: this.props.quote.id,
                likesCount: this.props.quote.likesCount + 1
            }
        };
    }
    
    getConfigs() {
        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    quote: this.props.quote.id
                }
            }
        ];
    }
}

export default ThumbsUpMutation;