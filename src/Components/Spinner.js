import React, {Component} from 'react';
import loading from './loading.gif'

export  class Spinner extends Component {
    render() {
        return (
            <div className="text-center">
                <center>
                    <img className='my-3' src={loading} alt="loading"/>
                </center>
            </div>
        );
    }
}

export default Spinner;