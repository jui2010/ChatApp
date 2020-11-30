  
import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

export default function Register() {
    const [variables, setVariables] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    })
    
    const submitRegisterForm = e => {
        e.preventDefault()
    }

    return (
        <Row className="py-5 justify-content-center">
            <Col sm={8} md={6} lg={4}>
                <h1 className="text-center"> Register </h1>
                <Form onSubmit={submitRegisterForm}>
                    <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" values={variables.email} onChange={e => setVariables({...variables, email: e.target.value}) }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" values={variables.username} onChange={e => setVariables({...variables, username: e.target.value}) }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" values={variables.password} onChange={e => setVariables({...variables, password: e.target.value}) }/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" values={variables.confirmPassword} onChange={e => setVariables({...variables, confirmPassword: e.target.value}) }/>
                    </Form.Group> 
                    <div className="text-center">
                    <Button variant="success" type="submit">
                        Register
                    </Button>
                    </div>
                </Form>
            </Col>
        </Row>
    )
}
