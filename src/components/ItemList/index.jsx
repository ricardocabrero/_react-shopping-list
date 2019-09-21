import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './itemlist.module.scss'

import BtnBought from '../BtnBought'

class ItemList extends Component { 

    static propTypes = {
        listItem: PropTypes.array,
        onRemove: PropTypes.func,
        getItem: PropTypes.func,
    }

    render(){
        const { listItem, onRemove, getItem, classActive } = this.props

        return(
            <div className={`table-container ${styles.top}`}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Bought</th>
                            <th>Item</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {listItem.map((item,i) => {
                        return(
                            <tr key={i}>
                                <td className={styles.middle}>
                                <BtnBought
                                onBought={() => getItem(item,i)}
                                theClass={classActive(item)}
                                />
                                </td>
                                <td className={styles.middle}>{i+1}</td>
                                <td className={styles.capitalize}>{item}</td>
                                <td>
                                    <button 
                                    onClick={() => onRemove(item)}
                                    className="button is-light">Remove</button>
                                </td>
                            </tr>
                            ) 
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ItemList