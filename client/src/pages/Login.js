import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useLazyQuery } from '@apollo/client'
import { useAuthDispatch } from '../context/auth'

const LOGIN_USER = gql`
    query login($username: String! $password: String!) {
        login(username: $username password: $password ) {
            username
            email
            createdAt
            token
        }
    }
`
export default function Login(props) {
    const [variables, setVariables] = useState({
        username: '',
        password: ''
    })
    
    const [errors, setErrors] = useState({})

    const dispatch = useAuthDispatch()

    const [loginUser, { loading }] = useLazyQuery(LOGIN_USER, {
        onCompleted(data){
            dispatch({ type: 'LOGIN', payload: data.login })
            window.location.href = '/'
        },        
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
    });

    const submitLoginForm = e => {
        e.preventDefault()
        loginUser({ variables })
    }

    return (
        <Row className="py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center"> Login </h1>

                <Form onSubmit={submitLoginForm}>

                    <Form.Group>
                        <Form.Label className={errors.username && 'text-danger'}>
                            {errors.username ?? 'Username'}
                        </Form.Label>
                        <Form.Control 
                            className={errors.username && 'is-invalid'} 
                            type="text" values={variables.username} 
                            onChange={e => setVariables({...variables, username: e.target.value}) }/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label className={errors.password && 'text-danger'}>
                            {errors.password ?? 'Password'}
                        </Form.Label>
                        <Form.Control 
                            className={errors.password && 'is-invalid'} 
                            type="password" values={variables.password} 
                            onChange={e => setVariables({...variables, password: e.target.value}) }/>
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'Loading ..' : 'Login' }
                        </Button>
                    </div>

                </Form>
            </Col>
        </Row>
    )
}
