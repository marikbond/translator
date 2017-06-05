function request() {
    var xhr = new XMLHttpRequest();
    var form = document.getElementById('text-to-translate');
    var translationData = form.innerHTML;
    xhr.open('GET', translationData, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if(xhr.status !== 200) {
            chageTranslationData(xhr.responseText) // <-- put server respond!
        }

    };
    chageTranslationData('Wait a second...');
    function chageTranslationData(data) {
        var translationForm = document.getElementById('translation');
        return translationForm.replace('{{translation}}', data || '')
    }
}