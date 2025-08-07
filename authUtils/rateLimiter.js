

class rateLimiter{
    #limit;
    #windown;
    #memoryMap;
    constructor(windown = 60 * 1000, limit = 3){
        this.#limit = limit;
        this.#windown = windown;
        this.#memoryMap = new Map();
    }
    
    attempt = (req, res, next) =>{
        try{
            const ip = req.ip;
            const now = Date.now();
            
            let timestamps = this.#memoryMap.get(ip) || [];
            let availableTimestamps = timestamps.filter( ts => ts > now);
            if(availableTimestamps.length >= this.#limit ) return res.status(400).json({error: "too many request"});
            availableTimestamps.push(now + this.#windown);
            this.#memoryMap.set(ip, availableTimestamps);
             next();
        }catch(error){
            console.log("ratelimit error, ", error)
            return res.status(400).json({error: "plz try later"});
        }
    }
    clean(){
        this.#memoryMap.clear();
    }
}

module.exports = rateLimiter;