export default class PhoneNumber{
    phone: string;
    constructor(phone: string){
        this.phone = phone;
    }
    number(): string|undefined{
        let number: string | undefined;
        let checkPhone = this.phone.match(/[A-Za-z]|[?!:@]/g); // tra ve mang la cac chu cai hoac ki tu
        let getPhone = this.phone.match(/[0-9]/g); // tra ve 1 mang la cac so
        if(checkPhone) { return; } 
        if(getPhone && getPhone.length === 10) {
            number = getPhone.join(''); // chuyen mang thanh chuoi
        }
        if(getPhone &&  getPhone.length === 11 && getPhone[0] == '1') {
            getPhone.shift(); // bo phan tu dau tien
            number = getPhone.join('');
        }
        return number;
    }
}