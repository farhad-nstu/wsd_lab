import proposal_no from "./proposal/proposalForm.js";
import debounce from "./debounce.js";
$("#proposal_no").bind("change keyup",debounce((e)=>{
    proposal_no(e);
}));