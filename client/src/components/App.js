import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Landing from './Landing';
import About from './About';
import Shop from './Shop';
import Chatbot from './chatbot/Chatbot';
import './Styles.css';

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header/>
                        <div className="container">
                            <div className="row">
                                <div className="col s12 m6">
                                    <Chatbot/>
                                </div>
                                <div className="col s12 m6">
                                    <Route exact path="/" component={Landing} />
                                </div>
                                <div className="col s12 m6">
                                    <Route exact path="/about" component={About} />
                                </div>
                                <div className="col s12 m6">
                                    <Route exact path="/shop" component={Shop} />
                                </div>
                            </div>
                            
                        </div>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App;