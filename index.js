const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


// menu
console.log("Selamat Datang di MyAnimeList");
console.log("Pilih Menu:");
console.log("1. Lihat Daftar Anime"); // almost
console.log("2. Tambah Anime"); // done
console.log("3. Update Anime"); // not yet
console.log("4. Hapus Anime");  // done
console.log("5. Keluar")

rl.question("Masukkan nomor: ", (nomor) => {
    if(nomor === "1"){
        //fungsi2();
    } else if (nomor === "2") {
        //fungsi2();
    } else if (nomor === "3") {
        //fungsi2();
    } else if (nomor === "4") {
        //fungsi2();
    } else if (nomor === "5") {
        console.log("Terima kasih telah mengunjungi MyAnimeList!")
        rl.close();
    } else {
        console.log("Masukkan pilihan yang valid!\n")
    };
});
