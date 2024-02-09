const setSection = (id, section) => {
    const numbers = [0, 1, 2, 3, 4];
    for (let i in numbers) {
        const rg_id = document.getElementById('step-' + i);
        rg_id.classList.remove("current")
        rg_id.classList.add("disabled")
        const rg_section = document.getElementById('section-' + i)
        rg_section.classList.remove("current")
        rg_section.classList.add("inactive")
    }
    const r_id = document.getElementById(id);
    r_id.classList.remove("disabled")
    r_id.classList.add("current")
    const r_section = document.getElementById(section)
    r_section.classList.remove("inactive")
    r_section.classList.add("current")
}

const setTab = async (event) => {
    event.preventDefault();
    var index = parseInt(event.target.index);
    document.querySelector('#button_id').value=index;
        setSection('step-' + index, 'section-' + index)
}

const all_numbers = [0, 1, 2, 3, 4];
for (let index in all_numbers) {
    const tag = document.querySelector("#tag-" + index);
    tag.addEventListener("click", setTab, false);
    tag.index = index;
}

const submit_all=async ()=>{
    const button_id = parseInt(document.querySelector('#button_id').value);
    var status=false;
    if(button_id==0) {
            var status = await my_proposal();
        }else if(button_id==1){
        var status = await personal_detail();
    }else if(button_id==2){
        var status = await nominee();
    }else if(button_id==3){
        var status = await questionnaire_for_gh();
    }else if(button_id==4){
        var status = await required_document();
    }else{
    }
    if(status){
        Swal.fire({
            position: 'top-end',
            html: '<div class="container"><div><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="5 5 40 40"><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div><div class="textDiv">Your changes has been saved</div></div>',
            
            showConfirmButton: false,
            timer: 1500,
            customClass: {
                popup: 'swal-wide',
                icon: 'icon-class'
              }
        })
    }
}




