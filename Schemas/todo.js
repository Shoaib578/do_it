
const Todos = {
    name:"Todos",
    primaryKey:'_id',
    properties:{
        _id:'objectId',
        created_by:{type:'string'},
        priority :{type:'string'},
        expected_date:{type:'string'}
    },
}



export default  Todos;