const previousId = document.getElementById('previousId');
const nextId = document.getElementById('nextId');
const finishId = document.getElementById('finishId');
const previous = document.getElementById('button-0');
const next = document.getElementById('button-1');
const finish = document.getElementById('button-2');
finishId.classList.add("inactive")
const setButton = (step, id) => {
    if (id == 'button-0') {
        previous.setAttribute('data-id', step == 0 ? '' : 'step-' + (step - 1))
        if (step == 0) {
            previousId.classList.remove("current")
            previousId.classList.add("disabled")
        } else if (step < 4) {
            nextId.classList.add("current")
            nextId.classList.remove("disabled")
        }
        finishId.classList.remove("current")
        finishId.classList.add("disabled")
        next.setAttribute('data-id', 'step-' + (step + 1))
    }
    if (id == 'button-1') {
        previous.setAttribute('data-id', 'step-' + (step - 1))
        previousId.classList.add("current")
        previousId.classList.remove("disabled")
        if (step == 4) {
            nextId.classList.remove("current")
            nextId.classList.add("disabled")
            nextId.classList.add("inactive")
            finishId.classList.add("current")
            finishId.classList.remove("disabled")
            finishId.classList.remove("inactive")
        }
        next.setAttribute('data-id', step == 4 ? '' : 'step-' + (step + 1))
    }

    if (id == 'button-2') {
        previous.setAttribute('data-id', '')
        next.setAttribute('data-id', 'step-1')

        previousId.classList.remove("current")
        previousId.classList.add("disabled")

        nextId.classList.add("current")
        nextId.classList.remove("disabled")

        finishId.classList.remove("current")
        finishId.classList.add("disabled")
    }
}

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


const checkAllStep = (index) => {
    for (iterator = 0; iterator <= index; iterator++) {
        const stepsCheck = document.getElementById('step-' + iterator);
        stepsCheck.classList.add("current")
        stepsCheck.classList.remove("disabled")
    }
    if(document.querySelector('#sex').value=='Male'){
        $('.questionniare-for-woman').hide();
    }else{
        $('.questionniare-for-woman').show();
    }
}

const get_nominees= async ()=>{
    const start = document.getElementsByName("file_path[]").length;
    const proposal_no = document.querySelector("#proposal_no").value;
    await axios.get('/proposal-nominee',{
        params:{
            proposal_no:proposal_no,
            start:start,
        }
    })
        .then(function (response) {
            var result = response.data;
            document.querySelector('#nominees').innerHTML=result.data.nominee_html;
        })
}


const triger = async (event) => {
    event.preventDefault();
    const current_id = document.getElementById(event.target.id);
    const current_data_id = current_id.getAttribute('data-id');
    const data_tab = current_id.getAttribute('data-tab');
    switch (current_data_id) {
        case 'step-0':
            setButton(0, event.target.id)
            setSection('step-0', 'section-0')
            checkAllStep(0)
            break;
        case 'step-1':
            var status = data_tab != 'previous' ? await my_proposal() : true;
            if (status) {
                document.querySelector('#section-1').setAttribute('data-id',true)
                setButton(1, event.target.id)
                setSection('step-1', 'section-1')
                checkAllStep(1)
                window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            }
            break;
        case 'step-2':
            var status = data_tab != 'previous' ? await personal_detail() : true;
            if (status) {
                document.querySelector('#section-2').setAttribute('data-id',true)
                setButton(2, event.target.id)
                setSection('step-2', 'section-2')
                checkAllStep(2)
                window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            }
            break;
        case 'step-3':
            var status = data_tab != 'previous' ? await nominee() : true;
            if (status) {
                (data_tab != 'previous'?await get_nominees():'');
                document.querySelector('#section-3').setAttribute('data-id',true)
                setButton(3, event.target.id)
                setSection('step-3', 'section-3')
                checkAllStep(3)
                window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            }
            break;
        case 'step-4':
            var status = data_tab != 'previous' ? await questionnaire_for_gh() : true;
            if (status) {
                document.querySelector('#section-4').setAttribute('data-id',true)
                setButton(4, event.target.id)
                setSection('step-4', 'section-4')
                checkAllStep(4)
                window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
            }
            break;
        case 'finish':
            const finishId=document.querySelector("#finishId");
            const class_name = finishId.getAttribute("class");
            var status = data_tab != 'previous'&&class_name=='current' ? await required_document() : true;
            if (status) {
                // setButton(0, event.target.id)
                // setSection('step-0', 'section-0')
                // checkAllStep(0)
            }
    }

}
const button_o = document.querySelector("#button-0");
button_o.addEventListener("click", triger, false);

const button_1 = document.querySelector("#button-1");
button_1.addEventListener("click", triger, false);

const button_2 = document.querySelector("#button-2");
button_2.addEventListener("click", triger, false);


const setTab = async (event) => {
    event.preventDefault();
    var index = parseInt(event.target.index);
    switch (index) {
        case 0:
            var status = false;
        case 1:
            var status = document.querySelector('#section-1').getAttribute('data-id')=='false'?false:true;
            break;
        case 2:
            var status = document.querySelector('#section-2').getAttribute('data-id')=='false'?false:true;
            break;
        case 3:
            var status = document.querySelector('#section-3').getAttribute('data-id')=='false'?false:true;
            break;
        case 4:
            var status = document.querySelector('#section-4').getAttribute('data-id')=='false'?false:true;
    }
    if (status) {
        setSection('step-' + index, 'section-' + index)
        previous.setAttribute('data-id', index == 0 ? '' : 'step-' + (index - 1))
        if (index < 1) {
            previousId.classList.remove("current")
            previousId.classList.add("disabled")
        } else {
            previousId.classList.add("current")
            previousId.classList.remove("disabled")
        }
        if (index == 4) {
            nextId.classList.remove("current")

            nextId.classList.add("disabled")
            nextId.classList.add("inactive")

            finishId.classList.add("current")
            finishId.classList.remove("disabled")
            finishId.classList.remove("inactive")
        } else {
            nextId.classList.add("current")
            nextId.classList.remove("disabled")
            nextId.classList.remove("inactive")
            finishId.classList.remove("current")
            finishId.classList.add("disabled")
            finishId.classList.add("inactive")
        }
        next.setAttribute('data-id', index == 4 ? '' : 'step-' + (index + 1))
        checkAllStep(index)
    }
}

const all_numbers = [0, 1, 2, 3, 4];
for (let index in all_numbers) {
    const tag = document.querySelector("#tag-" + index);
    tag.addEventListener("click", setTab, false);
    tag.index = index;
}


function poposalNumberSet(event, proposal_no='') {
    if (event.target.id=='new') {
        if(document.querySelector('#new').checked == false){
            $('#existing').click().triger();
        }else{
            var url = window.location.href;  
            const urlObj = new URL(url);
            urlObj.search = '';
            var result = urlObj.toString();
            window.location.href = result;
        }
        if(proposal_no!=''){
            document.querySelector('#proposal_no').value = proposal_no;
            document.querySelector('#proposal_no').disabled = true;
        }
    }else{
        if(document.querySelector('#existing').checked == false){
            $('#new').click().triger();
        }else{
            document.querySelector('#new').checked = false;
        }
        document.querySelector('#proposal_no').value ='';
        document.querySelector('#proposal_no').disabled = false;
    }
}

function getProposalUrl(event){
    if(document.querySelector('#new').checked == false){
        var url = window.location.href;  
        const urlObj = new URL(url);
        urlObj.search = '';
        var result = urlObj.toString();
        const urlParams = new URLSearchParams(window.location.search);
        result += '?'+urlParams+'&proposal_no='+event.target.value
        window.location.href = result;
    }
}



// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     event.keyCode === 123 ||
//     ctrlShiftKey(e, 'I') ||
//     ctrlShiftKey(e, 'J') ||
//     ctrlShiftKey(e, 'C') ||
//     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
//   )
//     return false;
// };
// document.addEventListener('keydown', function() {
//     if (event.keyCode == 123) {
//       return false;
//     } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
//       return false;
//     } else if (event.ctrlKey && event.keyCode == 85) {
//       return false;
//     }
//   }, false);
  
//   if (document.addEventListener) {
//     document.addEventListener('contextmenu', function(e) {
//       e.preventDefault();
//     }, false);
//   } else {
//     document.attachEvent('oncontextmenu', function() {
//       window.event.returnValue = false;
//     });
//   }