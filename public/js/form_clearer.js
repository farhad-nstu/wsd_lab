function clear_form_alerts(jquery_form) {
    jquery_form.find('.ajax-form-alert-container').empty();
    // jquery_form.find('.alert').parent().empty();
    jquery_form.find('.is-invalid').removeClass('is-invalid');
    jquery_form.find('.invalid-feedback').empty();
    jquery_form.find('.other-invalid-feedback').empty();
    jquery_form.find('.text-danger').empty();
    jquery_form.find('.form-text').removeClass('d-none');
}

function clear_form(jquery_form) {
    clear_form_alerts(jquery_form);
    form_elements = jquery_form[0].elements;
    // console.log(form_elements.length);
    [...form_elements].forEach(form_element => {
        // console.log(form_element.type);
        // if (form_element.id) {
        if (form_element.name) {
            switch (form_element.type) {
                case "text":
                case "password":
                case "textarea":
                case "date":
                case "select-one":
                case "select-multiple":
                case "file":
                    // $('#' + form_element.id).val('').trigger('change');
                    jquery_form.find("[name='" + form_element.name + "']").val('').trigger('change');
                    break;

                case "radio":
                case "checkbox":
                    // $('#' + form_element.id).prop('checked', false).trigger('change');
                    jquery_form.find("[name='" + form_element.name + "']").prop('checked', false).trigger('change');
                    break;

                default:
                    break;
            }
        }
    });
}

function clear_all_alerts() {
    $('.ajax-form-alert-container').empty();
    // $('.alert').parent().empty();
    $('.is-invalid').removeClass('is-invalid');
    $('.invalid-feedback').empty();
    $('.text-danger').empty();
    $('.form-text').removeClass('d-none');
}
