import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import Realm from 'realm'
import Todos from '../../../Schemas/todo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Users from '../../../Schemas/users'
import  Swipeable  from 'react-native-gesture-handler/Swipeable'
var ObjectID = require("bson-objectid");


const app = new Realm.App({id:'do-it-ioxms',timeout: 10000})
const credentials = Realm.Credentials.anonymous(); 
const db = async()=>{
    const loggedInUser = await app.logIn(credentials);
    const configuration = {
        schema: [Todos], 
        sync: {
          user: app.currentUser,
          partitionValue: "622890eae210279e9fccc51e", 
        }
      };
      const realm = Realm.open(configuration)
      return realm
}


// const db = async()=>{
//     const realm =await Realm.open({
//         path:'do-it',
//         schema:[Todos],
//         schemaVersion: 21
//     })
//     return realm
// }

export default class Home extends Component {
    state = {
        todos:[]
    }
    getAlltodos = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        
        db().then(res=>{
           
       let todos= res.objects("Todos").filtered(`created_by=='${parse._id}'`)
        this.setState({todos: todos})

           
            
        })
    }

    logout = async()=>{
        await AsyncStorage.removeItem('user')
        .then(res=>{
            this.props.navigation.reset({
                index: 0,
                routes:[{name:'login'}],
            });
        })
        
    }
  



    complete_work = async(id)=>{
        await db().then(res=>{
            res.write(()=>{
              res.delete(res.objectForPrimaryKey("Todos",id))
               this.getAlltodos()
            })
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
    }

    Swipe = (id)=>{
      
        return(
            <TouchableOpacity onPress={()=>this.complete_work(id)} style={styles.SwipeLeft}>
                <Text style={{color:'white'}}>Complete</Text>
            </TouchableOpacity>
        )
    }

    componentDidMount(){
        this.getAlltodos()

       this.props.navigation.addListener("focus",()=>{
           this.getAlltodos()
       })
      
    }
    render(){
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
                   return <Swipeable renderLeftActions={()=>this.Swipe(data._id)} key={index}>
                       <View  style={styles.todoContainer}>
                   <Text style={{left:5,fontSize:18}}>{data.title}</Text>
                   <View style={{borderColor:'white',borderWidth:.2,marginTop:2}}></View>

                   <View style={{flexDirection:'row'}}>
                   <MaterialIcons name="work" color="white" size={20}/>
                   <Text style={{left:10}}>{data.priority}</Text>
   
                   </View>
                <View style={{borderColor:'white',borderWidth:.2,marginTop:2}}></View>
   
                   <View style={{flexDirection:'row',marginRight:3,marginTop:8}}>
                   <Entypo name="clock" color="white" size={20}/>
                   <Text style={{left:10}}>{data.expected_date}</Text>
   
                   </View>
   
   
               </View> 
                       </Swipeable>  
               })}
             



           



           </ScrollView>
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