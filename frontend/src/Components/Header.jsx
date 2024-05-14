import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'
import { SymbolState } from '../SymbolContext'

function Header() {
    const { isLogin, setIsLogin } = SymbolState()
    return (
        <Container>
            <div className="header container flex-s">
                <Typography variant='h6'>Stock Watch</Typography>
                <div className="header__buttons flex-h">
                    <Sidebar />
                    <Button variant='outlined' onClick={() => setIsLogin(!isLogin)}>Log out</Button>
                </div>
            </div>
        </Container>
    )
}

export default Header
