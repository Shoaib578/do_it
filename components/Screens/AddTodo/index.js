import React,{Component} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Dimensions,TextInput,Alert} from 'react-native'

import Feather from 'react-native-vector-icons/Feather'
import Realm from 'realm'
import Todos from '../../../Schemas/todo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
var ObjectID = require("bson-objectid");
import DatePicker from 'react-native-date-picker'


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



// const db_locale = async()=>{
//     const realm =await Realm.open({
//         path:'do-it',
//         schema:[Todos],
//         schemaVersion: 21
//     })
//     return realm
// }



export default class AddTodo extends Component {
   
    state = {
        date:new Date(),
        title:''
    }
    
    InsertTodo = async()=>{
        const user = await AsyncStorage.getItem('user')
        const parse = JSON.parse(user)
        
        db().then(res=>{
            res.write(async()=>{
              await  res.create("Todos",{
                    _id:ObjectID(),
                    created_by:parse._id,
                    priority:this.state.priority,
                    expected_date:this.state.date.toLocaleString(),
                    title:this.state.title
                })
                this.setState({priority:'',title:''})
               Alert.alert("Inserted Successfully")
            })
        })
        .catch(err=>{
            Alert.alert("Something Went Wrong")
        })
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
 <TouchableOpacity onPress={this.InsertTodo} style={styles.submit_btn}>
            

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