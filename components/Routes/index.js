import React,{Component} from 'react';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from '../Screens/Auth/register';
import Splash from '../Screens/Splash';
import Home from '../Screens/home';
import Login from '../Screens/Auth/login';
import AddTodo from '../Screens/AddTodo';
const Stack = createStackNavigator()


export default class Routes extends Component {
   Sign
    render(){
        return(
           <NavigationContainer >
               <Stack.Navigator initialRouteName='splash' screenOptions={{gestureEnabled:true,gestureDirection:'horizontal', cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,}}>
                   <Stack.Screen name="register" component={Register} options={{headerTransparent:true,headerTitle:''}}/>
                   <Stack.Screen name="login" component={Login} options={{headerTransparent:true,headerTitle:''}}/>

                   <Stack.Screen name="home" component={Home} options={{headerTitle:'Todos',headerStyle:{backgroundColor:'#57b5b6'},headerTintColor:'white'}}/>
                   <Stack.Screen name="addtodo" component={AddTodo} options={{headerTitle:'Add Todo',headerStyle:{backgroundColor:'#57b5b6'},headerTintColor:'white'}}/>

                   <Stack.Screen name="splash" component={Splash} options={{headerShown:false}}/>

               </Stack.Navigator>
           </NavigationContainer> 
        )
    }
}