import {Schema,model} from 'mongoose';

const userSchema = new Schema({
    pseudo: {
        type: String,
        required: true,
    } ,
    role: {
        type: String,
        required: true,
    } ,
    email:{
        type:String,
        required: true,
    },
    ddn:{
        type: Date,
    }, 
    mdp:{
        type: String,
        required:true,
    },
    favoris:[]

});

const User= model('User',userSchema);

export default User;