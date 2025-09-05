import mongoose from 'mongoose'
import { type } from 'os';
const uri = 'mongodb://127.0.0.1/Idea_Rater'

mongoose.connect(uri);
// Creating a Schema for database-: 
const userSchema = new mongoose.Schema({
    author_name : {type : String , required : true},
   idea_description : {type : String , required : true},
   user_sentiment : String,
   submission_timestamp : {type : Date , default : Date.now},
}
)

// Creating and exporting a model (table)

export const table1 = mongoose.model('ideas',userSchema);

