import React from 'react';

import {Switch,Route} from "react-router-dom";

import './App.css';

//Importar Componentes
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up';
import Header from './components/header/header.component';

import {auth,createUserProfileDocument} from "./firebase/firebase-utils"; 
import { Router } from 'react-router-dom/cjs/react-router-dom.min';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      currentUser:null,
    };
    
  unSuscribeFromAuth = null;

    //types life cicles: mount, update , unmount

  }

  componentDidMount(){
    this.unSuscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
            this.setState({
               currentUser:{
                 id: snapShot.id,
                 ...snapShot.data()
               }
            });
            console.log(this.state);
        });

      }
      this.setState({currentUser:userAuth})
    });
}

    componentWillUnmount(){
      this.unSuscribeFromAuth();
    }
    

    render(){
        return(
          <div>
             <Header/>
             <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/shop" component={ShopPage} />
                <Route exact path="/signin" component={SignInAndSignUpPage} />
             </Switch>
          </div>
        );
    }
}


export default App;
