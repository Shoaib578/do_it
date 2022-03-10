import React,{Component} from 'react';
import {View,Text,Image} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
export default class Splash extends Component {
    state = {
        isLoggedIn:false,
      
      }

    isLoggedIn = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
      
        if(parse == null){
          this.setState({isLoggedIn:false})
        }else{
          this.setState({isLoggedIn:true})
        }

        if(this.state.isLoggedIn){
           
                this.props.navigation.reset({
                    index: 0,
                    routes:[{name:'home'}],
                });
           
            
        }else{
            this.props.navigation.reset({
                index: 0,
                routes:[{name:'login'}],
            });
        }

        
        }

        componentDidMount(){
            setTimeout(()=>{
              this.isLoggedIn()
          
            },800)
              
          }


    render(){
        return(
            <View style={{ alignItems:'center',justifyContent:'center',flex:1,backgroundColor: '#57b5b6',}}>
               <Text style={{color:'white',fontWeight:'bold',fontSize:25}}>DO-IT</Text>

               <Text style={{color:'white',fontSize:18}}>Loading...</Text>
            </View>
        )
    }
}