const times = {
    onEarth: 1,
    onMercury: 0.2408467,
    onVenus: 0.61519726,
    onMars: 1.8808158,
    onJupiter: 11.862615,
    onSaturn: 29.447498,
    onUranus: 84.016846,
    onNeptune: 164.79132,
}
class SpaceAge{
    seconds: number;
    constructor(seconds: number){
        this.seconds = seconds;
    }
    
    result(space: number): number{
        let re = ((this.seconds/31557600)/space).toFixed(2);
        return parseFloat(re);
    }
    onEarth() :number{
        let year = this.result(times.onEarth);
        console.log(year);
        return year;
    }
    onMercury():number{
        let year = this.result(times.onMercury);
        console.log(year);
        return year;
    }
    onVenus():number{
        return this.result(times.onVenus);
    }
    onMars():number{
        return this.result(times.onMars);
    }
    onJupiter():number{
        return this.result(times.onJupiter);
    }
    onSaturn():number{
        return this.result(times.onSaturn);
    }
    onUranus():number{
        return this.result(times.onUranus);
    }
    onNeptune():number{
        return this.result(times.onNeptune);
    }

}
export default SpaceAge