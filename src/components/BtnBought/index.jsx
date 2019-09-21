import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './btnBought.module.scss'

class BtnBought extends Component {

    static propTypes = {
        onBought: PropTypes.func,
        theClass: PropTypes.string
    }

    render(){
        const { onBought, theClass } = this.props
        return(
            <button onClick={onBought}
            className={`${styles.custom_button}`}>
                <i className={`${styles.custom_icon} ${theClass} fas fa-shopping-cart`}>                                        
                </i>
            </button> 
        )
    }

}

export default BtnBought