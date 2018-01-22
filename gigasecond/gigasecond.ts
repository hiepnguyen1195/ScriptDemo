class Gigasecond{
    _date: Date = new Date();
    constructor(_date: Date){
        this._date = _date;
    }
    date(): Date{
        let second = this._date.getTime(); // chuyen ngay thanh giay
        let secondNew = second + 1000000000 * 1000; // cong them gigasecond
        let day = new Date(secondNew); 
        return day;
    }
}
export default Gigasecond