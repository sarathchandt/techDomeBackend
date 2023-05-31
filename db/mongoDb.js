import mongoose from "mongoose";
// mongoDb configuration
export default {
    connect : ()=>{
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.DB).then(()=>{
            console.log("!!CONNECTED!!");
        }).catch(err=>{
            console.log(err,"!!ERROR!!");
        })
    }
}