const proposal_no=async (e)=>{
    if(document.querySelector('#new').checked == true){
        const proposal_id=$("#proposal_id").val();
        const result=await axios.get(`/check-proposal-no/${e.target.value}/${proposal_id}`);
        if(result.data.status==true){
            $("#proposal_no_err").text('The proposal no has already been taken.');
        }else{
            $("#proposal_no_err").text('');
        }
    }
}
export default proposal_no;