
export let mysql_error = (error)=>{

    switch(error){
        case "ER_DUP_ENTRY" : return "same data already exists"
        case "ER_NO_REFERENCED_ROW" : return "Referenced row not found error: The referenced row does not exist."
        case "ER_BAD_DB_ERROR" : return "There is some error in the database"
        case "ER_DATA_TOO_LONG" : return "Data is too long for this operation" 
        default : return "An unknown error occurred"
    }

}