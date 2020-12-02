import React, { Fragment } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

import { useAuthDispatch } from '../context/auth'

const GET_USERS = gql`
    query getUsers{
        getUsers{
            username email createdAt 
        }
    }
`

export default function Home({ history }) {

    const dispatch = useAuthDispatch()
    
    const logout = () => {
        dispatch({ type : 'LOGOUT' })
        history.push('/login')
    }

    const { loading, data } = useQuery(GET_USERS)

    let usersMarkup
    if( !data || loading ){
        usersMarkup = <p>Loading..</p>
    } else if(data.getUsers.length === 0){
        usersMarkup = <p>No users have joined yet</p>
    } else if(data.getUsers.length > 0){
        usersMarkup = data.getUsers.map( user => (
            <div key={user.username}>
                <p>{user.username}</p>
            </div>
        ))
    }

    return (
        <Fragment>
            <Row className="py-5 justify-content-around mb-1">
                <Link to='/login'>
                    <Button variant="link"> Login </Button>
                </Link>
                <Link to='/register'>
                    <Button variant="link"> Register </Button>
                </Link>
                <Button variant="link" onClick={logout}> Logout </Button>
            </Row>
            <Row>
                <Col xs={4}>
                    { usersMarkup }
                </Col>
                <Col xs={8}>
                    
                </Col>
            </Row>
        </Fragment>
        
    )
}
