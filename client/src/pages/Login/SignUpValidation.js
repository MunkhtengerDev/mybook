function Validation(values) {
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/
    


    if(values.name === ""){
        error.name = "Name is required"
    
    }else{
        error.name = ""
    }


    if(values.email === ""){
        error.email = "Email is required"
    
    }else if(!email_pattern.test(values.email)){
        error.email = "Email did not match"
    }else{
        error.email = ""
    }
    
    
    if(values.password === ""){
        error.password = "Password is required"
    }else if(!password_pattern.test(values.password)){
        error.password = "Password must contain at least one character, upper case, lower case and number"
    }else{
        error.password = ""
    }
    return error
}

export default Validation
