const get_data_by_id = debounce((event) => get_propodal_data(event), 1);

function ucwords(str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
        return $1.toUpperCase();
    });
}

async function get_propodal_data(event) {
    const proposer_age=$("#proposers_age").val();
    if(proposer_age<18||proposer_age>70){
        $("#birth_date").val("").trigger("change")
        $("#proposers_age").val("")
        Swal.fire('Age is invalid!', '', 'error')
        return 0;
    }
    var identity_no = document.querySelector('#identity_no').value;
    var birth_date = document.querySelector('#birth_date').value;
    if (birth_date) {
        $('#cover-spin').show();
        const data = await callApi(identity_no, birth_date);
        $('#cover-spin').hide();
        if (data.status == true) {
            document.querySelector('#nid_verified').classList.remove('inactive');
            document.querySelector('#verify').classList.add('inactive');

            document.querySelector('#full_name').value = data.data.full_name;
            document.querySelector('#applicant_name').value = data.data.full_name;
            data.data.nationality ? (document.querySelector('#nationality').value = data.data.nationality) : '';
            data.data.father_name ? (document.querySelector('#father_name').value = data.data.father_name) : '';
            data.data.mother_name ? (document.querySelector('#mother_name').value = data.data.mother_name) : '';
            data.data.spouse_name ? (document.querySelector('#spouse_name').value = data.data.spouse_name) : '';
            $("#spouse_dob").val(data.data.spouse_dob).trigger('change');
            $("#spouse_sex").val(data.data.spouse_sex).trigger('change');
            document.querySelector('#contact_no').value = data.data.contact_no;
            document.querySelector('#email').value = data.data.email;
            data.data.sex ? $("#sex").val(ucwords(data.data.sex)).trigger('change') : '';
            $("#marital_status").val(data.data.marital_status).trigger('change');
            $("#education").val(data.data.education).trigger('change');
            document.querySelector('#birth_place').value = data.data.birth_place;
            $("#religion").val(data.data.religion).trigger('change');
            $("#permanent_post_code").val(data.data.permanent_post_code).trigger('change');
            document.querySelector('#permanent_address').value = data.data.permanent_address
            $("#present_post_code").val(data.data.present_post_code).trigger('change');
            document.querySelector('#present_address').value = data.data.present_address
            document.querySelector('#other_occupation').value = data.data.other_occupation
            $("#occupation").val(data.data.occupation).trigger('change');
            $("#photo_path_output").attr("src", data.data.photo_path);
            document.querySelector('#monthly_income').value = data.data.monthly_income;
            document.querySelector('#income_source').value = data.data.income_source;
            document.querySelector('#income_verify_method').value = data.data.income_verify_method;
            document.querySelector('#monthly_expense').value = data.data.monthly_expense;
            document.querySelector('#other_annual_expense').value = data.data.other_annual_expense;
            document.querySelector('#height').value = data.data.height;
            document.querySelector('#weight').value = data.data.weight;
            document.querySelector('#account_name').value = data.data.full_name;
            $("#bank_name").val(data.data.bank_name).trigger('change');
            document.querySelector('#branch_name').value = data.data.branch_name;
            $("#account_type").val(data.data.account_type).trigger('change');
            document.querySelector('#account_no').value = data.data.account_no;
            document.querySelector('#routing_no').value = data.data.routing_no;
        } else {
            error(data.message)
        }
    }
}


const callApi = async (identity_no, birth_date) => {
    const result = await axios.get('/get-proposal-data', {
        params: {
            identity_no: identity_no,
            birth_date: birth_date
        }
    }).then((response) => {
        var result = response.data;
        return result;
    });

    return result;
}