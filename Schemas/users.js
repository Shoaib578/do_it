const Users = {
    name:"Users",
    primaryKey:'_id',

    properties: {
        _id:'objectId',
        phone_number:{type:'string'},
        password:{type:'string'}
    },
   

}


export default Users