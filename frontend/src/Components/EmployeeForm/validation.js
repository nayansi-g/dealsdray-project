export const validateName = (value, fn)=>{
    console.log(value, "NAME from validation")
    if(value === ""){
        fn && fn(false, "Name can't be empty!");
        return false;
    }else if(/\d/.test(value)) {
       fn && fn( false,"Name can't contain a number");
       return false;
    }else {
       fn && fn(true);
       console.log("Correct Name");
       return true;
    }
}

export const validatEmail = (value, fn)=>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(value ===""){
        fn && fn( false, "Email can't be empty");
        return false;
    }else if(!emailRegex.test(value)){
        fn && fn(false ,"Not a valid email");
        return false;
    }else{
        fn && fn(true);
        console.log("Correct Email");
        return true;
    }
};

export const validateMobile = (value, fn)=>{
    const mobileNumberRegex = /^[0-9]{7,14}$/;
    if(value == ""){
        fn && fn(false, "Number can't be empty");
        return false;
    }else if(!mobileNumberRegex.test(value)){
        fn && fn(false, "Invalid Number");
        return false;
    }else{
        fn && fn(true);
        console.log("Correct Mobile");
        return true;
    }
};

export const validateDesignation = (value, fn)=>{
    if(value===""){
        console.log("ERROR IN DESIGNATION")
        fn && fn("Select a Designation.");
        return false;
    }else{
        console.log("Correct Designation");
        return true;
    }
}

export const validateGender = (value, fn)=>{
    if(value===""){
        console.log("ERROR IN GENDER")
        fn && fn("Select a gender.");
        return false;
    }else{
        console.log("Correct Gender");
        return true;
    }
}


export const courseValidator = (value, fn)=>{
    if(value === ""){
        console.log("ERROR IN COURSE")
        fn && fn("Select a course");
        return false;
    }else{
        console.log("Correct Course");
        return true;
    }
}