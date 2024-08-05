class ExpressErrors extends Error {
    constructor(msg, status) {
        super()
        this.msg = msg
        this.status = status 
        // putting a little reminder that this revres to the class instance - used when i create an instance with a name variable
    }

}


module.exports = ExpressErrors