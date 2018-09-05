import React, { Component } from 'react';
import axios from 'axios'


class Main extends Component {
    constructor() {
        super();
        this.state = {
            quantity: 0,
            fromCurrency: '',
            toCurrency: '',
            result: 0,
            onClickPressed: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value, onClickPressed: true });
    }

    handleClick() {
        const newToCurrency = this.state.fromCurrency
        const newFromCurrency = this.state.toCurrency
        this.setState({ fromCurrency: newFromCurrency, toCurrency: newToCurrency, onClickPressed: true })
    }

    async handleSubmit(evt) {
        evt.preventDefault();
        const convertCurrency = `${this.state.fromCurrency}_${this.state.toCurrency}`
        const result = await axios.get(`/api/convert/${convertCurrency}`)
        const finalAmount = result.data.val * this.state.quantity
        this.setState({ result: finalAmount, onClickPressed: false })
    }


    render() {

        return (
            <div className="border bg-light">
                <h1 className="text-primary">Currency Converter</h1>
                <form onSubmit={this.handleSubmit}>

                    <div className="input-group mb-3 inputform">
                        <div className="input-group-prepend">
                            <label className="input-group-text label" htmlFor="quantity">AMOUNT:
                        </label>
                        </div>
                        <input
                            className="form-control"
                            type="text"
                            name="quantity"
                            value={this.state.quantity}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className='conversion'>
                        <div className="input-group mb-3 chooseform">
                            <div className="input-group-prepend label">
                                <label className="input-group-text" htmlFor="From">FROM:
                        </label>
                            </div>
                            <select className="custom-select" name='fromCurrency' onChange={this.handleChange} value={this.state.fromCurrency}>
                                <option value=''>select currency</option>
                                <option value='USD'>USD</option>
                                <option value='EUR'>EUR</option>
                                <option value='SGD'>SGD</option>
                            </select>
                        </div>
                        <div className="clickButton">
                            <button type="button" className="btn btn-secondary" onClick={this.handleClick}><i class="fas fa-exchange-alt"></i></button>
                        </div>
                        <div className="input-group mb-3 chooseform1">
                            <div className="input-group-prepend">
                                <label className="input-group-text label1" htmlFor="To">TO:
                        </label>
                            </div>
                            <select className="custom-select" name='toCurrency' onChange={this.handleChange} value={this.state.toCurrency}>
                                <option value=''>select currency</option>
                                <option value='USD'>USD</option>
                                <option value='EUR'>EUR</option>
                                <option value='SGD'>SGD</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary submitButton" disabled={this.state.toCurrency === '' || this.state.fromCurrency === '' || this.state.toCurrency === this.state.fromCurrency || this.state.quantity === 0}>Convert</button>
                </form>
                {
                    (this.state.result !== 0 && !this.state.onClickPressed)
                        ? <h5>{this.state.quantity} {this.state.fromCurrency}={this.state.result.toFixed(4)} {this.state.toCurrency}</h5>
                        : null
                }
            </div >
        );
    }

}




export default Main;
