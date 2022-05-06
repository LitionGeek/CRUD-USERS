import { GraphQLID, GraphQLList } from "graphql";
import { Users } from "../../entities/Users"
import { userType } from "../typeDefs/User";

export const GET_ALL_USERS ={
    type:new GraphQLList(userType),
    async resolve(){
        return await Users.find();
    }
}

export const GET_USER = {
    type:userType,
    args:{
        id:{type:GraphQLID},
    },
  
    async resolve(_:any,args:any){
        console.log("HGola")
        const id = 1;
        return await Users.findOne({where:{id:args.id}}); 
    }
}