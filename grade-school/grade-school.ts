class GradeSchool{
    map = new Map<number, Set<string>>();

    // thêm học sinh
    addStudent(name: string, grade: number){
        let student = this.map.get(grade) || new Set<string>(); // nếu chưa có lớp: tạo set mới lưu giá trị tên
        student.add(name); // thêm phần tử vào Set tên
        this.map.set(grade,student); 
    }

    studentRoster(): Map<string,string[]>{
        let list = new Map<string, string[]>();
        let mapAsc = new Map([...this.map.entries()].sort()); // sắp xếp key map
        for (let entry of mapAsc.entries()){ // lấy danh sách key - value
            list.set(String(entry[0]),[... entry[1]].sort()) // chuyển Set tên sang array và sắp xếp
        }
        return list;
    }

    studentsInGrade(grade: number){
        for (let entry of this.map.entries()){ // lấy danh sách lớp - học sinh
            if(entry[0] === grade){ // kiểm tra lớp có bằng giá trị truyền vào
                return [... entry[1]].sort(); // trả về danh sách học của lớp được sắp xếp
            }
        }
        return [];
    }
}
export default GradeSchool