const alphabet = "abcdefghijklmnopqrstuvwxyz";
class Pangram {
    pan: string;
    constructor(panInput: string){
        this.pan = panInput;
    }
    
    public isPangram = (): boolean => {

        let chartArr: string[] = alphabet.split('');

        let panLower = this.pan.toLowerCase(); // chuyen ve chu thuong

        function isIncludes(letter: any) {
        
            let panArr = Array.from(panLower); // tach chuoi thanh mang

            return panArr.includes(letter); // tra ve true neu co phan tu trong mang
        }
        
        let check = chartArr.every(isIncludes);// kiem tra tat ca phan tu trong mang co thoa man function cung cap

        return check;
    }
}
export default Pangram