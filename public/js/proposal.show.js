
async function final_submit() {
    const document_verify_by = document.querySelector("#document_verify_by").checked;
    if(document.querySelector("#producer_report").checked==false){
        window.scrollTo({
            top: 4300,
            behavior: "smooth"
        });
        document.getElementById("producer_confident_report").setAttribute("style","color: red");
    }else{
        if (user_channel_id == channel_id) {
            if (!document_verify_by) {
                document.getElementById("document_verify_by_text").style.color = "red";
                window.scrollTo({
                    top: 3160,
                    behavior: "smooth"
                });
            }else{
                Swal.fire({
                    title: 'Your application for this life insurance proposal is subject to additional health and financial assessment by the insurance company.The insurance company shall inform you within the next 3[Three] working days about the next steps to complete your application.',
                    showDenyButton: false,
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    denyButtonText: `Denied`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        apply(window.proposal_id, 2)
                        Swal.fire('Proposal is submitted!', '', 'success')
                    }
                })
            }
            
        } else {
            if (!document_verify_by && dgh_status != 'No') {
                document.getElementById("document_verify_by_text").style.color = "red";
                window.scrollTo({
                    top: 3160,
                    behavior: "smooth"
                });
            } else {
                if (dgh_status == 'No' || parseInt(sum_assured) > 1000000) {
                    Swal.fire({
                        title: 'Your application for this life insurance proposal is subject to additional health and financial assessment by the insurance company.The insurance company shall inform you within the next 3[Three] working days about the next steps to complete your application.',
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: 'Confirm',
                        denyButtonText: `Denied`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            apply(window.proposal_id, 2)
                        }
                    })
                } else {
                    Swal.fire({
                        title: 'Would you like to submit it?',
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText: 'Yes',
                        denyButtonText: `Denied`,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            apply(window.proposal_id, 11)
                        }
                    })
                }
            }
        }
    }
}
function apply(proposal_id, status) {
    axios.get('/proposal-final-submition', {
        params: {
            proposal_id: proposal_id,
            status: status
        }
    }).then((response) => {
        var result = response.data;
        console.log(result)
        if (result.status == true) {
            Swal.fire('Applied!', '', 'success')
            $("#product_header").load(location.href + " #product_header");
        }else{
            Swal.fire('Something is wrong.!', '', 'error')
        }
    });
}

//undewriting section

$("#document_verify_by").change(async (event) => {
    if (event.target.checked == true) {
        const verify = await verify_document(window.proposal_id);
        if (verify.data.status == true) {
            Swal.fire('Verified!', '', 'success')
        }
    }else{
        event.target.checked = true
    }
});

const emCalculation=debounce(async (event,age,sum_assured,mode_factor,term=0) => {
    sessionStorage.setItem('premium_confirmation', true);
    if(event.target.id=='em_for_life'){
        var rider_id=1;
    }
    if(event.target.id=='em_for_ci'){
        var rider_id=2;
    }
    if(event.target.id=='em_for_pdab'){
        var rider_id=3;
    }
    if(event.target.id=='em_for_diab'){
        var rider_id=4;
    }
    var data=await axios.get('/proposal-em-rate', {
        params: {
            age: age,
            term: term,
            rider_id: rider_id
        }
    }).then(response => response.data);
    var rate=data.status?data.data.rate:1;
    var em_persent=(event.target.value/100)*rate;
    var amount=((parseInt(sum_assured)*em_persent)/1000)*mode_factor;
    if(parseInt(mode_factor)>0&&term==0){
        amount=amount*parseInt(mode_factor);
    }
    amount=Math.round(amount);
    if(window.payment_mode=='Single'){
        console.log(window.payment_mode);
        amount=amount*parseInt(window.policy_total_term);
    }
    if(event.target.id=='em_for_life'){
        $("#"+event.target.id+"_amount").val(amount)
    }
    if(event.target.id=='em_for_ci'){
        $("#"+event.target.id+"_amount").val(amount)
    }
    if(event.target.id=='em_for_pdab'){
        $("#"+event.target.id+"_amount").val(amount)
    }
    if(event.target.id=='em_for_diab'){
        $("#"+event.target.id+"_amount").val(amount)
    }
    let total_extra_motality=0;
    const em_for_life_amount= $("#em_for_life_amount").val();
    total_extra_motality+=em_for_life_amount?parseFloat(em_for_life_amount):0;
    if(window.ci_premium){
        const em_for_ci_amount= $("#em_for_ci_amount").val();
        total_extra_motality+=em_for_ci_amount?parseFloat(em_for_ci_amount):0;
    }
    if(window.pdab_premium){
        const em_for_pdab_amount= $("#em_for_pdab_amount").val();
        total_extra_motality+=em_for_pdab_amount?parseFloat(em_for_pdab_amount):0;
    }
    if(window.diab_premium){
        const em_for_diab_amount= $("#em_for_diab_amount").val();
        total_extra_motality+=em_for_diab_amount?parseFloat(em_for_diab_amount):0;
    }

    $("#total_extra_motality").val(Math.round(total_extra_motality))
    var life_premium= $("#life_premium").val()?parseInt($("#life_premium").val()):0;
    var hi_premium= $("#hi_premium").val()?parseInt($("#hi_premium").val()):0;
    var ci_premium= $("#ci_premium").val()?parseInt($("#ci_premium").val()):0;
    var pdab_premium= $("#pdab_premium").val()?parseInt($("#pdab_premium").val()):0;
    var diab_premium= $("#diab_premium").val()?parseInt($("#diab_premium").val()):0;
    const new_total_premium=Math.round(
        total_extra_motality+
        life_premium+
        hi_premium+
        ci_premium+
        pdab_premium+
        diab_premium);
    $("#total_premium").val(new_total_premium);
    $("#total_premium_set").val(new_total_premium);
    $("#premium_confirm").removeClass('inactive')
});

const required_doc_set=e=>{
    const required_documents=$("#underwriting_required_documents");
    if(e.target.checked){
        var all_required_documents=[...required_documents.val(),e.target.value];
    }else{
        var all_required_documents=required_documents.val().filter(function(item) {
            return item !== e.target.value
        })
    }
    required_documents.val(all_required_documents).trigger('change')
}

async function verify_document(proposal_id) {
    const data = {
        proposal_id
    };
    return await axios.post("/proposal/document-verify", data).then(response => response);
}

async function required_document() {
    const document_id = document.getElementsByName("document_id[]");
    const file_name = document.getElementsByName("file_name[]");
    const file_path = document.getElementsByName("file_path[]");
    const hard_copy = document.getElementsByName("hard_copy[]");
    const issue_date = document.getElementsByName("issue_date[]");
    const document_ids = [];
    const file_names = [];
    const file_paths = [];
    const hard_copys = [];
    const issue_dates = [];
    for (var i = 0; i < file_path.length; i++) {
        document_ids[i] = document_id[i].value;
        file_names[i] = file_name[i].value;
        file_paths[i] = file_path[i].files[i] ? file_path[i].files[i] : "";
        hard_copys[i] = hard_copy[i].checked;
        issue_dates[i] = issue_date[i].value;
    }
    var data = new FormData();
    data.append("document_form", true);
    data.append("extra_required_document", true);
    data.append("document_id", JSON.stringify(document_ids));
    data.append("proposal_no", document.querySelector("#proposal_no").value);
    data.append("file_name", JSON.stringify(file_names));
    data.append("file_path_lenth", file_path.length);
    data.append("hard_copy", JSON.stringify(hard_copys));
    data.append("issue_date", JSON.stringify(issue_dates));
    for (var i = 0; i < file_path.length; i++) {
        data.append("file_path" + i, file_path[i].files[0]);
    }
    $('#cover-spin').show();
    await axios.post("/proposal", data).then(function (response) {
        var result = response.data;
        if (result && result.status == false) {
            $('#cover-spin').hide();
            for (var i = 0; i < file_name.length; i++) {
                document.getElementById("file_path_err" + i).innerText =
                    result.errors.hasOwnProperty("file_path" + i)
                        ? result.errors["file_path" + i][0]
                        : "";
                document.getElementById("issue_date_err" + i).innerText =
                    result.errors.hasOwnProperty("issue_date." + i)
                        ? result.errors["issue_date." + i][0]
                        : "";
            }
        } else {
            for (var i = 0; i < file_name.length; i++) {
                document.getElementById("file_path_err" + i).innerText = "";
                document.getElementById("issue_date_err" + i).innerText = "";
            }
            $("#extra_required_documents").load(location.href + " #extra_required_documents");
            $("#document_verifing").load(location.href + " #document_verifing");
            $('#cover-spin').hide();
            Swal.fire('Applied!', '', 'success')
        }
    });
}

const producer_report=async(e)=>{
    const name=e.target.id;
    const value=(document.querySelector("#"+name).checked==true?1:0);
    let data={ 
        'proposal_id': parseInt(window.proposal_id)
    }
    data[name]=value;
    const res = await axios.post('/proposal/producer-report', data);
}

const check_remarkOrDocument=event=>{
   event.target.value==window.status_id_array[3]?document.querySelector("#required_documents_field").classList.remove("inactive"):document.querySelector("#required_documents_field").classList.add("inactive");
}

$("#status_submit").submit(async(event)=>{
    const document_verify_by = document.querySelector("#document_verify_by").checked;
    const status_id=parseFloat($("#status_id").val());
    if(sessionStorage.getItem('premium_confirmation')){
        event.preventDefault();
        $('#notice_for_confirm').removeClass('inactive')
        $('#premium_confirm').removeClass('inactive')
        $('#notice_for_confirm').text('Please do confirm premium amount first.')
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        });
    }
    if(document.querySelector("#producer_report").checked==false&&status_id==window.status_id_array[2]){
        event.preventDefault();
        window.scrollTo({
            top: 4300,
            behavior: "smooth"
        });
        document.getElementById("producer_confident_report").setAttribute("style","color: red");
    }
    
    if (!document_verify_by && status_id==window.status_id_array[2]) {
        event.preventDefault();
        document.getElementById("document_verify_by_text").style.color = "red";
        window.scrollTo({
            top: 3160,
            behavior: "smooth"
        });
    }
    if(und_requirements && status_id==window.status_id_array[2]){
        const und_req_status=document.querySelector("#und_req_status").checked;
        if(!und_req_status){
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                text: 'Please checked underwritting requirements!',
            })
        }
    }
})

$("#premium_confirm").click(async()=>{
    $('#cover-spin').show();
    const em_for_life=$("#em_for_life").val();
    const em_for_life_amount=$("#em_for_life_amount").val();
    const em_for_ci=$("#em_for_ci").val();
    const em_for_ci_amount=$("#em_for_ci_amount").val();
    const em_for_pdab=$("#em_for_pdab").val();
    const em_for_pdab_amount=$("#em_for_pdab_amount").val();
    const em_for_diab=$("#em_for_diab").val();
    const em_for_diab_amount=$("#em_for_diab_amount").val();
    const total_extra_motality=$("#total_extra_motality").val();
    const total_premium_set=$("#total_premium_set").val();
    const data={
        'proposal_id':parseInt(window.proposal_id),
        'em_for_life':em_for_life?parseFloat(em_for_life):'',
        'em_for_life_amount':em_for_life_amount?parseFloat(em_for_life_amount):'',
        'em_for_ci':em_for_ci?parseFloat(em_for_ci):'',
        'em_for_ci_amount':em_for_ci_amount?parseFloat(em_for_ci_amount):'',
        'em_for_pdab':em_for_pdab?parseFloat(em_for_pdab):'',
        'em_for_pdab_amount':em_for_pdab_amount?parseFloat(em_for_pdab_amount):'',
        'em_for_diab':em_for_diab?parseFloat(em_for_diab):'',
        'em_for_diab_amount':em_for_diab_amount?parseFloat(em_for_diab_amount):'',
        'total_extra_motality':total_extra_motality?parseFloat(total_extra_motality):'',
        'total_premium':total_premium_set?parseFloat(total_premium_set):'',
    }
    const response=await axios.post('/proposal/premium-verify',data);
    $('#cover-spin').hide();
    if(response.data.status){
        $("#premium_confirm").addClass('inactive')
        sessionStorage.removeItem('premium_confirmation');
        Swal.fire(response.data.message+'!', '', 'success')
    }else{
        Swal.fire({
            icon: 'error',
            text: response.data.message+'!',
          })
    }
})

$("#und_req_status").change(async(event) => {
    const data = {
        'proposal_id':parseInt(window.proposal_id),
        'und_req_status':event.target.checked
    };
    $result=await axios.post("/proposal/und-req-status",data).then(response => response);
    console.log($result);

})
