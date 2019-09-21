import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './form.module.scss'

import bag from '../../assets/images/bag.png'
import ItemList from '../ItemList'


class Form extends Component {

    static propTypes = {
        list: PropTypes.array
    }

    static defaultProps = {
        list: ['chocolate', 'bread', 'milk']
    }

    state = {
        list: this.props.list,
        newItem: '',
        message: '',
        boughts: [],
    }

    _handleChange = (e) => {
        e.preventDefault()
        this.setState({
            newItem: e.target.value
        })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { list, newItem } = this.state
        const allReadyExist = list.includes(newItem)
        if(newItem !== '' && !allReadyExist){
            this.setState({
                list: [...list, newItem]
            }, () => {
                const { list } = this.state
                localStorage.setItem("products", JSON.stringify(list));
            })
        }
        allReadyExist ?
            this.setState({
                message: 'This item already exist'
            })
            :
            this.setState({
                message: ''
            })
            this.theForm.reset()
    }

    _handleRemove = (item) => {
        const { list, boughts } = this.state
        const filterList = list.filter(items => items !== item)
        const filterInBoughts = boughts.filter(items => items !== item)
        this.setState({
            list: filterList,
            boughts: filterInBoughts   
        }, () => {
            const { list, boughts } = this.state
            localStorage.setItem("products", JSON.stringify(list));
            localStorage.setItem("selected", JSON.stringify(boughts)); 
            
        })
    }

    _handleBought = (item) => {
        const { boughts } = this.state
        const filterBought = boughts.filter(items => items !== item)
        const allReadyBought = boughts.includes(item)
        allReadyBought 
        ? this.setState({
             boughts: filterBought
        }, () => {
            const { boughts } = this.state
            localStorage.setItem("selected", JSON.stringify(boughts));
        })
        : this.setState({
             boughts: [...boughts, item]
        }, () => {
            const { boughts } = this.state
            localStorage.setItem("selected", JSON.stringify(boughts));
        })

    }

    _handleSelect = (item) => {
        const { boughts } = this.state
        if(boughts.includes(item)){
            return 'active_bought'
        }
        else{
            return ''
        }
    }

    UNSAFE_componentWillMount(){
        const productsStorage = JSON.parse(localStorage.getItem("products"))
        const productsSelected =  JSON.parse(localStorage.getItem("selected"))
        if(productsStorage !== null){
            this.setState({
                list: productsStorage
            })
        }
        if(productsSelected !== null){
            this.setState({
                boughts: productsSelected
            })
        }
    }

    render(){
        const { list, message, boughts } = this.state
        const boughtsLength = boughts.length
        const listLength = list.length
        const isEmpty = list.length === 0
        return(
            <div className={styles.root}>
                <div className={styles.wrap_img}>
                    <span className={styles.boughts}>{boughtsLength}</span>
                    <img className={styles.bag} src={bag} alt='shopping bag'/>
                    {listLength === boughtsLength && listLength !== 0
                    ? <p className={styles.boughts_complete}>Purchase completed!!</p>
                    : ''
                    }
                </div>
                <form 
                ref= {theForm => this.theForm = theForm}
                onSubmit={this._handleSubmit}
                className="field has-addons">
                    <div className="control">
                        <input 
                        onChange={this._handleChange}
                        className="input"
                        type="text" 
                        placeholder="Add new item"
                        />
                    </div>
                    <div className="control">
                        <button className="button is-info">Add +</button>
                    </div>
                </form>
                {message !== '' && <p className={`${styles.message} has-text-danger`}>{message}</p>}
                {isEmpty ? 
                <p className={`${styles.message} has-text-danger`}>Shopping list is empty</p>
                :
                <ItemList 
                listItem={list}
                onRemove={this._handleRemove}
                getItem={this._handleBought}
                classActive={this._handleSelect}
                />
                }
            </div>
        )
    }
}

export default Form