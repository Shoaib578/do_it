import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'

import Todos from '../../../Schemas/todo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Users from '../../../Schemas/users'
import  Swipeable  from 'react-native-gesture-handler/Swipeable'

import firestore from '@react-native-firebase/firestore'


export default class Home extends Component {
    state = {
        todos:[],
        isLoading:true,
     
    }
    
  
    
    getAlltodos = async()=>{
        const user = await AsyncStorage.getItem("user")
        const parse = JSON.parse(user)
        
        firestore().collection("todos").where("created_by","==",parse.id).get()
        .then(res=>{
           
            this.setState({todos:res._docs},()=>{
                this.setState({isLoading:false})
            })
            
        })


    }
    complete_work = (id)=>{
     
     
        firestore().collection("todos").doc(id).delete()
        .then(res=>{
            
            this.getAlltodos()
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }
   
    SwipeLeft = (id)=>{
       
      

            return(
                <TouchableOpacity onPress={()=>this.complete_work(id)} style={styles.SwipeLeft}>
                    <Text style={{color:'white'}}>Complete</Text>
                </TouchableOpacity>
            )
        

       
 
    }

    logout = async()=>{
        await AsyncStorage.removeItem("user")
        this.props.navigation.reset({
            index: 0,
            routes:[{name:'login'}],
        });

    }

    
    componentDidMount(){
        this.getAlltodos()

       this.props.navigation.addListener("focus",()=>{
           this.getAlltodos()
         
       })
      
    }
    render(){
        if(this.state.isLoading == false){
            
        return(
           <ScrollView style={styles.container}>
               <View style={{marginTop:20,marginLeft:'80%',flexDirection:'row'}}>
                   <TouchableOpacity onPress={()=>this.props.navigation.navigate('addtodo')}>
                   <AntDesign name="plus" color="white" size={20}/>

                   </TouchableOpacity>

                   <TouchableOpacity onPress={this.logout} style={{left:30}}>
                   <AntDesign name="logout" color="red" size={20}/>

                   </TouchableOpacity>
               </View>

               {this.state.todos.map((data,index)=>{
                   return <Swipeable  renderLeftActions={()=>this.SwipeLeft(data.id)} key={index}>
                       <View  style={styles.todoContainer}>
                   <Text style={{left:5,fontSize:18}}>{data._data.title}</Text>
                   <View style={{borderColor:'white',borderWidth:.2,marginTop:2}}></View>

                   <View style={{flexDirection:'row'}}>
                   <MaterialIcons name="work" color="white" size={20}/>
                   <Text style={{left:10}}>{data._data.priority}</Text>
   
                   </View>
                <View style={{borderColor:'white',borderWidth:.2,marginTop:2}}></View>
   
                   <View style={{flexDirection:'row',marginRight:3,marginTop:8}}>
                   <Entypo name="clock" color="white" size={20}/>
                   <Text style={{left:10}}>{data._data.expected_date}</Text>
   
                   </View>
   
   
               </View> 
                       </Swipeable>  
               })}
             



           



           </ScrollView>
        )
    }else{
        return(
            <View style={styles.container}>
                <ActivityIndicator size="large" color="black" style={{alignSelf: 'center',marginTop: 30}}/>
            </View>
        )
    }

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#ADD8E6',
        flex: 1,
        paddingBottom:10
        
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
     
        justifyContent: 'space-between',
    },
    SwipeLeft:{
        backgroundColor:'green',
        width:'30%',
        padding:10,
        borderRadius:5,
        borderWidth:1,
        borderColor:'#57b5b6',
        alignSelf: 'center',
        justifyContent: 'center',
      
        alignItems:'center',
        height:100,
        marginTop:20,
     
        justifyContent: 'center',
    }
})