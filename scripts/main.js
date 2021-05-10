const preloader = document.querySelector('#preloader');
const BASE_URL = 'https://api.alquran.cloud/v1/ayah';
const ayatArabic = document.querySelector('#ayat-arabic');
const ayatEnglish = document.querySelector('#ayat-english');
const ayatReference = document.querySelector('#ayat-reference');
const refreshBtn = document.querySelector('#refresh-ayat');

// Remove Preloader
window.addEventListener('load', function () {
    preloader.style.display = 'none';
});

// Get Ayat From API
const getAyat = async (url, ayatNumber, language) => {
    let response = await fetch(`${url}/${ayatNumber}/${language}`);
    return await response.json();
};

// Refresh Ayat on Button Click
const refreshAyat = () => {
    refreshBtn.addEventListener('click', function () {
        ayatArabic.innerHTML = '';
        ayatEnglish.innerHTML = '';
        ayatReference.innerHTML = '';
        showAyat();
    });
};

// Show Ayat in Browser
const showAyat = async () => {
    // 0 - 6236
    const randomNumber = Math.floor(Math.random() * 6237);
    const randomAyatNumber =
        randomNumber === 0 ? randomNumber + 1 : randomNumber;

    const ayatAr = await getAyat(BASE_URL, randomAyatNumber, 'ar');
    const ayatEn = await getAyat(BASE_URL, randomAyatNumber, 'en.asad');

    ayatArabic.innerHTML += ayatAr.data.text;
    ayatEnglish.innerHTML += ayatEn.data.text;
    ayatReference.innerHTML += `${ayatAr.data.surah.englishName}: ${ayatAr.data.numberInSurah}`;
};

window.addEventListener('DOMContentLoaded', function () {
    refreshAyat();
    showAyat();
});
