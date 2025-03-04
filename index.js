const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fungsi tampilkan data
const bacaData = () => {
    fs.readFile("data.json", "utf-8", (err, data) => {
        if (err) {
            console.log("Mana filenya boi", err);
            rl.close();
            return;
        }
        
        const database = JSON.parse(data);
        console.log("\n\t+~~~~~~~~~~~~~~~~~~~~+")
        console.log("\t|    Daftar Anime    |");
        console.log("\t+~~~~~~~~~~~~~~~~~~~~+")
        database.anime.forEach((anime, index) => {
            console.log(`${index + 1}. ${anime.Judul}`);
        });
        
        console.log(`${database.anime.length + 1}. Tampilkan semua anime`);
        
        const lihatDetail = () => {
            rl.question("Tampilkan detail Anime: ", (nomor) => {
                let index = parseInt(nomor) - 1;
                
                if (index >= 0 && index < database.anime.length) {
                    let viewAnime = database.anime[index];
                    console.log("\n=== Detail Anime ===");
                    console.log(`Judul  : ${viewAnime.Judul}`);
                    console.log(`Genre  : ${viewAnime.Genre}`);
                    console.log(`Tahun  : ${viewAnime.Tahun}`);
                    console.log(`Studio : ${viewAnime.Studio}`);
                    console.log(`Score  : ${viewAnime.Score}\n`);
                } else if (index === database.anime.length) {
                    console.log("\n=== Semua Anime ===");
                    database.anime.forEach((anime, idx) => {
                        console.log(`\n${idx + 1}. ${anime.Judul}`);
                        console.log(`Genre  : ${anime.Genre}`);
                        console.log(`Tahun  : ${anime.Tahun}`);
                        console.log(`Studio : ${anime.Studio}`);
                        console.log(`Score  : ${anime.Score}`);
                    });
                } else {
                    console.log("Nomor tidak valid.");
                }
                rl.close();
            });
        };
        lihatDetail();
    });
};

// Fungsi tambah data
const tambahData = () => {
    rl.question ("Masukkan Judul Anime: ", (judul) => {
        rl.question ("Masukkan Genre: ", (genre) => {
            rl.question ("Masukkan Tahun: ", (tahun) => {
                rl. question ("Masukkan Studio: ", (studio) => {
                    rl. question ("Masukkan Score: ", (score) => {
                        fs.readFile("file.json", "utf8", (err, data) => {
                            if (err) {
                            console.error("Gagal membaca file:", err);
                            rl.close();
                            return;
                            }
                            // pake let biar bisa ganti seluruh value dalam objek
                            let database = JSON.parse(data);
                            const newAnime = { Judul: judul, Genre: genre, Tahun: tahun, Studio: studio, Score: score };
                            database.anime.push(newAnime);

                            fs.writeFile("file.json", JSON.stringify(database, null, 4), (err) => {
                                if (err) {
                                    console.error("Gagal menambahkan anime:", err);
                                } else {
                                    console.log("Anime berhasil ditambahkan!");
                                }
                                rl.close();
                            });
                        });
                    });
                });
            });
        });
    });
};


// Fungsi update data
const updateData = () => {

}


// Fungsi Hapus data
const hapusData = () => {
    fs.readFile("data.json", "utf-8", (err, data) => {
        if (err) {
            console.error("Gagal membaca file:", err);
            rl.close();
            return;
        }

        let database = JSON.parse(data);
        console.log("\n\t+~~~~~~~~~~~~~~~~~~~+")
        console.log("\t|    Hapus Anime    |");
        console.log("\t+~~~~~~~~~~~~~~~~~~~+")
        database.anime.forEach((anime, index) => {
            console.log(`${index + 1}. ${anime.Judul} (${anime.Tahun}) - ${anime.Genre} [${anime.Studio}]`);
        });

        rl.question("Masukkan nomor anime yang ingin dihapus: ", (nomor) => {
            let index = parseInt(nomor) - 1; // Konversi input ke index (karena array mulai dari 0)
        
            if (index >= 0 && index < database.anime.length) {
                let deletedAnime = database.anime.splice(index, 1); // Hapus anime berdasarkan index
                console.log(`Anime "${deletedAnime[0].Judul}" berhasil dihapus.`);

                // Tulis ulang file JSON tanpa anime yang dihapus
                fs.writeFile("data.json", JSON.stringify(database, null, 4), (err) => {
                    if (err) {
                        console.error("Gagal menyimpan perubahan:", err);
                    }
                    rl.close();
                });
            } else {
                console.log("Nomor tidak valid.");
                rl.close();
            }

        })
    })
}



// menu
const menu = () => {
    
    console.log("Selamat Datang! Silakan Pilih Nomor Menu:");
    console.log("1. Lihat Daftar Anime"); // done
    console.log("2. Tambah Anime"); // done
    console.log("3. Update Anime"); // done
    console.log("4. Hapus Anime");  // done
    console.log("5. Keluar")

    rl.question("Masukkan nomor: ", (nomor) => {
        if(nomor === "1"){
            bacaData();
        } else if (nomor === "2") {
            tambahData();
        } else if (nomor === "3") {
            updateData();
        } else if (nomor === "4") {
            hapusData();
        } else if (nomor === "5") {
            console.log("Terima kasih telah mengunjungi MyAnimeList!")
            rl.close();
        } else {
            console.log("Masukkan pilihan yang valid!\n")
            menu();
        };
    });
};

console.log("\t+~~~~~~~~~~~~~~~~~~+");
console.log("\t|    MyAnimeList   |");
console.log("\t+~~~~~~~~~~~~~~~~~~+");
menu();