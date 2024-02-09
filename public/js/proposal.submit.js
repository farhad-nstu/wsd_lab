async function my_proposal() {
    const control_no = document.getElementsByName("control_no[]");
    const child_name = document.getElementsByName("child_name[]");
    const child_dob = document.getElementsByName("child_dob[]");
    const child_age = document.getElementsByName("child_age[]");
    const child_sex = document.getElementsByName("child_sex[]");
    const control_nos = [];
    const child_names = [];
    const child_dobs = [];
    const child_ages = [];
    const child_sexs = [];
    for (var i = 0; i < child_name.length; i++) {
        control_nos[i] = control_no[i].value ? control_no[i].value : "";
        child_names[i] = child_name[i].value;
        child_dobs[i] = child_dob[i].value;
        child_ages[i] = child_age[i].value;
        child_sexs[i] = child_sex[i].value;
    }
    var data = {
        proposal_form: true,
        proposal_id:document.querySelector('#proposal_id').value,
        proposal_no: document.querySelector("#proposal_no").value,
        channel_id: document.querySelector("#channel_id").value ? document.querySelector("#channel_id").value : '',
        office_id: document.querySelector("#office_id").value ? document.querySelector("#office_id").value : '',
        full_name: document.querySelector("#applicant_name").value,
        contact_no: document.querySelector("#contact_no").value,
        resident_status: document.querySelector("#resident_status").value,
        proposal_date: document.querySelector("#proposal_date").value,
        identity_type: document.querySelector("#identity_type").value,
        identity_no: document.querySelector("#identity_no").value,
        birth_date: document.querySelector("#birth_date").value,
        passport_expiry_date: document.querySelector("#passport_expiry_date")
            .value,
        com_date: document.querySelector("#com_date").value,
        proposers_age: document.querySelector("#proposers_age").value,
        sum_risk_other_policy: document.querySelector("#sum_risk_other_policy")
            .value,
        is_staff: document.querySelector("#is_staff").value ? document.querySelector("#is_staff").value : '',
        staff_code: document.querySelector("#staff_code").value ? document.querySelector("#staff_code").value : '',
        producer_code: document.querySelector("#producer_code").value, 
        previous_policy_no: document.querySelector("#previous_policy_no").value,
        prev_sum_assured: document.querySelector("#prev_sum_assured").value,
        prev_hi_sum_assured: document.querySelector("#prev_hi_sum_assured").value,
        prev_ci_sum_assured: document.querySelector("#prev_ci_sum_assured").value,
        prev_pdab_sum_assured: document.querySelector("#prev_pdab_sum_assured").value,
        prev_diab_sum_assured: document.querySelector("#prev_diab_sum_assured").value,
        prev_premium: document.querySelector("#prev_premium").value,
        id_no: document.querySelector("#id_no").value,
        previous_proposal_no: document.querySelector("#previous_proposal_no").value,
        prev_prop_sum_assured: document.querySelector("#prev_prop_sum_assured").value,
        prev_prop_hi_sum_assured: document.querySelector("#prev_prop_hi_sum_assured").value,
        prev_prop_ci_sum_assured: document.querySelector("#prev_prop_ci_sum_assured").value,
        prev_prop_pdab_sum_assured: document.querySelector("#prev_prop_pdab_sum_assured").value,
        prev_prop_diab_sum_assured: document.querySelector("#prev_prop_diab_sum_assured").value,
        prev_prop_premium: document.querySelector("#prev_prop_premium").value,
        plan_id: document.querySelector("#plan_id").value,
        term: parseInt(document.querySelector("#term").value),
        annuity_pension_unit: document.querySelector("#annuity_pension_unit").value?document.querySelector("#annuity_pension_unit").value:'',
        sum_assured: document.querySelector("#sum_assured").value,
        pay_mode: document.querySelector("#pay_mode").value,
        hi:
            document.querySelector("#hi").checked == true
                ? document.querySelector("#hi").value
                : "",
        hi_sum_assured: document.querySelector("#hi_sum_assured").value,
        ci:
            document.querySelector("#ci").checked == true
                ? document.querySelector("#ci").value
                : "",
        ci_sum_assured: document.querySelector("#ci_sum_assured").value,
        pdab:
            document.querySelector("#pdab").checked == true
                ? document.querySelector("#pdab").value
                : "",
        pdab_sum_assured: document.querySelector("#pdab_sum_assured").value,
        diab:
            document.querySelector("#diab").checked == true
                ? document.querySelector("#diab").value
                : "",
        diab_sum_assured: document.querySelector("#diab_sum_assured").value,
        supplimentary_id: document.querySelector("#supplimentary_id").value,
        beneficiary_type: document.querySelector("#beneficiary_type").value,
        maternity_plan: document.querySelector("#maternity_plan").value,
        insured_spouse_dob: document.querySelector("#insured_spouse_dob").value,
        insured_spouse_age: document.querySelector("#insured_spouse_age").value,

        second_life_name: document.querySelector("#second_life_name").value,
        second_life_dob: document.querySelector("#second_life_dob").value,
        second_life_age_mm: document.querySelector("#second_life_age_mm").value,
        second_life_age_yy: document.querySelector("#second_life_age_yy").value,
        second_life_sex: document.querySelector("#second_life_sex").value,
        second_life_height: document.querySelector("#second_life_height").value,
        second_life_weight: document.querySelector("#second_life_weight").value,
        second_life_bmi: document.querySelector("#second_life_bmi").value,
        second_life_sum_assured: document.querySelector("#second_life_sum_assured").value,

        control_no: control_nos,
        child_name: child_names,
        child_dob: child_dobs,
        child_age: child_ages,
        child_sex: child_sexs,
        basic_premium: document.querySelector("#basic_premium").value,
        stamp_cost: document.querySelector("#stamp_cost").value,
        insurance_objective: document.querySelector("#insurance_objective").value,
        e_tin: document.querySelector("#e_tin").value,
        expiry_date: document.querySelector("#expiry_date").value,
        premium_with_stamp: document.querySelector("#premium_with_stamp").value,
        sum_at_risk: document.querySelector("#sum_at_risk").value,
        total_sum_at_risk: document.querySelector("#total_sum_at_risk").value,
        hi_premium: document.querySelector("#hi_premium").value,
        hi_self_premium: document.querySelector("#hi_self_premium").value,
        hi_spouse_premium: document.querySelector("#hi_spouse_premium").value,
        hi_child_premium: document.querySelector("#hi_child_premium").value,
        hi_discount_rate: document.querySelector("#hi_discount_rate").value,
        hi_discount_amount: document.querySelector("#hi_discount_amount").value,
        maternity_premium: document.querySelector("#maternity_premium").value
            ? document.querySelector("#maternity_premium").value
            : "",
        ci_premium: document.querySelector("#ci_premium").value,
        pdab_premium: document.querySelector("#pdab_premium").value,
        diab_premium: document.querySelector("#diab_premium").value,

        und_requirements: document.querySelector("#und_requirements").value ? document.querySelector("#und_requirements").value:'',
        total_premium: document.querySelector("#total_premium").value,
        
    };
    $("#cover-spin").show();
    return await axios.post("/proposal", data).then(function (response) {
        var result = response.data;
        console.log(result);
        $("#cover-spin").hide();
        if (result.status == false) {
            document.getElementById("proposal_no_err").innerText =
                result.errors.hasOwnProperty("proposal_no")
                    ? result.errors.proposal_no[0]
                    : "";
            document.getElementById("proposal_date_err").innerText =
                result.errors.hasOwnProperty("proposal_date")
                    ? result.errors.proposal_date[0]
                    : "";
            document.getElementById("identity_type_err").innerText =
                result.errors.hasOwnProperty("identity_type")
                    ? result.errors.identity_type[0]
                    : "";
            document.getElementById("identity_no_err").innerText =
                result.errors.hasOwnProperty("identity_no")
                    ? result.errors.identity_no[0]
                    : "";
            document.getElementById("passport_expiry_date_err").innerText =
                result.errors.hasOwnProperty("passport_expiry_date")
                    ? result.errors.passport_expiry_date[0]
                    : "";
            document.getElementById("birth_date_err").innerText =
                result.errors.hasOwnProperty("birth_date")
                    ? result.errors.birth_date[0]
                    : "";
            document.getElementById("com_date_err").innerText =
                result.errors.hasOwnProperty("com_date")
                    ? result.errors.com_date[0]
                    : "";
            document.getElementById("full_name_err").innerText =
                result.errors.hasOwnProperty("full_name")
                    ? result.errors.full_name[0]
                    : "";
            document.getElementById("contact_no_err").innerText =
            result.errors.hasOwnProperty("contact_no")
                ? result.errors.contact_no[0]
                : "";
            document.getElementById("resident_status_err").innerText =
            result.errors.hasOwnProperty("resident_status")
                ? result.errors.resident_status[0]
                : "";
            document.getElementById("sum_risk_other_policy_err").innerText =
                result.errors.hasOwnProperty("sum_risk_other_policy")
                    ? result.errors.sum_risk_other_policy[0]
                    : "";
            document.getElementById("is_staff_err").innerText =
                result.errors.hasOwnProperty("is_staff")
                    ? result.errors.is_staff[0]
                    : "";
            document.getElementById("staff_code_err").innerText =
                result.errors.hasOwnProperty("staff_code")
                    ? result.errors.staff_code[0]
                    : "";
            document.getElementById("producer_code_err").innerText =
                result.errors.hasOwnProperty("producer_code")
                    ? result.errors.producer_code[0]
                    : "";
            document.getElementById("previous_policy_number_err").innerText =
                result.errors.hasOwnProperty("previous_policy_no")
                    ? result.errors.previous_policy_no[0]
                    : "";
            document.getElementById("id_no_err").innerText =
                result.errors.hasOwnProperty("id_no")
                    ? result.errors.id_no[0]
                    : "";
            document.getElementById("previous_proposal_no_err").innerText =
                result.errors.hasOwnProperty("previous_proposal_no")
                    ? result.errors.previous_proposal_no[0]
                    : "";
            document.getElementById("prev_prop_sum_assured_err").innerText =
                result.errors.hasOwnProperty("prev_prop_sum_assured")
                    ? result.errors.prev_prop_sum_assured[0]
                    : "";
            document.getElementById("prev_prop_premium_err").innerText =
                result.errors.hasOwnProperty("prev_prop_premium")
                    ? result.errors.prev_prop_premium[0]
                    : "";

            document.getElementById("plan_id_err").innerText =
                result.errors.hasOwnProperty("plan_id")
                    ? result.errors.plan_id[0]
                    : "";
            document.getElementById("term_err").innerText =
                result.errors.hasOwnProperty("term")
                    ? result.errors.term[0]
                    : "";
            document.getElementById("annuity_pension_unit_err").innerText =
                    result.errors.hasOwnProperty("annuity_pension_unit")
                    ? result.errors.annuity_pension_unit[0]
                    : "";
            document.getElementById("sum_assured_err").innerText =
                result.errors.hasOwnProperty("sum_assured")
                    ? result.errors.sum_assured[0]
                    : "";
            document.getElementById("pay_mode_err").innerText =
                result.errors.hasOwnProperty("pay_mode")
                    ? result.errors.pay_mode[0]
                    : "";
            document.getElementById("hi_err").innerText =
                result.errors.hasOwnProperty("hi") ? result.errors.hi[0] : "";
            document.getElementById("ci_err").innerText =
                result.errors.hasOwnProperty("ci") ? result.errors.ci[0] : "";
            document.getElementById("pdab_err").innerText =
                result.errors.hasOwnProperty("pdab")
                    ? result.errors.pdab[0]
                    : "";
            document.getElementById("diab_err").innerText =
                result.errors.hasOwnProperty("diab")
                    ? result.errors.diab[0]
                    : "";
            document.getElementById("supplimentary_id_err").innerText =
                result.errors.hasOwnProperty("supplimentary_id")
                    ? result.errors.supplimentary_id[0]
                    : "";
            document.getElementById("beneficary_type_err").innerText =
                result.errors.hasOwnProperty("beneficiary_type")
                    ? result.errors.beneficiary_type[0]
                    : "";
            document.getElementById("maternity_plan_err").innerText =
                result.errors.hasOwnProperty("maternity_plan")
                    ? result.errors.maternity_plan[0]
                    : "";
            document.getElementById("insured_spouse_dob_err").innerText =
                result.errors.hasOwnProperty("insured_spouse_dob")
                    ? result.errors.insured_spouse_dob[0]
                    : "";
            document.getElementById("insured_spouse_age_err").innerText =
                result.errors.hasOwnProperty("insured_spouse_age")
                    ? result.errors.insured_spouse_age[0]
                    : "";
            document.getElementById("second_life_name_err").innerText =
                result.errors.hasOwnProperty("second_life_name")
                    ? result.errors.second_life_name[0]
                    : "";
            document.getElementById("second_life_dob_err").innerText =
                result.errors.hasOwnProperty("second_life_dob")
                    ? result.errors.second_life_dob[0]
                    : "";
            document.getElementById("second_life_age_mm_err").innerText =
                result.errors.hasOwnProperty("second_life_age_mm")
                    ? result.errors.second_life_age_mm[0]
                    : "";
            document.getElementById("second_life_age_yy_err").innerText =
                result.errors.hasOwnProperty("second_life_age_yy")
                    ? result.errors.second_life_age_yy[0]
                    : "";
            document.getElementById("second_life_sex_err").innerText =
                result.errors.hasOwnProperty("second_life_sex")
                    ? result.errors.second_life_sex[0]
                    : "";
            document.getElementById("second_life_height_err").innerText =
                result.errors.hasOwnProperty("second_life_height")
                    ? result.errors.second_life_height[0]
                    : "";
            document.getElementById("second_life_weight_err").innerText =
                result.errors.hasOwnProperty("second_life_weight")
                    ? result.errors.second_life_weight[0]
                    : "";
            document.getElementById("second_life_bmi_err").innerText =
                result.errors.hasOwnProperty("second_life_bmi")
                    ? result.errors.second_life_bmi[0]
                    : "";
            document.getElementById("second_life_sum_assured_err").innerText =
                result.errors.hasOwnProperty("second_life_sum_assured")
                    ? result.errors.second_life_sum_assured[0]
                    : "";
            for (var i = 0; i < child_name.length; i++) {
                document.getElementById("child_name_err" + i).innerText =
                    result.errors.hasOwnProperty("child_name." + i)
                        ? result.errors["child_name." + i][0]
                        : "";
                document.getElementById("child_dob_err" + i).innerText =
                    result.errors.hasOwnProperty("child_dob." + i)
                        ? result.errors["child_dob." + i][0]
                        : "";
                document.getElementById("child_age_err" + i).innerText =
                    result.errors.hasOwnProperty("child_age." + i)
                        ? result.errors["child_age." + i][0]
                        : "";
                document.getElementById("child_sex_err" + i).innerText =
                    result.errors.hasOwnProperty("child_sex." + i)
                        ? result.errors["child_sex." + i][0]
                        : "";
            }
            document.getElementById("basic_premium_err").innerText =
                result.errors.hasOwnProperty("basic_premium")
                    ? result.errors.basic_premium[0]
                    : "";
            document.getElementById("stamp_cost_err").innerText =
                result.errors.hasOwnProperty("stamp_cost")
                    ? result.errors.stamp_cost[0]
                    : "";
            document.getElementById("insurance_objective_err").innerText =
                result.errors.hasOwnProperty("insurance_objective")
                    ? result.errors.insurance_objective[0]
                    : "";
            document.getElementById("e_tin_err").innerText =
                result.errors.hasOwnProperty("e_tin")
                    ? result.errors.e_tin[0]
                    : "";
            document.getElementById("expiry_date_err").innerText =
                result.errors.hasOwnProperty("expiry_date")
                    ? result.errors.expiry_date[0]
                    : "";
            document.getElementById("premium_with_stamp_err").innerText =
                result.errors.hasOwnProperty("premium_with_stamp")
                    ? result.errors.premium_with_stamp[0]
                    : "";
            document.getElementById("total_sum_at_risk_err").innerText =
                result.errors.hasOwnProperty("total_sum_at_risk")
                    ? result.errors.total_sum_at_risk[0]
                    : "";
            document.getElementById("hi_premium_err").innerText =
                result.errors.hasOwnProperty("hi_premium")
                    ? result.errors.hi_premium[0]
                    : "";
            document.getElementById("ci_premium_err").innerText =
                result.errors.hasOwnProperty("ci_premium")
                    ? result.errors.ci_premium[0]
                    : "";
            document.getElementById("pdab_premium_err").innerText =
                result.errors.hasOwnProperty("pdab_premium")
                    ? result.errors.pdab_premium[0]
                    : "";
            document.getElementById("diab_premium_err").innerText =
                result.errors.hasOwnProperty("diab_premium")
                    ? result.errors.diab_premium[0]
                    : "";
            document.getElementById("total_premium_err").innerText =
                result.errors.hasOwnProperty("total_premium")
                    ? result.errors.total_premium[0]
                    : "";
            document.getElementById("und_requirements_err").innerText =
                result.errors.hasOwnProperty("und_requirements")
                    ? result.errors.und_requirements[0]
                    : "";
        } else {
            document.querySelector('#proposal_id').value=result.data.id;
            document.getElementById("proposal_no_err").innerText = "";
            document.getElementById("proposal_date_err").innerText = "";
            document.getElementById("identity_type_err").innerText = "";
            document.getElementById("identity_no_err").innerText = "";
            document.getElementById("passport_expiry_date_err").innerText = "";
            document.getElementById("birth_date_err").innerText = "";
            document.getElementById("com_date_err").innerText = "";
            document.getElementById("full_name_err").innerText = "";
            document.getElementById("contact_no_err").innerText = "";
            document.getElementById("resident_status_err").innerText = "";
            document.getElementById("sum_risk_other_policy_err").innerText = "";
            document.getElementById("staff_code_err").innerText = "";
            document.getElementById("staff_code_err").innerText = "";
            document.getElementById("producer_code_err").innerText = "";
            document.getElementById("previous_policy_number_err").innerText =
                "";
            document.getElementById("id_no_err").innerText = "";
            document.getElementById("previous_proposal_no_err").innerText = "";
            document.getElementById("prev_prop_sum_assured_err").innerText = "";
            document.getElementById("prev_prop_premium_err").innerText = "";
            document.getElementById("plan_id_err").innerText = "";
            document.getElementById("term_err").innerText = "";
            document.getElementById("annuity_pension_unit_err").innerText = "";
            document.getElementById("sum_assured_err").innerText = "";
            document.getElementById("pay_mode_err").innerText = "";
            document.getElementById("hi_err").innerText = "";
            document.getElementById("ci_err").innerText = "";
            document.getElementById("pdab_err").innerText = "";
            document.getElementById("diab_err").innerText = "";
            document.getElementById("supplimentary_id_err").innerText = "";
            document.getElementById("beneficary_type_err").innerText = "";
            document.getElementById("maternity_plan_err").innerText = "";
            document.getElementById("insured_spouse_dob_err").innerText = "";
            document.getElementById("insured_spouse_age_err").innerText = "";
            document.getElementById("second_life_name_err").innerText = "";
            document.getElementById("second_life_dob_err").innerText = "";
            document.getElementById("second_life_age_mm_err").innerText = "";
            document.getElementById("second_life_age_yy_err").innerText = "";
            document.getElementById("second_life_sex_err").innerText = "";
            document.getElementById("second_life_height_err").innerText = "";
            document.getElementById("second_life_weight_err").innerText = "";
            document.getElementById("second_life_bmi_err").innerText = "";
            document.getElementById("second_life_sum_assured_err").innerText = "";
            for (var i = 0; i < child_name.length; i++) {
                document.getElementById("child_name_err" + i).innerText = "";
                document.getElementById("child_dob_err" + i).innerText = "";
                document.getElementById("child_age_err" + i).innerText = "";
                document.getElementById("child_sex_err" + i).innerText = "";
            }
            document.getElementById("basic_premium_err").innerText = "";
            document.getElementById("stamp_cost_err").innerText = "";
            document.getElementById("insurance_objective_err").innerText = "";
            document.getElementById("e_tin_err").innerText = "";
            document.getElementById("expiry_date_err").innerText = "";
            document.getElementById("premium_with_stamp_err").innerText = "";
            document.getElementById("total_sum_at_risk_err").innerText = "";
            document.getElementById("hi_premium_err").innerText = "";
            document.getElementById("ci_premium_err").innerText = "";
            document.getElementById("pdab_premium_err").innerText = "";
            document.getElementById("diab_premium_err").innerText = "";
            document.getElementById("total_premium_err").innerText = "";
            document.getElementById("und_requirements_err").innerText = "";
        }
        return result.status;
    });
}
async function personal_detail() {
    var data = {
        personal_form: true,
        proposal_no: document.querySelector("#proposal_no").value,
        full_name: document.querySelector("#full_name").value,
        nationality: document.querySelector("#nationality").value,
        father_name: document.querySelector("#father_name").value,
        mother_name: document.querySelector("#mother_name").value,
        email: document.querySelector("#email").value,
        sex: document.querySelector("#sex").value,
        marital_status: document.querySelector("#marital_status").value,
        education: document.querySelector("#education").value,
        birth_place: document.querySelector("#birth_place").value,
        religion: document.querySelector("#religion").value,
        permanent_post_code: document.querySelector("#permanent_post_code")
            .value,
        permanent_address: document.querySelector("#permanent_address").value,
        present_post_code: document.querySelector("#present_post_code").value,
        present_address: document.querySelector("#present_address").value,
        occupation: document.querySelector("#occupation").value,
        other_occupation: document.querySelector("#other_occupation").value,
        monthly_income: document.querySelector("#monthly_income").value,
        income_source: document.querySelector("#income_source").value,
        income_verify_method: document.querySelector("#income_verify_method").value,
        other_income_verify_method: document.querySelector("#other_income_verify_method").value,
        monthly_expense: document.querySelector("#monthly_expense").value,
        other_annual_expense: document.querySelector("#other_annual_expense")
            .value ? document.querySelector("#other_annual_expense")
            .value : 0,
        height: document.querySelector("#height").value,
        weight: document.querySelector("#weight").value,
        bmi_count: document.querySelector("#bmi_count").value,
        spouse_name: document.querySelector("#spouse_name").value,
        spouse_dob: document.querySelector("#spouse_dob").value,
        spouse_sex: document.querySelector("#spouse_sex").value,
        account_name: document.querySelector("#account_name").value,
        account_type: document.querySelector("#account_type").value,
        bank_name: document.querySelector("#bank_name").value,
        branch_name: document.querySelector("#branch_name").value,
        account_no: document.querySelector("#account_no").value,
        routing_no: document.querySelector("#routing_no").value,
    };
    if (user_channel == channel) {
        var famili_history_id = document.getElementsByName(
            "famili_history_id[]"
        );
        var family_relation = document.getElementsByName("relation[]");
        const total = document.getElementsByName("total[]");
        const family_age = document.getElementsByName("family_age[]");
        const health_condition =
            document.getElementsByName("health_condition[]");
        const age_at_death = document.getElementsByName("age_at_death[]");
        const cause_of_death = document.getElementsByName("cause_of_death[]");
        const year = document.getElementsByName("year[]");
        const famili_history_ids = [];
        const relations = [];
        const totals = [];
        const family_ages = [];
        const health_conditions = [];
        const age_at_deaths = [];
        const cause_of_deaths = [];
        const years = [];
        for (var i = 0; i < family_relation.length; i++) {
            famili_history_ids[i] = famili_history_id[i].value;
            relations[i] = family_relation[i].value;
            totals[i] = total[i].value;
            family_ages[i] = family_age[i].value;
            health_conditions[i] = health_condition[i].value;
            age_at_deaths[i] = age_at_death[i].value;
            cause_of_deaths[i] = cause_of_death[i].value;
            years[i] = year[i].value;
        }
        data = {
            ...data,
            famili_history_id: famili_history_ids,
            relation: relations,
            total: totals,
            age: family_ages,
            health_condition: health_conditions,
            age_at_death: age_at_deaths,
            cause_of_death: cause_of_deaths,
            year: years,
        };
    }
    $("#cover-spin").show();
    return await axios.post("/proposal", data).then(function (response) {
        var result = response.data;
        console.log(result);
        $("#cover-spin").hide();
        if (result.status == false) {
            document.getElementById("full_name_err").innerText =
                result.errors.hasOwnProperty("full_name")
                    ? result.errors.full_name[0]
                    : "";
            document.getElementById("nationality_err").innerText =
                result.errors.hasOwnProperty("nationality")
                    ? result.errors.nationality[0]
                    : "";
            document.getElementById("father_name_err").innerText =
                result.errors.hasOwnProperty("father_name")
                    ? result.errors.father_name[0]
                    : "";
            document.getElementById("mother_name_err").innerText =
                result.errors.hasOwnProperty("mother_name")
                    ? result.errors.mother_name[0]
                    : "";
            document.getElementById("email_err").innerText =
                result.errors.hasOwnProperty("email")
                    ? result.errors.email[0]
                    : "";
            document.getElementById("sex_err").innerText =
                result.errors.hasOwnProperty("sex") ? result.errors.sex[0] : "";
            document.getElementById("marital_status_err").innerText =
                result.errors.hasOwnProperty("marital_status")
                    ? result.errors.marital_status[0]
                    : "";
            document.getElementById("education_err").innerText =
                result.errors.hasOwnProperty("education")
                    ? result.errors.education[0]
                    : "";
            document.getElementById("birth_place_err").innerText =
                result.errors.hasOwnProperty("birth_place")
                    ? result.errors.birth_place[0]
                    : "";
            document.getElementById("religion_err").innerText =
                result.errors.hasOwnProperty("religion")
                    ? result.errors.religion[0]
                    : "";
            document.getElementById("permanent_post_code_err").innerText =
                result.errors.hasOwnProperty("permanent_post_code")
                    ? result.errors.permanent_post_code[0]
                    : "";
            document.getElementById("permanent_address_err").innerText =
                result.errors.hasOwnProperty("permanent_address")
                    ? result.errors.permanent_address[0]
                    : "";
            document.getElementById("present_post_code_err").innerText =
                result.errors.hasOwnProperty("present_post_code")
                    ? result.errors.present_post_code[0]
                    : "";
            document.getElementById("persent_address_err").innerText =
                result.errors.hasOwnProperty("present_address")
                    ? result.errors.present_address[0]
                    : "";
            document.getElementById("occupation_err").innerText =
                result.errors.hasOwnProperty("occupation")
                    ? result.errors.occupation[0]
                    : "";
            document.getElementById("other_occupation_err").innerText =
                result.errors.hasOwnProperty("other_occupation")
                    ? result.errors.other_occupation[0]
                    : "";
            document.getElementById("monthly_income_err").innerText =
                result.errors.hasOwnProperty("monthly_income")
                    ? result.errors.monthly_income[0]
                    : "";
            document.getElementById("income_source_err").innerText =
                result.errors.hasOwnProperty("income_source")
                    ? result.errors.income_source[0]
                    : "";
            document.getElementById("income_verify_method_err").innerText =
                result.errors.hasOwnProperty("income_verify_method")
                    ? result.errors.income_verify_method[0]
                    : "";
            document.getElementById("other_income_verify_method_err").innerText =
                result.errors.hasOwnProperty("other_income_verify_method")
                    ? result.errors.other_income_verify_method[0]
                    : "";
            document.getElementById("monthly_expense_err").innerText =
                result.errors.hasOwnProperty("monthly_expense")
                    ? result.errors.monthly_expense[0]
                    : "";
            document.getElementById("other_annual_expense_err").innerText =
                result.errors.hasOwnProperty("other_annual_expense")
                    ? result.errors.other_annual_expense[0]
                    : "";
            document.getElementById("height_err").innerText =
                result.errors.hasOwnProperty("height")
                    ? result.errors.height[0]
                    : "";
            document.getElementById("weight_err").innerText =
                result.errors.hasOwnProperty("weight")
                    ? result.errors.weight[0]
                    : "";
            document.getElementById("bmi_count_err").innerText =
                result.errors.hasOwnProperty("bmi_count")
                    ? result.errors.bmi_count[0]
                    : "";
            document.getElementById("spouse_name_err").innerText =
                result.errors.hasOwnProperty("spouse_name")
                    ? result.errors.spouse_name[0]
                    : "";
            document.getElementById("spouse_dob_err").innerText =
                result.errors.hasOwnProperty("spouse_dob")
                    ? result.errors.spouse_dob[0]
                    : "";
            document.getElementById("spouse_sex_err").innerText =
                result.errors.hasOwnProperty("spouse_sex")
                    ? result.errors.spouse_sex[0]
                    : "";
            document.getElementById("account_name_err").innerText =
                result.errors.hasOwnProperty("account_name")
                    ? result.errors.account_name[0]
                    : "";
            document.getElementById("bank_name_err").innerText =
                result.errors.hasOwnProperty("bank_name")
                    ? result.errors.bank_name[0]
                    : "";
            document.getElementById("bank_branch_name_err").innerText =
                result.errors.hasOwnProperty("branch_name")
                    ? result.errors.branch_name[0]
                    : "";
            document.getElementById("bank_account_type_err").innerText =
                result.errors.hasOwnProperty("account_type")
                    ? result.errors.account_type[0]
                    : "";
            document.getElementById("bank_account_no_err").innerText =
                result.errors.hasOwnProperty("account_no")
                    ? result.errors.account_no[0]
                    : "";
            document.getElementById("routing_no_err").innerText =
                result.errors.hasOwnProperty("routing_no")
                    ? result.errors.routing_no[0]
                    : "";
            if (user_channel == channel) {
                for (var i = 0; i < family_relation.length; i++) {
                    document.getElementById(
                        "family_relation_err" + i
                    ).innerText = result.errors.hasOwnProperty("relation." + i)
                            ? result.errors["relation." + i][0]
                            : "";
                    document.getElementById("family_total_err" + i).innerText =
                        result.errors.hasOwnProperty("total." + i)
                            ? result.errors["total." + i][0]
                            : "";
                    document.getElementById("family_age_err" + i).innerText =
                        result.errors.hasOwnProperty("family_age." + i)
                            ? result.errors["family_age." + i][0]
                            : "";
                    document.getElementById(
                        "family_health_condition_err" + i
                    ).innerText = result.errors.hasOwnProperty(
                        "health_condition." + i
                    )
                            ? result.errors["health_condition." + i][0]
                            : "";
                    document.getElementById("age_at_death_err" + i).innerText =
                        result.errors.hasOwnProperty("age_at_death." + i)
                            ? result.errors["age_at_death." + i][0]
                            : "";
                    document.getElementById(
                        "cause_of_death_err" + i
                    ).innerText = result.errors.hasOwnProperty(
                        "cause_of_death." + i
                    )
                            ? result.errors["cause_of_death." + i][0]
                            : "";
                    document.getElementById("year_of_death_err" + i).innerText =
                        result.errors.hasOwnProperty("year." + i)
                            ? result.errors["year." + i][0]
                            : "";
                }
            }
        } else {
            document.getElementById("full_name_err").innerText = "";
            document.getElementById("nationality_err").innerText = "";
            document.getElementById("father_name_err").innerText = "";
            document.getElementById("mother_name_err").innerText = "";
            document.getElementById("email_err").innerText = "";
            document.getElementById("sex_err").innerText = "";
            document.getElementById("marital_status_err").innerText = "";
            document.getElementById("education_err").innerText = "";
            document.getElementById("birth_place_err").innerText = "";
            document.getElementById("religion_err").innerText = "";
            document.getElementById("permanent_post_code_err").innerText = "";
            document.getElementById("permanent_address_err").innerText = "";
            document.getElementById("present_post_code_err").innerText = "";
            document.getElementById("persent_address_err").innerText = "";
            document.getElementById("occupation_err").innerText = "";
            document.getElementById("other_occupation_err").innerText = "";
            document.getElementById("monthly_income_err").innerText = "";
            document.getElementById("income_source_err").innerText = "";
            document.getElementById("income_verify_method_err").innerText = "";
            document.getElementById("other_income_verify_method_err").innerText = "";
            document.getElementById("monthly_expense_err").innerText = "";
            document.getElementById("other_annual_expense_err").innerText = "";
            document.getElementById("height_err").innerText = "";
            document.getElementById("weight_err").innerText = "";
            document.getElementById("bmi_count_err").innerText = "";
            document.getElementById("spouse_name_err").innerText = "";
            document.getElementById("spouse_dob_err").innerText = "";
            document.getElementById("spouse_sex_err").innerText = "";
            document.getElementById("account_name_err").innerText = "";
            document.getElementById("bank_account_type_err").innerText = "";
            document.getElementById("bank_name_err").innerText = "";
            document.getElementById("bank_branch_name_err").innerText = "";
            document.getElementById("bank_account_type_err").innerText = "";
            document.getElementById("bank_account_no_err").innerText = "";
            document.getElementById("routing_no_err").innerText = "";
            if (user_channel == channel) {
                for (var i = 0; i < family_relation.length; i++) {
                    document.getElementById(
                        "family_relation_err" + i
                    ).innerText = "";
                    document.getElementById("family_total_err" + i).innerText =
                        "";
                    document.getElementById("family_age_err" + i).innerText =
                        "";
                    document.getElementById(
                        "family_health_condition_err" + i
                    ).innerText = "";
                    document.getElementById("age_at_death_err" + i).innerText =
                        "";
                    document.getElementById(
                        "cause_of_death_err" + i
                    ).innerText = "";
                    document.getElementById("year_of_death_err" + i).innerText =
                        "";
                }
            }
        }
        return result.status;
    });
}
async function nominee() {
    let totalPercentage = 0.00;
    let shareFields = document.getElementsByClassName('nominee-share-field');

    for (i = 0; i < shareFields.length; i++) {
        totalPercentage += parseFloat(shareFields.item(i).value ? shareFields.item(i).value : 0)
    }
    if (totalPercentage !== 100.00) {
        Swal.fire('', "Total Share of all nominees is " + totalPercentage + ", It should must be 100", 'error');
        return 0;
    }
    const proposal_no = document.querySelector("#proposal_no").value;
    const nominee_control_no = document.getElementsByName("nominee_control_no[]");
    const name = document.getElementsByName("name[]");
    const nominee_identity_type = document.getElementsByName(
        "nominee_identity_type[]"
    );
    const nominee_identity_no = document.getElementsByName(
        "nominee_identity_no[]"
    );
    const relation_id = document.getElementsByName("relation_id[]");
    const f_name = document.getElementsByName("f_name[]");
    const m_name = document.getElementsByName("m_name[]");
    const occupation_id = document.getElementsByName("occupation_id[]");
    const gender = document.getElementsByName("gender[]");
    const present_address = document.getElementsByName("present_address[]");
    const birth_date = document.getElementsByName("birth_date[]");
    const age = document.getElementsByName("age[]");
    const contact_no = document.getElementsByName("contact_no[]");
    const share = document.getElementsByName("share[]");
    const nominee_control_nos = [];
    const names = [];
    const nominee_identity_types = [];
    const nominee_identity_nos = [];
    const relation_ids = [];
    const f_names = [];
    const m_names = [];
    const occupation_ids = [];
    const genders = [];
    const persent_addresss = [];
    const birth_dates = [];
    const ages = [];
    const contact_nos = [];
    const shares = [];
    for (var i = 0; i < name.length; i++) {
        nominee_control_nos[i] = nominee_control_no[i].value ? nominee_control_no[i].value : "";
        names[i] = name[i].value;
        nominee_identity_types[i] = nominee_identity_type[i].value;
        nominee_identity_nos[i] = nominee_identity_no[i].value;
        relation_ids[i] = relation_id[i].value;
        f_names[i] = f_name[i].value;
        m_names[i] = m_name[i].value;
        occupation_ids[i] = occupation_id[i].value;
        genders[i] = gender[i].value;
        persent_addresss[i] = present_address[i].value;
        birth_dates[i] = birth_date[i].value;
        ages[i] = age[i].value;
        contact_nos[i] = contact_no[i].value;
        shares[i] = share[i].value;
    }
    var data = new FormData();
    data.append("nominee_form", true);
    data.append("proposal_no", proposal_no);
    data.append("control_no", JSON.stringify(nominee_control_nos));
    data.append("name", JSON.stringify(names));
    data.append("identity_type", JSON.stringify(nominee_identity_types));
    data.append("identity_no", JSON.stringify(nominee_identity_nos));
    data.append("relation_id", JSON.stringify(relation_ids));
    data.append("f_name", JSON.stringify(f_names));
    data.append("m_name", JSON.stringify(m_names));
    data.append("occupation_id", JSON.stringify(occupation_ids));
    data.append("gender", JSON.stringify(genders));
    data.append("present_address", JSON.stringify(persent_addresss));
    data.append("birth_date", JSON.stringify(birth_dates));
    data.append("age", JSON.stringify(ages));
    data.append("contact_no", JSON.stringify(contact_nos));
    data.append("share", JSON.stringify(shares));

    data.append("guardian_id", document.querySelector("#guardian_id").value);
    data.append(
        "guardian_name",
        document.querySelector("#guardian_name").value
    );
    data.append(
        "guardian_identity_type",
        document.querySelector("#guardian_identity_type").value
    );
    data.append(
        "guardian_identity_no",
        document.querySelector("#guardian_identity_no").value
    );
    data.append(
        "guardian_relation_id",
        document.querySelector("#guardian_relation_id").value
            ? parseInt(document.querySelector("#guardian_relation_id").value)
            : ""
    );
    data.append(
        "guardian_f_name",
        document.querySelector("#guardian_f_name").value
    );
    data.append(
        "guardian_m_name",
        document.querySelector("#guardian_m_name").value
    );
    data.append(
        "guardian_occupation_id",
        document.querySelector("#guardian_occupation_id").value
            ? parseInt(document.querySelector("#guardian_occupation_id").value)
            : ""
    );
    data.append(
        "guardian_gender",
        document.querySelector("#guardian_gender").value
    );
    data.append(
        "guardian_persent_address",
        document.querySelector("#guardian_persent_address").value
    );
    data.append(
        "guardian_birth_date",
        document.querySelector("#guardian_birth_date").value
    );
    data.append("guardian_age", document.querySelector("#guardian_age").value);
    data.append(
        "guardian_contact_no",
        document.querySelector("#guardian_contact_no").value
    );
    $("#cover-spin").show();
    return await axios.post("/proposal", data).then(function (response) {
        var result = response.data;
        console.log(result);
        $("#cover-spin").hide();
        if (result.status == false) {
            for (var i = 0; i < name.length; i++) {
                document.getElementById("name_err" + i).innerText =
                    result.errors.hasOwnProperty("name." + i)
                        ? result.errors["name." + i][0]
                        : "";
                document.getElementById(
                    "nominee_identity_type_err" + i
                ).innerText = result.errors.hasOwnProperty("identity_type." + i)
                        ? result.errors["identity_type." + i][0]
                        : "";
                document.getElementById(
                    "nominee_identity_no_err" + i
                ).innerText = result.errors.hasOwnProperty("identity_no." + i)
                        ? result.errors["identity_no." + i][0]
                        : "";
                document.getElementById("relation_id_err" + i).innerText =
                    result.errors.hasOwnProperty("relation_id." + i)
                        ? result.errors["relation_id." + i][0]
                        : "";
                document.getElementById("f_name_err" + i).innerText =
                    result.errors.hasOwnProperty("f_name." + i)
                        ? result.errors["f_name." + i][0]
                        : "";
                document.getElementById("m_name_err" + i).innerText =
                    result.errors.hasOwnProperty("m_name." + i)
                        ? result.errors["m_name." + i][0]
                        : "";
                document.getElementById("occupation_id_err" + i).innerText =
                    result.errors.hasOwnProperty("occupation_id." + i)
                        ? result.errors["occupation_id." + i][0]
                        : "";
                document.getElementById("gender_err" + i).innerText =
                    result.errors.hasOwnProperty("gender." + i)
                        ? result.errors["gender." + i][0]
                        : "";
                document.getElementById("persent_address_err" + i).innerText =
                    result.errors.hasOwnProperty("present_address." + i)
                        ? result.errors["present_address." + i][0]
                        : "";
                document.getElementById("birth_date_err" + i).innerText =
                    result.errors.hasOwnProperty("birth_date." + i)
                        ? result.errors["birth_date." + i][0]
                        : "";
                document.getElementById("age_err" + i).innerText =
                    result.errors.hasOwnProperty("age." + i)
                        ? result.errors["age." + i][0]
                        : "";
                document.getElementById("contact_no_err" + i).innerText =
                    result.errors.hasOwnProperty("contact_no." + i)
                        ? result.errors["contact_no." + i][0]
                        : "";
                document.getElementById("share_err" + i).innerText =
                    result.errors.hasOwnProperty("share." + i)
                        ? result.errors["share." + i][0]
                        : "";

                document.getElementById("guardian_name_err").innerText =
                    result.errors.hasOwnProperty("guardian_name")
                        ? result.errors["guardian_name"][0]
                        : "";
                document.getElementById(
                    "guardian_identity_type_err"
                ).innerText = result.errors.hasOwnProperty(
                    "guardian_identity_type"
                )
                        ? result.errors["guardian_identity_type"][0]
                        : "";
                document.getElementById("guardian_identity_no_err").innerText =
                    result.errors.hasOwnProperty("guardian_identity_no")
                        ? result.errors["guardian_identity_no"][0]
                        : "";
                document.getElementById("guardian_relation_id_err").innerText =
                    result.errors.hasOwnProperty("guardian_relation_id")
                        ? result.errors["guardian_relation_id"][0]
                        : "";
                document.getElementById("guardian_f_name_err").innerText =
                    result.errors.hasOwnProperty("guardian_f_name")
                        ? result.errors["guardian_f_name"][0]
                        : "";
                document.getElementById("guardian_m_name_err").innerText =
                    result.errors.hasOwnProperty("guardian_m_name")
                        ? result.errors["guardian_m_name"][0]
                        : "";
                document.getElementById(
                    "guardian_occupation_id_err"
                ).innerText = result.errors.hasOwnProperty(
                    "guardian_occupation_id"
                )
                        ? result.errors["guardian_occupation_id"][0]
                        : "";
                document.getElementById("guardian_gender_err").innerText =
                    result.errors.hasOwnProperty("guardian_gender")
                        ? result.errors["guardian_gender"][0]
                        : "";
                document.getElementById(
                    "guardian_persent_address_err"
                ).innerText = result.errors.hasOwnProperty(
                    "guardian_persent_address"
                )
                        ? result.errors["guardian_persent_address"][0]
                        : "";
                document.getElementById("guardian_birth_date_err").innerText =
                    result.errors.hasOwnProperty("guardian_birth_date")
                        ? result.errors["guardian_birth_date"][0]
                        : "";
                document.getElementById("guardian_age_err").innerText =
                    result.errors.hasOwnProperty("guardian_age")
                        ? result.errors["guardian_age"][0]
                        : "";
                document.getElementById("guardian_contact_no_err").innerText =
                    result.errors.hasOwnProperty("guardian_contact_no")
                        ? result.errors["guardian_contact_no"][0]
                        : "";
            }
        } else {
            if (result.data.hasOwnProperty("nominee_ids")) {
                for (var i = 0; i < result.data.nominee_ids.length; i++) {
                    document.getElementById("nominee_id" + i).value =
                        result.data.nominee_ids[i];
                }
            }
            result.data.hasOwnProperty("guardian_id")
                ? (document.getElementById("guardian_id").value =
                    result.data.guardian_id)
                : "";
            for (var i = 0; i < name.length; i++) {
                document.getElementById("name_err" + i).innerText = "";
                document.getElementById(
                    "nominee_identity_type_err" + i
                ).innerText = "";
                document.getElementById(
                    "nominee_identity_no_err" + i
                ).innerText = "";
                document.getElementById("relation_id_err" + i).innerText = "";
                document.getElementById("f_name_err" + i).innerText = "";
                document.getElementById("m_name_err" + i).innerText = "";
                document.getElementById("occupation_id_err" + i).innerText = "";
                document.getElementById("gender_err" + i).innerText = "";
                document.getElementById("persent_address_err" + i).innerText =
                    "";
                document.getElementById("birth_date_err" + i).innerText = "";
                document.getElementById("age_err" + i).innerText = "";
                document.getElementById("contact_no_err" + i).innerText = "";
                document.getElementById("share_err" + i).innerText = "";

                document.getElementById("guardian_name_err").innerText = "";
                document.getElementById(
                    "guardian_identity_type_err"
                ).innerText = "";
                document.getElementById("guardian_identity_no_err").innerText =
                    "";
                document.getElementById("guardian_relation_id_err").innerText =
                    "";
                document.getElementById("guardian_f_name_err").innerText = "";
                document.getElementById("guardian_m_name_err").innerText = "";
                document.getElementById(
                    "guardian_occupation_id_err"
                ).innerText = "";
                document.getElementById("guardian_gender_err").innerText = "";
                document.getElementById(
                    "guardian_persent_address_err"
                ).innerText = "";
                document.getElementById("guardian_birth_date_err").innerText =
                    "";
                document.getElementById("guardian_age_err").innerText = "";
                document.getElementById("guardian_contact_no_err").innerText =
                    "";
            }
        }
        return result.status;
    });
}
async function questionnaire_for_gh() {
    const questionnaire_id = document.getElementsByName("questionnaire_id[]");
    const questionnaire_ids = [];
    const answers = [];
    for (var i = 0; i < questionnaire_id.length; i++) {
        questionnaire_ids[i] = questionnaire_id[i].value;
        answers[i] = document.querySelector(
            "#" + questionnaire_id[i].id
        ).checked;
    }

    var dgh_status = document.querySelector("#dgh_status").checked
        ? document.querySelector('input[name="dgh_status"]:checked').value
        : "";
    if (dgh_status == "") {
        dgh_status = document.querySelector("#dgh_status1").checked
            ? document.querySelector('input[name="dgh_status1"]:checked').value
            : "";
    }
    const proposal_no = document.querySelector("#proposal_no").value;
    var data = {
        dgh_form: true,
        questionnaire_id: JSON.stringify(questionnaire_ids),
        answer: JSON.stringify(answers),
        dgh_status: dgh_status,
        proposal_no: proposal_no,
    };
    $("#cover-spin").show();
    return await axios.post("/proposal", data).then(function (response) {
        var result = response.data;
        $("#cover-spin").hide();
        if (result.status == false) {
            document.getElementById("dgh_status_err").innerText =
                result.errors.hasOwnProperty("dgh_status")
                    ? result.errors.dgh_status[0]
                    : "";
        } else {
            document.getElementById("dgh_status_err").innerText = "";
        }
        return result.status;
    });
}
async function required_document() {
    const document_id = document.getElementsByName("document_id[]");
    const file_name = document.getElementsByName("file_name[]");
    const file_path = document.getElementsByName("file_path[]");
    const hard_copy = document.getElementsByName("hard_copy[]");
    const document_ids = [];
    const file_names = [];
    const file_paths = [];
    const hard_copys = [];
    for (var i = 0; i < file_path.length; i++) {
        document_ids[i] = document_id[i].value;
        file_names[i] = file_name[i].value;
        file_paths[i] = file_path[i].files[i] ? file_path[i].files[i] : "";
        hard_copys[i] = hard_copy[i].checked;
    }
    var data = new FormData();
    data.append("document_form", true);
    data.append("document_id", JSON.stringify(document_ids));
    data.append("proposal_no", document.querySelector("#proposal_no").value);
    data.append("file_name", JSON.stringify(file_names));
    data.append("file_path_lenth", file_path.length);
    data.append("hard_copy", JSON.stringify(hard_copys));
    for (var i = 0; i < file_path.length; i++) {
        data.append("file_path" + i, file_path[i].files[0]);
    }
    $("#cover-spin").show();
    return await axios.post("/proposal", data).then(function (response) {
        var result = response.data;
        console.log(result);
        $("#cover-spin").hide();
        if (result && result.status == false) {
            for (var i = 0; i < file_name.length; i++) {
                document.getElementById("file_path_err" + i).innerText =
                    result.errors.hasOwnProperty("file_path" + i)
                        ? result.errors["file_path" + i][0]
                        : "";
            }
        } else {
            for (var i = 0; i < file_name.length; i++) {
                document.getElementById("file_path_err" + i).innerText = "";
            }
            window.location = "/proposal/" + result.data.proposal_id;
        }
        return result.status;
    });
}
