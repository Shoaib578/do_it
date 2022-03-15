import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,TextInput,Platform,Alert,ActivityIndicator} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import Todos from '../../../Schemas/todo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import DatePicker from 'react-native-date-picker'
import firestore from '@react-native-firebase/firestore'

import NetInfo from "@react-native-community/netinfo";







export default class AddTodo extends Component {
   
    state = {
        date:new Date(),
        title:'',
        priority:'',
        isLoading:false
    }
    
    CheckConnectivity = () => {
        // For Android devices
        if (Platform.OS === "android") {
          NetInfo.fetch().then(isConnected => {
            if (isConnected) {
               
            return true
            } else {
               

              return false
            }
          });
        } else {
          // For iOS devices
          NetInfo.addEventListener(
            this.handleFirstConnectivityChange
          );
        }
      };
    
      handleFirstConnectivityChange = isConnected => {
        NetInfo.isConnected.removeEventListener(
          "connectionChange",
          this.handleFirstConnectivityChange
        );
    
        if (isConnected === false) {
          return false
        } else {
         return true
        }
      };

    AddTodo = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        this.setState({isLoading:true})

        let is_connected = this.CheckConnectivity()

        if(is_connected){

        firestore().collection('todos')
        .add({
          
           title:this.state.title,
           priority:this.state.priority,
           expected_date:this.state.date.toLocaleString(),
           created_by:parse.id

        })
        .then(res=>{
            this.setState({
                title:'',
                priority:'',
               
            })
            Alert.alert("Todo Has Been Added")
            this.setState({isLoading:false})


        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        this.setState({isLoading:false})

        })
    }else{
        this.setState({isLoading:true})
        firestore().collection('todos')
        .add({
          
           title:this.state.title,
           priority:this.state.priority,
           expected_date:this.state.date.toLocaleString(),
           created_by:parse.id

        })
        Alert.alert("Todo Has Been Added")
        this.setState({title:'',priority:'',isLoading:false})


    }

    }



   
    render(){
        return(
         <View style={styles.container}>
                <View style={styles.text_input}>
                <MaterialIcons name="work" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Priority" onChangeText={(val)=>this.setState({priority:val})} value={this.state.priority}  selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />

           
                </View>

                

                <View style={styles.text_input}>
                <MaterialIcons name="title" style={styles.phoneImageStyle} color="white" size={25}/>
                <TextInput placeholder="Title" onChangeText={(val)=>this.setState({title:val})} value={this.state.title}  selectionColor="white"  placeholderTextColor="#DBDBDB" style={{flex:1,color:'white'}} 
                />

           
                </View>
             <DatePicker date={this.state.date} style={{alignSelf: 'center',marginTop:20,borderWidth:1,
                borderColor:"#57b5b6",
                width:Dimensions.get('window').width*2/2.2,
                backgroundColor:"#57b5b6",
                borderRadius:10,
            }} onDateChange={(date)=>{
                        this.setState({date:date})
                        console.log(date)
                    }} />

                {this.state.isLoading?<ActivityIndicator size="large" color="white" style={{ alignSelf: 'center' }}/>:null}

 <TouchableOpacity onPress={this.AddTodo} style={styles.submit_btn}>
            

                <Text style={{color:'white'}}>Add</Text>
            </TouchableOpacity>
         </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#ADD8E6',
        flex: 1
        
    },
    todoContainer:{
        backgroundColor:'#57b5b6',
        width:'98%',
        padding:10,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#57b5b6',
        alignSelf: 'center',
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        borderColor:"#57b5b6",
        color:"#BB952D",
        backgroundColor:"#57b5b6",
        alignSelf:'center',
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.2,
        marginTop:20,
      },
      submit_btn:{
      
        borderWidth:1,
        borderColor:"#57b5b6",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#57b5b6',
        alignSelf:'center',
       
        borderRadius:10,
        height:50,
        width:Dimensions.get('window').width*2/2.5,
        marginTop:40,
        marginBottom:10
      }
})