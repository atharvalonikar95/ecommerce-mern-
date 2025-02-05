import bcrypt from 'bcrypt'

export const hashPassword=(password)=>{

    try{
        const hashedPassword = bcrypt.hash(password,10)
        return hashedPassword
    }catch(err){
        console.log(err);
    }

}

export const comparePassword= async ( password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}