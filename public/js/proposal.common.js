function debounce(func, timeout = 600) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

//plan select with get supplimentary
function checkeUniquee(selectedId, alterNateId) {
    if (document.querySelector("#" + selectedId).checked) {
        document.querySelector("#" + alterNateId).checked = false;
    }
}


$("#is_staff").change((e) => {
    e.target.value == 1 ? ($("#producer_code").val(orphan_code).trigger('change'), $("#staff_code_field").removeClass('inactive')) :
        ($("#producer_code").val("").trigger('change'), $("#staff_code_field").addClass('inactive'));
})
$("#previous_policy_no").bind(
    "change keyup",
    debounce(async (event) => {
        if (event.target.value) {
            const response = await axios.get(
                "/proposal/get-previous-policies/" + event.target.value
            );
            const result = response.data;
            console.log(result)
            if (result.status) {
                $("#id_no").val(result.data.id_no);
                $("#previous_policy_number_err").text("");
                $("#prev_sum_assured").val(result.data.sum_at_risk);
                $("#prev_hi_sum_assured").val(result.data.prev_hi_sum_assured);
                $("#prev_ci_sum_assured").val(result.data.prev_ci_sum_assured);
                $("#prev_pdab_sum_assured").val(result.data.prev_pdab_sum_assured);
                $("#prev_diab_sum_assured").val(result.data.prev_diab_sum_assured);
                $("#prev_premium").val(result.data.prev_premium);
                $("#sum_risk_other_policy").val(
                    result.data.sum_at_risk
                );
            } else {
                $("#previous_policy_number_err").text(result.message);
            }
        }
    })
);
$("#sum_assured").bind(
    "change keyup",
    debounce(async (event) => {
        if (event.target.value) {
            const commencement_date = $("#com_date").val();
            const second_life_dob = $("#second_life_dob").val();
            if (!second_life_dob) {
                return 0;
            }
            var dob = new Date(second_life_dob).getTime();
            var dateToCompare = new Date(commencement_date).getTime();
            var age = parseInt(Math.floor((dateToCompare - dob) / (365 * 24 * 60 * 60 * 1000)));
            var birthdayDiff = 365 - parseInt(nextBirthdayDiffInDays(event.target.value));
            if (birthdayDiff >= 180) {
                var validation_age = age + 1;
            }else{
                var validation_age=age;
            }
            if (validation_age < 1 || validation_age > 15) {
                notice("Child age is invalid.");
                return 0;
            }
            const life_sum_assured = event.target.value;
            
            if ((validation_age >1|| validation_age ==1)&& validation_age < 6) {
                $("#second_life_sum_assured").val(life_sum_assured > 1500000 ? 1500000 : life_sum_assured)
            }
            if (validation_age > 5 && validation_age < 16) {
                $("#second_life_sum_assured").val(life_sum_assured > 2000000 ? 2000000 : life_sum_assured)
            }
        }
    }, 1000)
);
$("#second_life_dob").bind(
    "change keyup",
    debounce(async (event) => {
        if (event.target.value) {
            const commencement_date = $("#com_date").val();
            const second_life_dob = $("#second_life_dob").val();
            if (!second_life_dob) {
                return 0;
            }
            var dob = new Date(second_life_dob).getTime();
            var dateToCompare = new Date(commencement_date).getTime();
            var age = parseInt(Math.floor((dateToCompare - dob) / (365 * 24 * 60 * 60 * 1000)));
            var birthdayDiff = 365 - parseInt(nextBirthdayDiffInDays(event.target.value));
            if (birthdayDiff >= 180) {
                var validation_age = age + 1;
            }else{
                var validation_age=age;
            }
            if (validation_age < 1 || validation_age > 15) {
                notice("Child age is invalid.");
                return 0;
            }
            const life_sum_assured = $("#sum_assured").val();
            if ((validation_age >1|| validation_age ==1) && validation_age < 6) {
                var second_life_sum_assured=(life_sum_assured > 1500000 ? 1500000 : life_sum_assured);
                $("#second_life_sum_assured").val(second_life_sum_assured)
            }
            if (validation_age > 5 && validation_age < 16) {
                var second_life_sum_assured=(life_sum_assured > 2000000 ? 2000000 : life_sum_assured);
                $("#second_life_sum_assured").val(second_life_sum_assured)
            }
            $("#second_life_age_yy").val(age)
            $("#second_life_age_mm").val(Math.round(birthdayDiff / 30))
            if (parseInt(life_sum_assured) > parseInt(second_life_sum_assured)) {
                $("#basic_premium").val("")
                $("#sum_assured_err").text("The sum assured must not be greater than " + second_life_sum_assured + ".")
                return 0;
            } else {
                $("#sum_assured_err").text("")
            }
        }
    }, 1000)
);
$("#identity_no").bind(
    "change keyup",
    debounce(async (event) => {
        if (event.target.value) {
            const identity_type = $("#identity_type").val();
            const proposal_no = $("#proposal_no").val()?$("#proposal_no").val():'none';
            const response = await axios.get(
                "/proposal/get-previous-proposal-info/" + identity_type + "/" + event.target.value+"/"+proposal_no
            );
            const result = response.data;
            if (result.status) {
                $("#previous_proposal_no").val(result.data.previous_proposal_no);
                $("#prev_prop_sum_assured").val(result.data.sum_at_risk);
                $("#prev_prop_hi_sum_assured").val(result.data.prev_prop_hi_sum_assured);
                $("#prev_prop_ci_sum_assured").val(result.data.prev_prop_ci_sum_assured);
                $("#prev_prop_pdab_sum_assured").val(result.data.prev_prop_pdab_sum_assured);
                $("#prev_prop_diab_sum_assured").val(result.data.prev_prop_diab_sum_assured);
                $("#prev_prop_premium").val(result.data.prev_prop_premium);
                if (result.data.policy_no) {
                    $("#previous_policy_no").val(result.data.policy_no).trigger('change');
                }else{
                    $("#previous_policy_no").val('');
                    $("#id_no").val('');
                    $("#previous_policy_number_err").text("");
                    $("#prev_sum_assured").val('');
                    $("#prev_hi_sum_assured").val('');
                    $("#prev_ci_sum_assured").val('');
                    $("#prev_pdab_sum_assured").val('');
                    $("#prev_diab_sum_assured").val('');
                    $("#prev_premium").val('');
                }
            } else {
                $("#previous_proposal_no").val('');
                $("#prev_prop_sum_assured").val('');
                $("#prev_prop_hi_sum_assured").val('');
                $("#prev_prop_ci_sum_assured").val('');
                $("#prev_prop_pdab_sum_assured").val('');
                $("#prev_prop_diab_sum_assured").val('');
                $("#prev_prop_premium").val('');
                $("#previous_policy_no").val('');
                $("#previous_policy_no").val('');
                $("#id_no").val('');
                $("#previous_policy_number_err").text("");
                $("#prev_sum_assured").val('');
                $("#prev_hi_sum_assured").val('');
                $("#prev_ci_sum_assured").val('');
                $("#prev_pdab_sum_assured").val('');
                $("#prev_diab_sum_assured").val('');
                $("#prev_premium").val('');
            }
        }
    })
);

$("#income_verify_method").change((event) => {
    console.log(event.target.value)
    if (event.target.value == 'Others') {
        $("#other_income_verify_method_field").removeClass('inactive')
    } else {
        $("#other_income_verify_method_field").addClass('inactive')
    }
})
const isSavingsPlan = ((e) => {
    const selected_plan_id = document.querySelector("#plan_id");
    const plan_type = selected_plan_id.options[selected_plan_id.selectedIndex].getAttribute('plan_type');
    if (plan_type == 'Savings') {
        $("#expected_premium_field").removeClass('inactive');
    } else {
        $("#expected_premium_field").addClass('inactive');
    };
})

function selectChilds(event) {
    if (document.querySelector("#" + event.target.id).checked) {
        document.querySelector("#hiForm").classList.remove("inactive");
    } else {
        document.querySelector("#hiForm").classList.add("inactive");
    }
    premium_calculation();
}
$("#sex").change((event) => {
    if (event.target.value == "Male") {
        $("#spouse_sex").val("Female").trigger("change");
        $("#questionniare_id_10").hide();
    } else {
        $("#spouse_sex").val("Male").trigger("change");
        $("#questionniare_id_10").show();
    }
});

function onChangeBeneficary(event) {
    if (event.target.value == window.beneficary_types.couple) {
        document.querySelector("#couple").classList.remove("inactive");
        $("#spouse_section").removeClass("inactive");
        document
            .querySelector("#spouse_dob_section")
            .classList.remove("inactive");
        $("#spouse_age_section").removeClass("inactive");
        document.querySelector("#familyBeneficary").classList.add("inactive");
        $("#marital_status").val("Married").trigger("change");
    } else if (event.target.value == window.beneficary_types.family) {
        document.querySelector("#couple").classList.remove("inactive");
        document
            .querySelector("#spouse_dob_section")
            .classList.remove("inactive");
        $("#spouse_age_section").removeClass("inactive");
        $("#spouse_section").removeClass("inactive");
        document
            .querySelector("#familyBeneficary")
            .classList.remove("inactive");
        $("#marital_status").val("Married").trigger("change");
    } else if (event.target.value == window.beneficary_types.children) {
        document.querySelector("#couple").classList.add("inactive");
        document.querySelector("#spouse_dob_section").classList.add("inactive");
        $("#spouse_age_section").addClass("inactive");
        $("#spouse_section").addClass("inactive");
        document
            .querySelector("#familyBeneficary")
            .classList.remove("inactive");
        $("#maternity_plan").val("").trigger("change");
        $("#insured_spouse_dob").val("").trigger("change");
        $("#marital_status").val("Married").trigger("change");
    } else {
        document.querySelector("#couple").classList.add("inactive");
        document.querySelector("#spouse_dob_section").classList.add("inactive");
        document.querySelector("#spouse_age_section").classList.add("inactive");
        $("#spouse_section").addClass("inactive");
        document.querySelector("#familyBeneficary").classList.add("inactive");
        $("#maternity_plan").val("").trigger("change");
        $("#insured_spouse_dob").val("").trigger("change");
        $("#marital_status").val("Single").trigger("change");
    }
}
async function getOffices(event) {
    const response = await axios.get("/get-producers/" + event.target.value);
    const result = response.data;
    $("#producer_code").html(result.data);
}
$("#identity_type").change((event) => {
    event.target.value == "PASSPORT"
        ? $("#passport_expiry_active").removeClass("inactive")
        : $("#passport_expiry_active").addClass("inactive");
    event.target.value == "NID"
        ? $("#verify").removeClass("inactive")
        : $("#verify").addClass("inactive");
});

// Personal Details
$("#beneficiary_type").change((event) => {
    if (event.target.value == window.beneficary_types.couple || event.target.value == window.beneficary_types.family) {
        $("#spouse_section").removeClass("inactive");
    } else {
        $("#spouse_section").addClass("inactive");
    }
});
$("#marital_status").change((event) => {
    const beneficiary_type = $("#beneficiary_type").val();
    if ((beneficiary_type == window.beneficary_types.couple || beneficiary_type == window.beneficary_types.family) && event.target.value != "Married") {
        $("#marital_status").val('Married').trigger("change");
        $("#marital_status_err").text('You are not allow to change.');
        return 0;
    } else {
        $("#marital_status_err").text('');
    }

    if (event.target.value == "Married") {
        $("#spouse_section").removeClass("inactive");
    } else {
        $("#spouse_name").val("");
        $("#spouse_dob").val("");
        $("#spouse_sex").val("").trigger("change");
        $("#spouse_section").addClass("inactive");
    }
    const name = document.getElementsByName("name[]");
    for (var i = 0; i < name.length; i++) {
        filter_relations(i);
    }
});
$("#applicant_name").bind("change keyup", (event) => {
    document.querySelector("#full_name").value = event.target.value;
    $("#account_name").val(event.target.value);
});
$("#full_name").bind("change keyup", (event) => {
    $("#applicant_name").val(event.target.value);
    $("#account_name").val(event.target.value);
});

function filter_relations(i) {
    var marital_status = $("#marital_status").val();
    var plan = document.querySelector("#plan_id");
    var plan_no = plan.options[plan.selectedIndex].getAttribute('plan_no');
    if (marital_status != 'Widow' && marital_status != 'Separated' || plan_no == "31A" || plan_no == "31B" || plan_no == "31C") {
        $("#relation_id" + i).empty();
        $("#relation_id" + i).append('<option value="">Choose a Relation</option>');
        window.relations.filter((relation) => {
            if ((plan_no == "31A" || plan_no == "31B" || plan_no == "31C")) {

                if (relation.id == 2 || relation.id == 3) {
                    return $("#relation_id" + i).append(
                        "<option value='" +
                        relation.id +
                        "' >" +
                        relation.name +
                        "</option>"
                    );
                }
            } else {
                if (marital_status == "Married") {
                    return $("#relation_id" + i).append(
                        "<option value='" +
                        relation.id +
                        "' >" +
                        relation.name +
                        "</option>"
                    );
                }
                if (
                    marital_status == "Single" &&
                    relation.id != 1 &&
                    relation.id != 2 &&
                    relation.id != 3
                ) {
                    return $("#relation_id" + i).append(
                        "<option value='" +
                        relation.id +
                        "' >" +
                        relation.name +
                        "</option>"
                    );
                }

                if (marital_status == "Divorced" && relation.id != 1) {
                    return $("#relation_id" + i).append(
                        "<option value='" +
                        relation.id +
                        "' >" +
                        relation.name +
                        "</option>"
                    );
                }
            }

        });
        $("#relation_id" + i).trigger("change");
    }
}

$("#insured_spouse_dob").change((event) => {
    document.querySelector("#spouse_dob").value = document.querySelector(
        "#insured_spouse_dob"
    ).value;
});

function addChild() {
    var row_id = document.querySelector("#tracker").value;
    document.querySelector("#tracker").value = parseInt(row_id) + 1;
    var newRow = "";
    var id = Date.now();
    newRow +=
        '<div class="row familyBeneficaryExtra" id="childRow-' +
        id +
        '">' +
        '<div class="col-md-4">' +
        '<div class="mb-3">' +
        "<label >Name  </label>" +
        '<input type="hidden" name="control_no[]" value="' + (parseInt(row_id) + 1) + '">' +
        '<input type="text" name="child_name[]"  class="form-control"  placeholder="Enter child name">' +
        '<p class="text-danger" id="child_name_err' +
        row_id +
        '"> </p>' +
        "</div>" +
        "</div>" +
        '<div class="col-md-2">' +
        '<div class="mb-3">' +
        "<label >DOB</label>" +
        '<input type="date" name="child_dob[]" onchange="handleClildAge(' + row_id + ')" id="child_dob' +
        row_id +
        '"  class="form-control" >' +
        '<p class="text-danger" id="child_dob_err' +
        row_id +
        '"> </p>' +
        "</div>" +
        "</div>" +
        '<div class="col-md-2">' +
        '<div class="mb-3">' +
        "<label >Age</label>" +
        '<input readonly type="number" name="child_age[]" id="child_age' +
        row_id +
        '"  class="form-control" >' +
        '<p class="text-danger" id="child_age_err' +
        row_id +
        '"> </p>' +
        "</div>" +
        "</div>" +
        '<div class="col-md-2">' +
        '<div class="mb-3">' +
        "<label >Sex</label>" +
        '<select name="child_sex[]" class="form-control"  placeholder="">' +
        '<option value="">Choose Your Gender</option>' +
        '<option  value="male"> Male </option>' +
        '<option value="female"> Female </option>' +
        "</select>" +
        '<p class="text-danger" id="child_sex_err' +
        row_id +
        '"> </p>' +
        "</div>" +
        "</div>" +
        '<div class="col-md-2">' +
        '<div class="mb-3">' +
        '<label class="label-control text-white" >Action</label>' +
        '<div class="form-group mb-2">' +
        `<button type="button" class="btn btn-danger mb-2" onclick="deleteChild('#childRow-${id}', ${parseInt(row_id) + 1});premium_calculation()">Remove</button>` +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    $(".familyBeneficary").append(newRow);
    var currentVal = $("#noOfChild").val();
    currentVal = currentVal == "" ? 1 : currentVal;
    currentVal = parseInt(currentVal);
    currentVal = currentVal == "NaN" ? 1 : currentVal;

    currentVal = currentVal + 1;
    $("#noOfChild").val(currentVal);
}

async function deleteChild(selector, id = 0) {
    if (id != 0) {
        const proposal_no = $("#proposal_no").val();
        axios.delete("/proposal-child/" + proposal_no + "/" + id + "/delete").then(function (response) { });
    }
    var row_id = document.querySelector("#tracker").value;
    document.querySelector("#tracker").value = parseInt(row_id) - 1;
    var currentVal = $("#noOfChild").val();
    currentVal = parseInt(currentVal);
    currentVal = currentVal == "" ? 1 : currentVal;
    currentVal = currentVal - 1;
    $("#noOfChild").val(currentVal);
    $(selector).remove();
}

const planEmpy = () => {
    $("#plan_id").val("").trigger("change");
    clearTimeout(myTimeout);
};

function getProducerLayer() {
    const producer_code = document.querySelector("#producer_code").value;
    if (producer_code && producer_code != orphan_code) {
        $("#cover-spin").show();
        axios
            .get("/get-producer-layer", {
                params: {
                    producer_code: producer_code,
                },
            })
            .then(function (response) {
                if (response.data.status == true && response.data.data) {
                    document.querySelector("#producer_layer").innerHTML =
                        response.data.data;
                    $("#cover-spin").hide();
                }
            });
    } else {
        document.querySelector("#producer_layer").innerHTML = '';
    }
}

$("#birth_date").bind("change keyup", () => {
    $("#plan_id").val("").trigger("change");
})

function handleChangePlan(event) {
    if (!event.target.value) {
        return 0;
    }
    $("#expected_premium_field").addClass('inactive');
    if (event.target.options[event.target.selectedIndex].getAttribute('plan_no') == '14') {
        $("#child_information").removeClass('inactive');
    } else { $("#child_information").addClass('inactive'); }
    $("#expected_premium").val('');
    $("#sum_assured").val('').trigger('change');
    var birth_date = document.querySelector("#birth_date").value;
    var com_date = document.querySelector("#com_date").value;
    if (event.target.value) {
        if (birth_date) {
            var age = age_calculate(birth_date, com_date);
        }
        if (typeof age === "undefined") {
            notice(
                "Please fill up the birth date field before doing this action."
            );
            myTimeout = setTimeout(planEmpy, 1000);
            return 0;
        }
        const is_pension_selected = document.querySelector("#plan_id");
        const is_pension = parseInt(
            is_pension_selected.options[
                is_pension_selected.selectedIndex
            ].getAttribute("is_pension")
        );
        if (birth_date) {
            $("#term_label_text").text("Term");
            $("#annuity_pension_unit_sec").addClass("inactive");

            $("#cover-spin").show();
            axios
                .get("/get-plan-rate", {
                    params: {
                        plan_id: event.target.value,
                        age: age,
                    },
                })
                .then(function (response) {
                    $("#cover-spin").hide();
                    if (
                        response.data.status == true &&
                        response.data.data.term_html !=
                        '<option value="">Choose Your Term</option>'
                    ) {
                        document.getElementById("term").innerHTML =
                            response.data.data.term_html;
                        document.getElementById("pay_mode").innerHTML =
                            response.data.data.pay_mode_html;
                        supplimentary_lenth =
                            response.data.data.plan.supplementaries.length;
                        var resident_status = $('#resident_status').val();
                        $("#switch3").prop(
                            "checked",
                            (supplimentary_lenth > 0 && resident_status == 'Resident') ? true : false
                        );
                        if (
                            document.querySelector("#switch3").checked == true
                        ) {
                            document
                                .querySelector("#supplimentary")
                                .classList.remove("inactive");
                            document
                                .querySelector("#suppli_premium")
                                .classList.remove("inactive");
                        } else {
                            document
                                .querySelector("#supplimentary")
                                .classList.add("inactive");
                            document
                                .querySelector("#suppli_premium")
                                .classList.add("inactive");
                        }

                        if (
                            response.data.data.plan.supplementaries.includes(
                                "1"
                            )
                        ) {
                            document
                                .querySelector("#suppl_show_hi")
                                .classList.remove("inactive");
                        } else {
                            document
                                .querySelector("#suppl_show_hi")
                                .classList.add("inactive");
                        }
                        if (
                            response.data.data.plan.supplementaries.includes(
                                "2"
                            ) && resident_status == 'Resident'
                        ) {
                            document
                                .querySelector("#suppl_show_ci")
                                .classList.remove("inactive");
                        } else {
                            document
                                .querySelector("#suppl_show_ci")
                                .classList.add("inactive");
                        }
                        if (
                            response.data.data.plan.supplementaries.includes(
                                "3"
                            ) && resident_status == 'Resident'
                        ) {
                            document
                                .querySelector("#suppl_show_pdab")
                                .classList.remove("inactive");
                        } else {
                            document
                                .querySelector("#suppl_show_pdab")
                                .classList.add("inactive");
                        }
                        if (
                            response.data.data.plan.supplementaries.includes(
                                "4"
                            ) && resident_status == 'Resident'
                        ) {
                            document
                                .querySelector("#suppl_show_diab")
                                .classList.remove("inactive");
                        } else {
                            document
                                .querySelector("#suppl_show_diab")
                                .classList.add("inactive");
                        }
                        document.getElementById("questionniares").innerHTML =
                            response.data.data.questionniares_html;
                    } else {
                        notice("Age is invalid.");
                        myTimeout = setTimeout(planEmpy, 1000);
                    }
                });
        }

        if (is_pension) {
            $("#term_label_text").text("Pension Age");
            $("#annuity_pension_unit_sec").removeClass("inactive");
        }
    }
    if ($("#marital_status").val()) {
        const name = document.getElementsByName("name[]");
        for (var i = 0; i < name.length; i++) {
            filter_relations(i);
        }
    }
}

const handleClildAge = debounce((id) => {
    const child_dob = $("#child_dob" + id).val();
    var com_date = document.querySelector("#com_date").value;
    const child_age = age_calculate(child_dob, com_date);
    if (child_age.toString().length > 2) {
        return 0;
    }
    if (child_age < 1 || child_age > 18) {
        Swal.fire('The age must be minimum 6 month and maximum 18 years!', '', 'error')
        $("#child_dob" + id).val("");
        return 0;
    }
    $("#child_age" + id).val(child_age);
}, 1000)
$("#term").change((event) => {
    const check = $("#expected_premium").val() ? true : false;
    if (check) {
        const e_premium = $("#expected_premium").val();
        $("#expected_premium").val(e_premium).trigger('change')
    }
});

$("#annuity_pension_unit").bind("change keyup", (event) => {
    var total_sum_assured = parseFloat(event.target.value) * 10;
    $("#sum_assured").val(Math.round(total_sum_assured)).trigger('change');
});
$("#expected_premium").bind("change keyup", debounce((event) => {
    let expected_premium = event.target.value;
    const term_selected = document.querySelector("#term");
    const premium_rate = term_selected.options[term_selected.selectedIndex].getAttribute('premium_rate');
    const plan = document.querySelector("#plan_id");
    const plan_no = plan.options[plan.selectedIndex].getAttribute('plan_no');
    if (plan_no == '13') {
        var total_sum_assured = (parseFloat(expected_premium) * parseFloat(premium_rate)) / 100;
    } else {
        if (expected_premium > 0 && expected_premium < 50000) {
            $("#expected_premium_err").text('Minimum expected premium must be 50000 required.')
            var total_sum_assured = '';
        } else {
            $("#expected_premium_err").text('')
            var total_sum_assured = (parseFloat(expected_premium) * 1000) / parseFloat(premium_rate);
        }
    }
    $("#sum_assured").val(Math.round(total_sum_assured)).trigger('change');
}));


function switchSupplimentary() {
    if (document.querySelector("#switch3").checked == true && plan_id.value) {
        document.querySelector("#supplimentary").classList.remove("inactive");
        document.querySelector("#suppli_premium").classList.remove("inactive");
    } else if (
        document.querySelector("#switch3").checked == false &&
        document.querySelector("#hi").checked == false &&
        document.querySelector("#ci").checked == false &&
        document.querySelector("#pdab").checked == false &&
        document.querySelector("#diab").checked == false
    ) {
        document.querySelector("#supplimentary").classList.add("inactive");
        document.querySelector("#suppli_premium").classList.add("inactive");
    } else {
        document.querySelector("#switch3").checked = true;
    }
}

function emtyAge(event) {
    $("#" + event.target.id)
        .val("")
        .trigger("change");
}
const timeClear = (clearTime) => {
    clearTimeout(clearTime);
};

function ageCheck(event) {
    var com_date = document.querySelector("#com_date").value;
    var spouse_age = age_calculate(event.target.value, com_date);
    $("#insured_spouse_age").val(spouse_age)
    if (spouse_age < 18) {
        notice("Spouse age is invalid.");
        $("#insured_spouse_age").val('')
    }
}

function nomineeAgeCal(event, id) {
    var com_date = document.querySelector("#com_date").value;
    var nominee_age = age_calculate(event.target.value, com_date);
    if (id == "guardian_age") {
        document.querySelector("#guardian_age").value = nominee_age;
        if (nominee_age < 18) {
            notice("Guardian age is invalid.");
        }
    } else {
        if (nominee_age < 1) {
            const nominee_name = $(`#name${id}`).val();
            notice(`Birth Date is invalid of ${nominee_name}`);
            document.querySelector("#age" + id).value = '';
        }
        document.querySelector("#age" + id).value = nominee_age;
        isGuardainTimeOut = setTimeout(isGuardain, 2000);
    }
}

function nominee_relation(i) {
    var relation = $("#relation_id" + i).val();
    var full_name = $("#full_name").val();
    var spouse_name = $("#spouse_name").val();
    var gender = $("#sex").val();
    var spouse_dob = $("#spouse_dob").val();
    var spouse_sex = $("#spouse_sex").val();
    if (relation == 2 || relation == 3) {
        if (gender == "Male") {
            $("#f_name" + i).val(full_name);
            $("#m_name" + i).val(spouse_name);
        } else {
            $("#m_name" + i).val(full_name);
            $("#f_name" + i).val(spouse_name);
        }
        $("#birth_date" + i).val("").trigger("change");
        $("#gender" + i).val("").trigger("change");
        $("#name" + i).val("");
    } else if (relation == 1) {
        $("#name" + i).val(spouse_name);
        $("#birth_date" + i).val(spouse_dob).trigger("change");
        $("#gender" + i).val(spouse_sex).trigger("change");
        $("#f_name" + i).val("");
        $("#m_name" + i).val("");
    } else {
        $("#name" + i).val("");
        $("#f_name" + i).val("");
        $("#m_name" + i).val("");
    }
}

function isGuardain() {
    const birth_dates = document.getElementsByName("birth_date[]");
    var com_date = document.querySelector("#com_date").value;
    var is_guardian = false;
    for (var i = 0; i < birth_dates.length; i++) {
        if (age_calculate(birth_dates[i].value, com_date) < 18) {
            is_guardian = true;
        }
    }
    if (is_guardian == true) {
        document.querySelector("#guardian_form").classList.remove("inactive");
    } else {
        document.querySelector("#guardian_form").classList.add("inactive");
    }
    clearTimeout(isGuardainTimeOut);
}

function otherOccupation(event) {
    var other_occupation_from = document.querySelector(
        "#other_occupation_from"
    );
    if (event.target.value == 7) {
        other_occupation_from.classList.remove("inactive");
    } else {
        other_occupation_from.classList.add("inactive");
        document.querySelector("#other_occupation").value = "";
    }
}

const questionnaire = (countTotal) => {
    var len = $("[name='questionnaire_id[]']:checked").length;
    if (len == countTotal) {
        $("#dgh_status").prop("checked", true);
        $("#dgh_status1").prop("checked", false);
    } else {
        $("#dgh_status").prop("checked", false);
        $("#dgh_status1").prop("checked", true);
    }
};

$("#sum_assured").bind("change keyup", debounce((event) => {
    $("#supplimentary_id").empty();
    $("#supplimentary_id").append('<option value="">Select Plan</option>');
    for (var key in window.hi_plan_childs) {
        let plan = hi_plan_childs[key];
        if (parseInt(plan.sum_assured) <= parseInt(event.target.value) / 2) {
            $("#supplimentary_id").append('<option value="' + plan.id + '" max_sum_assured="' + plan.sum_assured + '" max_age="' + plan.max_age + '" each_child_premium="' + plan.hi_child_premium + '">' + plan.name + ' (' + parseInt(plan.sum_assured) + ')</option>');
        }
    }
    $("#supplimentary_id").trigger("change");
}))

function handleTypeOfAccount(event) {
    $("#bank_name").empty();
    if (event.target.value.toLowerCase() == "bank") {
        $("#bank_name").append('<option value="">Choose a Bank</option>');
        for (var key in window.banks_object) {
            let banks = banks_object[key];
            if (parseInt(banks.is_mfs) == 0) {
                $("#bank_name").append(
                    "<option value='" +
                    banks.id +
                    "' >" +
                    banks.name +
                    "</option>"
                );
            }
        }
        $("#bank_name").trigger("change");
        $("#bank_branch_name_div").show();
        $("#routing_no_div").show();
    } else if (event.target.value.toLowerCase() == "mfs") {
        $("#bank_name").append('<option value="">Choose a MFS</option>');
        for (var key in window.banks_object) {
            let banks = banks_object[key];
            if (parseInt(banks.is_mfs) == 1) {
                $("#bank_name").append(
                    "<option value='" +
                    banks.id +
                    "' >" +
                    banks.name +
                    "</option>"
                );
            }
        }
        $("#bank_name").trigger("change");
        $("#bank_branch_name_div").hide();
        $("#routing_no_div").hide();
        $("#branch_name").val("");
        $("#routing_no").val("");
    } else {
        $("#bank_name").append('<option value="">Choose a Bank</option>');
        for (var key in window.banks_object) {
            let banks = banks_object[key];
            $("#bank_name").append(
                "<option value='" + banks.id + "' >" + banks.name + "</option>"
            );
        }
        $("#bank_name").trigger("change");
        $("#bank_branch_name_div").show();
        $("#routing_no_div").show();
    }
}

const get_photo = (e) => {
    const avatar = URL.createObjectURL(e.target.files[0]);
    const extension = e.target.files[0].type;
    if (extension != "application/pdf") {
        document
            .querySelector("#" + e.target.id + "_output")
            .classList.remove("inactive");
        document
            .querySelector("#" + e.target.id + "_pdf_output")
            .classList.add("inactive");
        $("#" + e.target.id + "_output").attr("src", avatar);
    } else {
        document
            .querySelector("#" + e.target.id + "_output")
            .classList.add("inactive");
        document
            .querySelector("#" + e.target.id + "_pdf_output")
            .classList.remove("inactive");
        $("#" + e.target.id + "_pdf_output").attr("src", avatar);
    }
};

const bmi_calculation = async (id, second = '') => {
    const height = document.querySelector("#" + second + "height").value
        ? parseFloat(document.querySelector("#" + second + "height").value)
        : 0;
    const cmHeight = height * 2.54;
    const kgWeight = document.querySelector("#" + second + "weight").value
        ? parseFloat(document.querySelector("#" + second + "weight").value)
        : 0;
    const bmi = await calculateBMI(cmHeight, kgWeight);
    document.querySelector("#" + id).value = bmi;
};

const calculateBMI = async (cmHeight, kgWeight) => {
    let bmi = (kgWeight / ((cmHeight * cmHeight) / 10000)).toFixed(2);
    return bmi;
};
