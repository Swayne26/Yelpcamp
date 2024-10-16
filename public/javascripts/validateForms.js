document.addEventListener('DOMContentLoaded', function () {
    'use strict'

    // Initialize bsCustomFileInput
    bsCustomFileInput.init()

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.validated-form')

    // Loop over them and prevent submission if invalid
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }
                form.classList.add('was-validated')
            }, false)
        })
});