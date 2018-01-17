"use strict";
exports.__esModule = true;
var Transcriptor = /** @class */ (function () {
    function Transcriptor() {
    }
    Transcriptor.prototype.toRna = function (nucleotides) {
        var mapRna = {
            "G": "C",
            "C": "G",
            "T": "A",
            "A": "U"
        };
        var nucleotide = nucleotides.split('');
        var dna = nucleotide.map(function (nucleotide) {
            return mapRna[nucleotide];
        });
        var dnaStr = dna.join();
        return dna;
    };
    return Transcriptor;
}());
exports["default"] = Transcriptor;
