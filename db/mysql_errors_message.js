
export let mysql_error = (error)=>{

    switch(error){
        case "ER_DUP_ENTRY" : return "user already exists"
        case "ER_NO_REFERENCED_ROW" : return "Referenced row not found error: The referenced row does not exist."
        case "ER_BAD_DB_ERROR" : return "There is some error in the database"
        default : return "An unknown error occurred"
    }

}