import config from '../config/config.js'
import {Client, Account, ID} from "appwrite"

export class AuthService {
   client = new Client();
   account;

   constructor(){
      this.client
         .setEndpoint(config.appwriteUrl)
         .setProject(config.apwriteProjectId);
      this.account = new Account(this.client);
   }

   //Ye Fail v Ho skta hai
   async createAccount({email, password, name}){
      try {
         const userAccount = await this.account.create(ID.unique(), email, password, name)
         if(userAccount){
            //agr account create ho gya to fir seedha Login Ho jaao
            return this.login({email, password})
         }
         else{
            return userAccount;
         }
      } catch (error) {
         throw error;
      }
   }

   async login({email, password}){
      try {
         return await this.account.createEmailPasswordSession(email, password)
      } catch (error) {
         throw error;
      }
   }
   
   async getCurrentUser(){
      try {
         return await this.account.get()
      } catch (error) {
         console.log("Appwrite Service:: ", error)
      }

      return null;
   }

   async logout(){
      try {
         await this.account.deleteSessions()
      } catch (error) {
         console.log("Issue is Logout")
         throw error
      }
   }

}

const authService = new AuthService()

export default authService;