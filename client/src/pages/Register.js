import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'

const REGISTER_USER = gql`
    mutation register($username: String! $email: String! $password: String! $confirmPassword: String!) {
        register(username: $username email: $email password: $password confirmPassword: $confirmPassword) {
            username
            email
            createdAt
        }
    }
`
export default function Register(props) {
    const [variables, setVariables] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    
    const [errors, setErrors] = useState({})

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, __){
            props.history.push('/login')
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
    });

    const submitRegisterForm = e => {
        e.preventDefault()
        registerUser({ variables })
    }

    return (
        <Row className="py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center"> Register </h1>

                <Form onSubmit={submitRegisterForm}>

                    <Form.Group>
                        <Form.Label className={errors.email && 'text-danger'}>
                            {errors.email ?? 'Email Address'}
                        </Form.Label>
                        <Form.Control 
                            className={errors.email && 'is-invalid'} 
                            type="email" values={variables.email} 
                            onChange={e => setVariables({...variables, email: e.target.value}) }/>
                    </Form.Group>

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

                    <Form.Group>
                    <Form.Label className={errors.confirmPassword && 'text-danger'}>
                            {errors.confirmPassword ?? 'Confirm Password'}
                        </Form.Label>
                        <Form.Control 
                            className={errors.confirmPassword && 'is-invalid'} 
                            type="password" values={variables.confirmPassword} 
                            onChange={e => setVariables({...variables, confirmPassword: e.target.value}) }/>
                    </Form.Group> 

                    <div className="text-center">
                        <Button variant="success" type="submit" disabled={loading}>
                            {loading ? 'Loading ..' : 'Register' }
                        </Button>
                    </div>

                </Form>
            </Col>
        </Row>
    )
}
