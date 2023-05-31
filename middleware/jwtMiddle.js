import jwt from "jsonwebtoken"



export const createJwt = (details) => {
    try {
        
        return  jwt.sign(details, process.env.JWT, { expiresIn: '60d'  });
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const verifyTocken=(token)=>{
    try {
        return jwt.verify(token, process.env.JWT, (err, data)=>{
            if(err){
                return  false
            }else{
                return data;
            }
            })
    } catch (error) {
        return false
    }
 
}