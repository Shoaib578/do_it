import React,{Component} from 'react';
import {View,Text,ScrollView, SafeAreaView,Dimensions,TextInput,TouchableOpacity,Image, Alert, ActivityIndicator,StyleSheet} from 'react-native';
import validator from 'validator';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo'
import Foundation from 'react-native-vector-icons/Foundation'
import Users from '../../../Schemas/users'

import firestore from '@react-native-firebase/firestore'






export default class Register extends Component {
    state = {
        phone_no:"",
        password:"",
        isLoading:false
    }   

    validate = ()=>{
        let phone_no_error = ''
        let password_error = ''
        
        if(validator.isMobilePhone(this.state.phone_no) == false){
            phone_no_error = 'Invalid Phone Number'
            Alert.alert("Invalid Phone Number")
           
        }

        if(this.state.password.length<6){
            password_error = 'Password Must Be at least 6 characters'
            Alert.alert("Password Must Be Atleast 6 characters")
            
        }

        if(phone_no_error || password_error){
            return false
        }

        return true
    }

    
    SignUp = ()=> {
       let is_validated = this.validate()

        if(is_validated){

        this.setState({isLoading:true})
        firestore().collection('users').where("phone_no",'==',this.state.phone_no).get()
        .then(res=>{
            if(res.size <1){
                
              
                    firestore().collection('users')
                    .add({
                      
                       
                        password:this.state.password,
                     
                        phone_no:this.state.phone_no,
                      
     
                    })
                    .then(res=>{
                        this.setState({isLoading:false,
                          
                            password:'',
                          
                            phone_no:''
                        })
                        
                        Alert.alert("Registered Successfully")
                    
                   
                })
              
            }else{
                this.setState({isLoading:false})

                Alert.alert("Email Already Exist Please Try Another One")
                return false
            }
        })
        .catch(err=>{
            console.log(err)
            this.setState({isLoading:false})
            Alert.alert("Something Went Wrong")
        })
    }

    }
    
  
    render(){
        return(
            <ScrollView style={styles.container}>
              

                <SafeAreaView style={{marginTop:10,alignItems: 'center',alignSelf: 'center',}}>



                <Text style={{color:'white',fontSize:18,marginTop:30}}>Register</Text>
               

                <View style={styles.text_input}>
                <Feather name="smartphone" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Mobile Number "  onChangeText={(val)=>this.setState({phone_no:val})} value={this.state.phone_no} selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>



                <View style={styles.text_input}>
                <Feather name="lock" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Password" secureTextEntry selectionColor="white" onChangeText={(val)=>this.setState({password:val})} value={this.state.password} placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />
                </View>

                {this.state.isLoading?<ActivityIndicator size="large" color="white" style={{ alignSelf: 'center' }}/>:null}

                <TouchableOpacity onPress={this.SignUp} style={styles.submit_btn} >
                    
                    <Text style={{ fontSize:16,fontWeight:'bold',color:'#57b5b6'}}>Sign Up</Text>
                </TouchableOpacity>
                
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:30}}>

                <TouchableOpacity onPress={()=>this.props.navigation.navigate('login')}>
                    <Text style={{color:'white',fontSize:15}}>Already Have An Account</Text>
                </TouchableOpacity>

              

                </View>

                </SafeAreaView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
       
   
        backgroundColor: '#57b5b6',
       

    },
   

    SignupSellerContainer:{
        flex:1,
        
        backgroundColor: '#57b5b6'
    },
    phoneImageStyle:{
        padding: 0,
        marginLeft:9,  
       
       
        alignItems: 'center',
        margin:12,
        
      },

     

      text_input:{
        flexDirection: 'row',
        borderWidth:1,
        borderColor:"white",
        color:"#BB952D",
        
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:20,
      },
      submit_btn:{
      
        borderWidth:1,
        borderColor:"white",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:40,
        marginBottom:20
      }
})