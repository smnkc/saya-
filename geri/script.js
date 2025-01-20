document.addEventListener("DOMContentLoaded", function() {
    // Tarih ve saat elementini seç
    const clock = document.getElementById("clock");
    const countdown = document.getElementById("countdown");
    let timerIntervalClock;
    let timerIntervalCountdown;

    // Tarih ve saati güncelleyen fonksiyon
    function updateClock() {
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        // Gün, ay, yıl ve saat dakika saniye formatında ekrana yazdır
        clock.textContent = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    // Tarih ve saati güncelleyin
    updateClock();

    // Tarih ve saat ayar düğmesini seç
    const setDateBtn = document.getElementById("setDateBtn");

    // Tarih ve saati ayarlamak için fonksiyon
    setDateBtn.addEventListener("click", function() {
        const newDate = prompt("Yeni tarihi ve saati girin (GG/AA/YYYY SAAT:DAKİKA:SANİYE)");

        // Girilen tarihi ve saati ayrıştır
        const parts = newDate.split(/[ /:]/);
        const newDay = parseInt(parts[0]);
        const newMonth = parseInt(parts[1]) - 1;
        const newYear = parseInt(parts[2]);
        const newHour = parseInt(parts[3]);
        const newMinute = parseInt(parts[4]);
        const newSecond = parseInt(parts[5]);

        // Yeni tarihi ve saati oluştur
        const targetDate = new Date(newYear, newMonth, newDay, newHour, newMinute, newSecond);

        // Süreyi güncelleyen fonksiyon
        function updateCountdown() {
            const timeDiff = targetDate - new Date();

            // Kalan süreyi hesapla
            const remainingDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const remainingHours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const remainingMinutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const remainingSeconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            // Kalan süreyi ekrana yazdır
            countdown.textContent = `Kalan Süre: ${remainingDays} gün, ${remainingHours} saat, ${remainingMinutes} dakika, ${remainingSeconds} saniye`;
            
            // Süre bittiğinde clearInterval ile sayaç işlemi durdurulur
            if (timeDiff <= 0) {
                clearInterval(timerIntervalCountdown);
                countdown.textContent = "Süre Doldu!";
            }
        }

        // İlk çalıştırma
        updateCountdown();

        // Her saniyede bir sayaç güncellenir
        timerIntervalCountdown = setInterval(updateCountdown, 1000);
    });

    // Güncel saat her saniyede bir güncellenir
    timerIntervalClock = setInterval(updateClock, 1000);
});