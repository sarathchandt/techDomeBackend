import fs from "fs";


export const deleteFile = (filePath) => {
    try {
        fs.unlink(filePath, (err) => {
            if (err) {
                
                return false
            }
            return true
        })
    } catch (error) {
        return false
    }
 
}