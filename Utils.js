// Simulation of ML function for demonstration of API.

export async function MLfunction(userText){
    let key = Math.random();
    if(userText){ // Checking if text is a valid string.
        if(key<0.33){
            return "Positive";
        }
        else if(key>=0.33 && key <= 0.66){
            return "Neutral";
        }
        else{
            return "Negative";
        }
    }
    return undefined;
}

