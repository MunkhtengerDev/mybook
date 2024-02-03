function Validation(values) {
    let error ={}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,20}$/
    
    if(values.email === ""){
        error.email = "Name is required"
    
    }else if(!email_pattern.test(values.email)){
        error.email = "This email doesn't exist"
    }else{
        error.email = ""
    }
    
    
    if(values.password === ""){
        error.password = "Password is required"
    }else if(!password_pattern.test(values.password)){
        error.password = "Your password is wrong"
    }else{
        error.password = ""
    }
    return error
}

export default Validation
