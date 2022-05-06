import { GraphQLBoolean, GraphQLString, GraphQLID, GraphQLObjectType, GraphQLInputObjectType } from 'graphql';
import { Users } from "../../entities/Users"; 
import { userType } from "../typeDefs/User";
import bcrypt from 'bcryptjs';
import { MessageType } from '../typeDefs/Message';

export const CREATE_USER = {
    type:userType,
    args:{
        name:{type:GraphQLString},
        username:{type:GraphQLString},
        password:{type:GraphQLString},
    },
    async resolve(_:any,args:any){
        const { name,username,password } = args;
        const encrpytPassword = await bcrypt.hashSync(password,10);
        const resultado = await Users.insert({
            name,
            username,
            password:encrpytPassword
        })
        return {...args,id:resultado.identifiers[0].id,password:encrpytPassword}
    }
}

export const DELETE_USER = {
    type:GraphQLBoolean,
    args:{
        id:{type:GraphQLID}
    },
    async resolve(_:any,{id}:any){
        const result = await Users.delete(id);
        if(result.affected===1){
            return true;
        }
        
        return false;
    }
}

export const UPDATE_USER = {
    type:MessageType,
    args:{
        id:{type:GraphQLID},
        input:{
            type:new GraphQLInputObjectType({
                name:"userInput",
                fields:{
                    username:{type:GraphQLString},
                    name:{type:GraphQLString},
                    password:{type:GraphQLString},
                    newPassword:{type:GraphQLString}
                }
            })
        }
    },
    async resolve(_:any,{id,input}:any){

        const userFound = await Users.findOne({where:{id}});
        if(!userFound){
            return {
                success:false,
                msg:"Usuario no encontrado"
            }
        }
        const newPassHash = await bcrypt.hashSync(input.newPassword,10);
        const isMatch = await bcrypt.compareSync(input.password,userFound!.password);
        const response = await Users.update({id},{username:input.username,name:input.name,password:newPassHash});
        
        if(response.affected === 0){
            return false;
        }
        return{
            success:true,
            msg:"Usuario actualizado"
        }

        return false;
    }
}