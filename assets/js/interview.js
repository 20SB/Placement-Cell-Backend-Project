$("#choose-company").on("submit", function (event) {
    event.preventDefault();
    let selectDiv = '#for-' + $("#slct-by-cmpny").val();
    showInterviewOf(selectDiv);
});


let lastOpenedStored = localStorage.getItem("lastOpened");

if(lastOpenedStored !== null ){
    showInterviewOf(lastOpenedStored);
}else{
    var abc = "#for-all";
    showInterviewOf(abc);
}

function showInterviewOf(selectDiv){
    let cName = selectDiv.substring(5);
    if(cName !== "all") {
        $("#c-name").html(`for <strong>${cName}</strong>`);
    }
    else{
        $("#c-name").html('');
    }
    
    $(".interview-table").addClass( "disp-none" );
    $(selectDiv).removeClass( "disp-none" );
    localStorage.setItem("lastOpened", selectDiv);
}
