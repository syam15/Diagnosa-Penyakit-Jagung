document.addEventListener('DOMContentLoaded', () => {
    // --- BASIS PENGETAHUAN (TIDAK BERUBAH) ---
    const dataPenyakit = {
        "P01": { nama: "Penyakit Bulai", solusi: "Gunakan fungisida sistemik, cabut dan bakar tanaman yang terinfeksi parah, serta lakukan rotasi tanaman." },
        "P02": { nama: "Karat Daun", solusi: "Gunakan varietas tahan karat, semprot dengan fungisida yang sesuai, dan jaga kebersihan lahan dari gulma." },
        "P03": { nama: "Hawar Daun", solusi: "Atur jarak tanam agar tidak terlalu rapat, gunakan fungisida kontak atau sistemik, dan lakukan sanitasi lahan." },
        "P04": { nama: "Bercak Daun", solusi: "Lakukan sanitasi lingkungan, rotasi tanaman, dan gunakan fungisida jika serangan parah." },
        "P05": { nama: "Busuk Batang Jagung", solusi: "Perbaiki drainase lahan, gunakan varietas tahan, dan lakukan rotasi tanaman dengan tanaman bukan inang." },
        "P06": { nama: "Busuk Pelepah", solusi: "Jaga kebersihan lahan, hindari pemupukan Nitrogen berlebih, dan gunakan fungisida pada pelepah daun." },
        "P07": { nama: "Busuk Arang", solusi: "Hindari stres kekeringan pada tanaman, jaga populasi tanam agar tidak terlalu padat, dan rotasi tanaman." },
        "P08": { nama: "Penyakit Gosong", solusi: "Musnahkan bagian tanaman yang terinfeksi sebelum spora menyebar dan hindari melukai tanaman." },
        "P09": { nama: "Busuk Tongkol Diplodia", solusi: "Lakukan rotasi tanaman dan pemupukan berimbang. Jangan biarkan tongkol terlalu lama mengering di lapangan." },
        "P10": { nama: "Virus Mosaik Kerdil Jagung", solusi: "Cabut dan musnahkan tanaman yang terinfeksi. Kendalikan serangga vektor (kutu daun/aphid) dengan insektisida." },
        "P11": { nama: "Gudikan (Busuk Tongkol Gibberella/Fusarium)", solusi: "Lakukan rotasi tanaman dan kontrol hama penggerek tongkol untuk mengurangi luka pada tongkol." }
    };
    const dataGejala = { "G01": "Warna putih seperti tepung pada permukaan atas maupun bagian bawah daun", "G02": "Terdapat garis-garis berwarna putih sampai kekuningan pada permukaan daun", "G03": "Daun-daun menggulung serta terputir", "G04": "Tanaman jagung kerdil", "G05": "Ukuran tongkol kecil", "G06": "Permukaan daun atas dan bawah terdapat bercak kecil, bulat sampai oval", "G07": "Bercak berwarna coklat kemerahan pada daun", "G08": "Terdapat bisul pada daun", "G09": "Daun menjadi mongering", "G10": "Daun berbecak berwarna hijau keabu-abuan berwarna coklat", "G11": "Bercak memanjang dan berbentuk elips", "G12": "Tanaman cepat mati dan mengering", "G13": "Bercak berbentuk kumparan memanjang dan teratur", "G14": "Biji jagung rusak/busuk", "G15": "Tongkol jagung gugur", "G16": "Tanaman jagung tampak layu atau mati", "G17": "Bagian batang busuk", "G18": "Tanaman mudah rebah", "G19": "Pangkal batang yang terinfeksi berwarna merah jambu sampai kemerahan", "G20": "Isi batang terbelah-belah berongga", "G21": "Daun berwarna hijau keabu-abuan", "G22": "Bercak berwarna agak kemerahan atau abu-abu pada pelepah daun", "G23": "Bercak berkembang dan terpisah-pisah seperti gejala panu", "G24": "Terdapat bercak coklat dan kelayuan pada akar", "G25": "Buku-buku batang bawah membelah", "G26": "Bagian dalam batang terutama serabut berwarna hitam", "G27": "Pembengkakan pada biji-biji tongkol", "G28": "Bengkakan biji-biji tongkol ditutupi jaringan kehijauan, putih perak dan berkilau", "G29": "Bagian dalam bengkak biji tongkol berwarna gelap", "G30": "Pangkal kelobot tongkol yang terinfeksi tempat memucat", "G31": "Kelobot yang terinfeksi berwarna coklat", "G32": "Biji berubah menjadi menjadi coklat, kisut, dan busuk", "G33": "Pangkal biji terlihat jamur putih", "G34": "Tanaman tampak lebih kekuningan", "G35": "Tanaman jagung kerdil", "G36": "Ukuran tongkol kecil", "G37": "Tanaman jagung tampak layu dan mati", "G38": "Daun berwarna mosaik dan hijau dengan disilingi garis-garis kuning", "G39": "Permukaan daun atas dan bawah terdapat bercak kecil, bulat sampai oval", "G40": "Bercak berwarna coklat kemerahan pada daun" };
    const aturan = [ { gejala: ["G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G15", "G16", "G17", "G26", "G27", "G40"], penyakit: "P01" }, { gejala: ["G02", "G04", "G05", "G06", "G07", "G08", "G11", "G12", "G13", "G15", "G16", "G17", "G18", "G26", "G27", "G28", "G40"], penyakit: "P02" }, { gejala: ["G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G11", "G12", "G13", "G14", "G15", "G16", "G17", "G18", "G20", "G21", "G22", "G23", "G24", "G25", "G26", "G27", "G40"], penyakit: "P03" }, { gejala: ["G02", "G03", "G04", "G05", "G06", "G07", "G09", "G11", "G13", "G14", "G16", "G17", "G18", "G20", "G21", "G22", "G23", "G24", "G25", "G26", "G28", "G40"], penyakit: "P04" }, { gejala: ["G04", "G05", "G09", "G12", "G16", "G17", "G18", "G20", "G24", "G25", "G28"], penyakit: "P05" }, { gejala: ["G05", "G06", "G07", "G12", "G14", "G15", "G16", "G17", "G18", "G21", "G22", "G23", "G24", "G25", "G26", "G28", "G40"], penyakit: "P06" }, { gejala: ["G04", "G05", "G06", "G07", "G08", "G09", "G10", "G12", "G14", "G16", "G17", "G18", "G19", "G20", "G21", "G22", "G25", "G26", "G28", "G40"], penyakit: "P07" }, { gejala: ["G04", "G05", "G12", "G14", "G15", "G16", "G19", "G20", "G28", "G29", "G40"], penyakit: "P08" }, { gejala: ["G30", "G31", "G32", "G33"], penyakit: "P09" }, { gejala: ["G34", "G35", "G38"], penyakit: "P10" }, { gejala: ["G14", "G19", "G36"], penyakit: "P11" } ];

    // --- LOGIKA APLIKASI ---
    const formGejala = document.getElementById('formGejala');
    const btnDiagnosa = document.getElementById('btnDiagnosa');
    const divHasil = document.getElementById('hasil');

    function tampilkanGejala() {
        const urutanGejala = Object.keys(dataGejala).sort((a, b) => parseInt(a.substring(1)) - parseInt(b.substring(1)));
        for (const kode of urutanGejala) {
            const div = document.createElement('div');
            div.className = 'gejala-item';
            div.innerHTML = `<input type="checkbox" id="${kode}" value="${kode}"> <label for="${kode}"><b>[${kode}]</b> ${dataGejala[kode]}</label>`;
            formGejala.appendChild(div);
        }
    }

    // FUNGSI DIAGNOSA BARU
    function mulaiDiagnosa() {
        const gejalaTerpilih = Array.from(formGejala.querySelectorAll('input:checked')).map(input => input.value);
        if (gejalaTerpilih.length === 0) {
            alert("Silakan pilih minimal satu gejala.");
            return;
        }

        const hasilDiagnosa = [];
        // 1. Hitung kecocokan untuk setiap aturan
        for (const r of aturan) {
            const gejalaAturan = r.gejala;
            let kecocokan = 0;
            gejalaAturan.forEach(gejala => {
                if (gejalaTerpilih.includes(gejala)) {
                    kecocokan++;
                }
            });

            // Jika ada minimal 1 gejala yang cocok, masukkan ke hasil
            if (kecocokan > 0) {
                const persentase = (kecocokan / gejalaAturan.length) * 100;
                hasilDiagnosa.push({
                    namaPenyakit: dataPenyakit[r.penyakit].nama,
                    solusi: dataPenyakit[r.penyakit].solusi,
                    kecocokan: kecocokan,
                    totalGejalaAturan: gejalaAturan.length,
                    persentase: persentase
                });
            }
        }

        // 2. Urutkan hasil dari persentase tertinggi
        hasilDiagnosa.sort((a, b) => b.persentase - a.persentase);

        // 3. Tampilkan hasil ke layar
        tampilkanHasil(hasilDiagnosa);
    }

    // FUNGSI BARU UNTUK MENAMPILKAN HASIL
    function tampilkanHasil(hasil) {
        // Kosongkan hasil sebelumnya
        divHasil.innerHTML = ''; 

        const title = document.createElement('h3');
        title.textContent = "Hasil Diagnosa";
        divHasil.appendChild(title);

        if (hasil.length === 0) {
            const noResult = document.createElement('p');
            noResult.textContent = 'Tidak ada penyakit yang cocok dengan gejala yang dipilih.';
            divHasil.appendChild(noResult);
        } else {
            // Tampilkan setiap penyakit yang cocok
            hasil.forEach(item => {
                const resultEntry = document.createElement('div');
                resultEntry.className = 'result-entry';
                resultEntry.innerHTML = `
                    <h4>${item.namaPenyakit} (${item.persentase.toFixed(0)}% cocok)</h4>
                    <p class="kecocokan-info">Kecocokan: <b>${item.kecocokan}</b> dari <b>${item.totalGejalaAturan}</b> gejala.</p>
                    <h5>Solusi yang Direkomendasikan:</h5>
                    <p>${item.solusi}</p>
                `;
                divHasil.appendChild(resultEntry);
            });
        }
        divHasil.style.display = 'block';
    }

    tampilkanGejala();
    btnDiagnosa.addEventListener('click', mulaiDiagnosa);
});
