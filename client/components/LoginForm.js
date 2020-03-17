import React, {Component} from 'react'
import AuthForm from './AuthForm'
import {graphql} from 'react-apollo'
import LoginMutation from '../mutations/Login'
import currentUserQuery from '../queries/currentUser'
import {hashHistory} from 'react-router'


class LoginForm extends Component{
    constructor(props){
        super(props)

        this.state={errors:[]}
    }

    componentWillUpdate(nextProps){
        //this.props: the old, current set of props
        //nextProps:  the next set of props that will be in place when the component re-renders
        if(!this.props.data.currentUser && nextProps.data.currentUser){
            //redirect to dashboard!!
            hashHistory.push('/dashboard')
        }
    }

    onSubmit({email,password}){
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{query: currentUserQuery}]
        })
        .catch(res => {
            const errors = res.graphQLErrors.map(error => error.message)
            this.setState({errors})
        })
    }

    render(){
        return(
            <div>
                <h4>Login</h4>
                <AuthForm 
                    onSubmit={this.onSubmit.bind(this)} 
                    errors={this.state.errors}
                />
            </div>
        )
    }
}
export default graphql(currentUserQuery)(
    graphql(LoginMutation)(LoginForm)
)