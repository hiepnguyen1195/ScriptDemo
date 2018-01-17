class Transcriptor {        
    toRna(nucleotides: string){
        let mapRna: {[key: string]: string} = {
            "G": "C",
            "C": "G",
            "T": "A",
            "A": "U"
        }
        let dna: string[] = ['A', 'C', 'G', 'T'];

        let nucleo: string[] = nucleotides.split('');

        //check dna
        for (let nu of nucleo){
            if(dna.indexOf(nu) < 0){
                throw new Error('Invalid input DNA.');
            }
        }
        
        //transcription dna
        let rna = nucleo.map(nucleo => {
            return mapRna[nucleo];
        }).join('');
        
        return rna;
    }
}
export default Transcriptor