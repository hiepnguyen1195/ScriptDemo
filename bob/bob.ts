class Bob{
    hey(message: string): string{
        // if you address him without actually saying anything.
        if(message.trim() === ''){
            return "Fine. Be that way!";
        }
        // if you yell at him
        if(message === message.toUpperCase() && message.match(/[A-Z]/g)) {
            return "Whoa, chill out!";
        }
        // if you ask him a question
        if(message.endsWith('?')) {
            return "Sure.";
        }
        // anything else.
        return "Whatever.";
    }
}
export default Bob