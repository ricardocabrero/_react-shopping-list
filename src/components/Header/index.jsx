import React from 'react'
import styles from './header.module.scss'

const Header = ({text}) => (
    <header className={styles.root}>
        <h1 className='title is-4'>{text}</h1>
    </header>
)

export default Header