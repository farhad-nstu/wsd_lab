const notice = (message) => {
    Swal.fire({
        title: message,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })
}

const error = (message) => {
    Swal.fire({
        icon: 'error',
        text: message,
        footer: '<a href="">Please check our input and try agian.</a>'
    })
}

function debounce(func, timeout = 600) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function nextBirthdayDiffInDays(dob) {
    let birthday = new Date(dob);
    let year = new Date().getFullYear();
    birthday.setFullYear(year);
    if (birthday < new Date()) {
        birthday.setFullYear(year + 1);
    }
    diff = birthday - new Date();
    let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
}

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

const age_calculate = (dateOfBirth, dateToCalculate) => {
    var dob = new Date(dateOfBirth).getTime();
    var dateToCompare = new Date(dateToCalculate).getTime();
    var age = parseInt(Math.floor((dateToCompare - dob) / (365 * 24 * 60 * 60 * 1000)));
    var birthdayDiff = 365 - parseInt(nextBirthdayDiffInDays(dateOfBirth));
    if (birthdayDiff >= 180) {
        age++;
    }
    return parseInt(Math.floor(age));
};


const supplimentary_premium = async(supplimentary_id, age, term, sum_assured) => {
    return await axios.get('/get-supplimentary-rate', {
        params: {
            supplimentary_id,
            age,
            sum_assured,
            term
        }
    }).then(function(response) {
        console.log(response)
        return response.data.data.premium;
    })
}

const getPremium = debounce((is_ci_sum_assured = false) => premium_calculation(is_ci_sum_assured));

async function premium_calculation(is_ci_sum_assured = false) {

    var com_date = document.querySelector("#com_date").value;
    var birth_date = document.querySelector("#birth_date").value;
    if (birth_date) {
        var age = age_calculate(birth_date, com_date);
        document.querySelector("#proposers_age").value = age;
        if(age.toString().length>2){
            document.querySelector("#proposers_age").value = '';
            return 0;
        }
        if (age < 18) {
            notice("Age is invalid.");
            myTimeout = setTimeout(planEmpy, 1000);
            return 0;
        }
        // added for expiry date
        var addedDays = 180;
        var birthdayDiff = 365 - parseInt(nextBirthdayDiffInDays(birth_date));
        if (birthdayDiff >= 150 && birthdayDiff < 180) {
            var subDays = birthdayDiff - 149;
            addedDays = addedDays - subDays;
        }
    }else{
        return 0;
    }
    var selected_plan_id = document.querySelector("#plan_id");
        var plan_no = selected_plan_id.options[selected_plan_id.selectedIndex].getAttribute('plan_no');
    if (typeof age === 'undefined') {
        notice('Please fill up the birth date field before doing this action.'); return 0;
    } else {
        var term_selected = document.querySelector("#term");
        var premium_rate = term_selected.options[term_selected.selectedIndex].getAttribute('premium_rate');
        var lifeterm = term_selected.options[term_selected.selectedIndex].getAttribute('term');
        var sum_risk_other_policy = document.querySelector("#sum_risk_other_policy").value;
        var sum_assured = document.querySelector("#sum_assured").value;
        if(plan_no=='14'){
            const second_life_sum_assured=$("#second_life_sum_assured").val();
            if(second_life_sum_assured&&(parseInt(sum_assured)>parseInt(second_life_sum_assured))){
                $("#basic_premium").val("")
                $("#sum_assured_err").text("The sum assured must not be greater than "+second_life_sum_assured+".")
                return 0;
            }else{
                $("#sum_assured_err").text("")
            }
        }else{
            $("#second_life_name").val("")
            $("#second_life_dob").val("")
            $("#second_life_age_yy").val("")
            $("#second_life_age_mm").val("")
            $("#second_life_sex").val("").trigger("change")
            $("#second_life_height").val("")
            $("#second_life_weight").val("")
            $("#second_life_bmi").val("")
            $("#second_life_sum_assured").val("")
        }
        var annuity_pension_unit = document.querySelector("#annuity_pension_unit").value;

        var payment_mode_selected = document.querySelector("#pay_mode");
        var payment_mode_factor = payment_mode_selected.options[payment_mode_selected.selectedIndex].getAttribute('payment_mode_factor');
        var ci_hi_mode_factor = payment_mode_selected.options[payment_mode_selected.selectedIndex].getAttribute('ci_hi_mode_factor');
        if(plan_no==23){
            var life_premium = parseInt(sum_assured) * parseFloat(premium_rate) / 100000;
        }else{
            var life_premium = $('#expected_premium').val()?parseFloat($('#expected_premium').val()):(parseInt(plan_no=='08'?annuity_pension_unit:sum_assured) * parseFloat(premium_rate) / 1000);
        }
        let staff_discount_premium = ($("#is_staff").val()==1?(life_premium*staff_discount):0);
        let premium=life_premium-staff_discount_premium;
        var total_annual_premium=premium;
        premium = $('#expected_premium').val()?premium:(premium * parseFloat(payment_mode_factor));
        document.querySelector("#basic_premium").value = Math.round(premium);
        premium = Math.round(premium);
        if(sum_assured>0&&(plan_no=='26R'||plan_no=='26S')){
            var total_stamp_cost = 0;
            var divisor = 50000;
            if (sum_assured <= 100000) {
                total_stamp_cost= 100;
            } else if (sum_assured > 100000) {
                if (sum_assured % divisor === 0) {
                    total_stamp_cost= Math.floor(100 + ((sum_assured - 100000) / divisor) * 50);
                } else {
                    total_stamp_cost= Math.floor(100 + parseInt((sum_assured - 100000) / divisor) * 50 + 50);
                }
            } else {
                total_stamp_cost= "";
            }
            document.querySelector("#stamp_cost").value=total_stamp_cost;
        }
        var stamp_cost = document.querySelector("#stamp_cost").value;
        document.querySelector("#premium_with_stamp").value = Math.floor(premium + parseInt(stamp_cost ? stamp_cost : 0))

        if (document.querySelector('#hi').checked == true) {
            var supplimentary_id = document.querySelector('#supplimentary_id');
            if (supplimentary_id.value) {
                var hi_max_sum_assured = parseInt(supplimentary_id.options[supplimentary_id.selectedIndex].getAttribute('max_sum_assured'));
                document.querySelector("#hi_sum_assured").value = parseInt(hi_max_sum_assured);
                var supplimentary_max_age = parseInt(supplimentary_id.getAttribute('max_age'));
                var each_child_premium = parseFloat(supplimentary_id.options[supplimentary_id.selectedIndex].getAttribute('each_child_premium'))
        
                
                var beneficary_type_selected = document.querySelector("#beneficiary_type");
                var discount = beneficary_type_selected.options[beneficary_type_selected.selectedIndex].getAttribute('discount');
                var maternity_plan_selected = document.querySelector('#maternity_plan')
                var maternity_rate = parseFloat(maternity_plan_selected.options[maternity_plan_selected.selectedIndex].getAttribute('rate'))
                var maternity_min_age = parseFloat(maternity_plan_selected.options[maternity_plan_selected.selectedIndex].getAttribute('min_age'))
    
                var total_dependent = 0;
                var insured_spouse_dob = document.querySelector("#insured_spouse_dob").value;
                if (insured_spouse_dob) {
                    var spouse_age = age_calculate(insured_spouse_dob, com_date);
                }
                var child_count = document.getElementsByName("child_name[]");
                var child_dob = document.getElementsByName("child_dob[]");
                var child_age = document.getElementsByName("child_age[]");
                var child_sex = document.getElementsByName("child_sex[]");
                var spouse_hi_premium=0;
                var child_hi_premium=0;
                var self_hi_premium=0;
                var maternity_premium=0;
                var hi_discount_rate=discount;
                self_hi_premium = await supplimentary_premium(parseInt(supplimentary_id.value), age, '', '');
                self_hi_premium = self_hi_premium*parseFloat(ci_hi_mode_factor);
                document.querySelector("#hi_self_premium").value = parseInt(self_hi_premium);
                switch (beneficary_type_selected.value) {
                    case '1':
                        document.querySelector("#hi_child_premium").value = ''
                        document.querySelector("#hi_spouse_premium").value=''
                        document.querySelector("#maternity_premium").value = ''
                        for (var i = 0; i < child_count.length; i++) {
                            child_count[i].value='';
                            child_dob[i].value='';
                            child_age[i].value='';
                            child_sex[i].value='';
                            var event = new Event('change');
                            child_sex[i].dispatchEvent(event);
                        }
                        break;
                    case '2':
                        document.querySelector("#hi_child_premium").value = ''
                        for (var i = 0; i < child_count.length; i++) {
                            child_count[i].value='';
                            child_dob[i].value='';
                            child_age[i].value='';
                            child_sex[i].value='';
                            var event = new Event('change');
                            child_sex[i].dispatchEvent(event);
                        }
                           if (maternity_rate) {
                                maternity_premium=parseFloat(maternity_rate)*parseFloat(ci_hi_mode_factor);
                                document.querySelector("#maternity_premium").value = maternity_premium ;
                            }
                        spouse_hi_premium = await supplimentary_premium(parseInt(supplimentary_id.value), spouse_age, '', '');
                        spouse_hi_premium = spouse_hi_premium*parseFloat(ci_hi_mode_factor);
                        document.querySelector("#hi_spouse_premium").value = parseInt(spouse_hi_premium);
                        total_dependent = 1;
                        break;
                    case '3':
                        if (maternity_rate) {
                            maternity_premium=parseFloat(maternity_rate)*parseFloat(ci_hi_mode_factor);
                            document.querySelector("#maternity_premium").value =maternity_premium ;
                        }
                        spouse_hi_premium = await supplimentary_premium(parseInt(supplimentary_id.value), spouse_age, '', '');
                        spouse_hi_premium = spouse_hi_premium*parseFloat(ci_hi_mode_factor);
                        document.querySelector("#hi_spouse_premium").value = parseInt(spouse_hi_premium);
                        child_hi_premium=(parseInt(child_count.length) * each_child_premium);
                        child_hi_premium = child_hi_premium*parseFloat(ci_hi_mode_factor);
                        document.querySelector("#hi_child_premium").value = child_hi_premium;
                        total_dependent = (parseInt(child_count.length)+1);
                        break;
                    case '4':
                        document.querySelector("#hi_spouse_premium").value=''
                        document.querySelector("#maternity_premium").value = ''
                        child_hi_premium =(parseInt(child_count.length) * each_child_premium);
                        child_hi_premium = child_hi_premium*parseFloat(ci_hi_mode_factor);
                        document.querySelector("#hi_child_premium").value = child_hi_premium;
                        total_dependent = parseInt(child_count.length);
                        if (discount){
                            hi_discount_rate =(total_dependent > 1 ? 10 : discount)
                        }
                        break;
                    default:
                        break;
                }
                var hi_premium= self_hi_premium+spouse_hi_premium+child_hi_premium;
                document.querySelector("#hi_discount_rate").value = hi_discount_rate;
                var discount_amount = (hi_premium * discount / 100);
                document.querySelector("#hi_discount_amount").value=discount_amount;
                hi_premium=hi_premium+maternity_premium-discount_amount;
                document.querySelector("#hi_premium").value = Math.round(hi_premium)
                premium += Math.round(hi_premium);
            }
        }  else {
            document.querySelector("#hi_sum_assured").value = ''
            document.querySelector("#hi_sum_assured").value = ''
            document.querySelector("#hi_premium").value = ''
            document.querySelector("#maternity_premium").value = ''
            document.querySelector("#hi_child_premium").value = ''
        }
        var ci_open = document.querySelector("#ci_open")
        var pdab_open = document.querySelector("#pdab_open")
        var diab_open = document.querySelector("#diab_open")
        if (document.querySelector('#ci').checked) {
            var ci = document.querySelector("#ci");
            var max_entry_age = parseInt(ci.getAttribute('max_entry_age'));
            if(age>max_entry_age){
                document.querySelector('#ci').checked=false;
                notice("Not eligible for CI.");
                return 0;
            }
            ci_open.classList.remove('inactive');
            var percentage_of_sum_assured = ci.getAttribute('percentage_of_sum_assured');
            var max_sum_assured = parseInt(ci.getAttribute('max_sum_assured'));
            var max_age = parseInt(ci.getAttribute('max_age'));
            
            if (is_ci_sum_assured == false && document.querySelector("#ci_sum_assured").value<1) {
                var ci_assured = (max_sum_assured < (parseInt(sum_assured) * parseInt(percentage_of_sum_assured) / 100) ?
                    max_sum_assured : (parseInt(sum_assured) * parseInt(percentage_of_sum_assured) / 100));
                document.querySelector("#ci_sum_assured").value = (ci_assured>1000000?1000000:ci_assured)
            }
            const term_plus_life_age=parseInt(lifeterm)+age;
            if(term_plus_life_age>max_age){
                var self_ci_term=(max_age-age);
            }else{
                var self_ci_term=parseInt(lifeterm);
            }
            var ci_premium = await supplimentary_premium(2, age, self_ci_term, parseInt(document.querySelector("#ci_sum_assured").value));
            if (parseFloat(ci_hi_mode_factor) > 0) {
                ci_premium = ci_premium*parseFloat(ci_hi_mode_factor);
            }
            document.querySelector("#ci_premium").value = Math.round(ci_premium)
            premium += Math.round(ci_premium);
        } else {
            ci_open.classList.add('inactive');
            document.querySelector("#ci_sum_assured").value = ''
            document.querySelector("#ci_premium").value = ''
        }
        if (document.querySelector('#pdab').checked) {
            pdab_open.classList.remove('inactive');
            var pdab = document.querySelector("#pdab");
            var percentage_of_sum_assured_of_pdab = pdab.getAttribute('percentage_of_sum_assured');
            var max_pdab_sum_assured = parseInt(pdab.getAttribute('max_sum_assured'));
            var pdab_max_age = parseInt(pdab.getAttribute('max_age'));
            if(document.querySelector("#pdab_sum_assured").value<1){
                var pdab_sum_assured = parseInt(sum_assured) > max_pdab_sum_assured ? max_pdab_sum_assured : parseInt(sum_assured);
                document.querySelector("#pdab_sum_assured").value = pdab_sum_assured;
            }else{
                var pdab_sum_assured=document.querySelector("#pdab_sum_assured").value;
            }
            
            var pdab_premium = await supplimentary_premium(3, '', '', pdab_sum_assured);
            pdab_premium = pdab_premium * parseFloat(payment_mode_factor);
            document.querySelector("#pdab_premium").value = Math.round(pdab_premium)
            premium += Math.round(pdab_premium)
        } else {
            pdab_open.classList.add('inactive');
            document.querySelector("#pdab_sum_assured").value = ''
            document.querySelector("#pdab_premium").value = ''
        }
        if (document.querySelector('#diab').checked) {
            diab_open.classList.remove('inactive');
            var diab = document.querySelector("#diab");
            var percentage_of_sum_assured_of_diab = parseInt(diab.getAttribute('percentage_of_sum_assured'));
            var max_diab_sum_assured = parseInt(diab.getAttribute('max_sum_assured'));
            var diab_max_age = parseInt(diab.getAttribute('max_age'));
            if(document.querySelector("#diab_sum_assured").value<1){
                var diab_sum_assured = parseInt(sum_assured) > max_diab_sum_assured ? max_diab_sum_assured : parseInt(sum_assured);
                document.querySelector("#diab_sum_assured").value = diab_sum_assured;
            }else{
                var diab_sum_assured = parseInt(document.querySelector("#diab_sum_assured").value);
            }
            
            var diab_premium = await supplimentary_premium(4, '', '', diab_sum_assured);
            diab_premium = diab_premium * parseFloat(payment_mode_factor);
            document.querySelector("#diab_premium").value = Math.round(diab_premium)
            premium += Math.round(diab_premium)
        } else {
            diab_open.classList.add('inactive');
            document.querySelector("#diab_sum_assured").value = ''
            document.querySelector("#diab_premium").value = ''
        }
        const prev_prop_sum_assured=$("#prev_prop_sum_assured").val();
        const prev_sum_assured=$("#prev_sum_assured").val();
        var total_prev_sum_assurd=parseInt(prev_prop_sum_assured?prev_prop_sum_assured:0)+parseInt(prev_sum_assured?prev_sum_assured:0)
        if(plan_no=='14'){
            var plan_14_factor=0;
            switch (lifeterm) {
                case '10':
                   plan_14_factor += 8.02;
                  break;
                case '11':
                   plan_14_factor += 8.79;
                  break;
                case '12':
                    plan_14_factor += 9.53;
                  break;
                case '13':
                   plan_14_factor += 10.25;
                  break;
                case '14':
                   plan_14_factor += 10.95;
                  break;
                case '15':
                   plan_14_factor += 11.63;
                  break;
                case '16':
                   plan_14_factor += 12.3;
                  break;
                case '17':
                   plan_14_factor += 12.94;
                  break;
                case '18':
                   plan_14_factor += 13.56;
                  break;
                case '19':
                   plan_14_factor += 14.17;
                  break;
                case '20':
                    plan_14_factor += 14.75;
                  break;
                case '21':
                   plan_14_factor += 15.32;
                  break;
                case '22':
                   plan_14_factor += 15.88;
                  break;
                case '23':
                   plan_14_factor += 16.42;
                  break;
                case '24':
                   plan_14_factor += 16.94;
                  break;
                case '25':
                   plan_14_factor += 17.44;
                 break;
            }
            const sum_at_risk=((sum_assured*0.15)+(total_annual_premium+(sum_assured*0.01)*12)*plan_14_factor);
            document.querySelector("#sum_at_risk").value=Math.round(sum_at_risk);
            document.querySelector("#total_sum_at_risk").value=Math.round(sum_at_risk)+
                    parseInt(total_prev_sum_assurd?total_prev_sum_assurd:0);
        }else{
            const sum_at_risk=Math.round(parseInt(sum_assured))*(plan_no=='07'?2:1);
            document.querySelector("#sum_at_risk").value=sum_at_risk;
            console.log({total_prev_sum_assurd,sum_at_risk})
            document.querySelector("#total_sum_at_risk").value = sum_at_risk + 
                    parseInt(total_prev_sum_assurd?total_prev_sum_assurd:0);
        }
        document.querySelector("#total_premium").value = Math.round(premium);
    }

    if (is_ci_sum_assured == true) {
        var ci_sum_assured = document.querySelector("#ci_sum_assured").value;
        var check_ci_sum_assurd=(sum_assured * 50 / 100)>1000000?1000000:(sum_assured * 50 / 100);
        if (check_ci_sum_assurd < ci_sum_assured||ci_sum_assured<50000) {
            document.querySelector("#ci_premium").value = ''
            $("#ci_sum_assured_err").text('The CI sum assured is invalid.')
        }else{
            $("#ci_sum_assured_err").text('')
        }
    }

    if(document.querySelector('#pdab').checked&&pdab_sum_assured>sum_assured){
        document.querySelector("#pdab_premium").value = ''
        $("#pdab_sum_assured_err").text('The PDAB sum assured is invalid.')
    }else{
        $("#pdab_sum_assured_err").text('')
    }
    if(document.querySelector('#diab').checked&&diab_sum_assured>sum_assured){
        document.querySelector("#diab_premium").value = ''
        $("#diab_sum_assured_err").text('The diab sum assured is invalid.')
    }else{
        $("#diab_sum_assured_err").text('')
    }
}
$("#proposal_date").change(function(e){
    var dateInput = document.getElementById("expiry_date");
    var proposal_date = e.target.value;
    const date = new Date(proposal_date);
    const result2 = addMonths(date, 6);
    dateInput.removeAttribute("readonly");
    dateInput.value = String(getFormattedDate(result2));
    dateInput.setAttribute("readonly", "true");
})
function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
}