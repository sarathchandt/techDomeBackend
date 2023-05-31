import { verifyTocken } from "./jwtMiddle.js"

export async function chechAuth(req, res, next) {
            
    try {
        const token = req?.headers?.authorization?.split(' ')[1]
        if(token == "null"){
            res.status(401).json({isAuthenticated : false})
        }else{
            let tockenStatus = await verifyTocken(token)
            if(tockenStatus != false){
                res.locals.userId = tockenStatus;
                next()
            }else{
                res.status(401).json({isAuthenticated : false})
            }
        }
       
    } catch (error) {
        res.status(401).json({isAuthenticated : false})
    }

}