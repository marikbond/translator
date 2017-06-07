function translateText() {
    var xhr = new XMLHttpRequest();
    var textArea = document.getElementById('text-to-translate');
    var translationWords = textArea.value;
    xhr.open('POST', 'http://localhost:8083/', true);
    xhr.setRequestHeader("Words", translationWords);
    xhr.send();
    xhr.onreadystatechange = function () {
        if(xhr.status === 200) {
            changeTranslationData(xhr.responseText);
        } else {
            changeTranslationData("OOPS. SOMETHING WENT WRONG, TRY AGAIN.");
        }
    };
    changeTranslationData('Wait a second...');
    function changeTranslationData(data) {
        document.getElementById('translation').value = data;
    }
}