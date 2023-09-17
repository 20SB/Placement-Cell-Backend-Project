$("#choose-company").on("submit", function (event) {
    console.log("apply clicked");
    event.preventDefault();
    let selectDiv = '#for-' + $("#slct-by-cmpny").val();
    showInterviewOf(selectDiv);
});


let lastOpenedStored = localStorage.getItem("lastOpened");

if(lastOpenedStored !== null ){
    console.log("lastOpened: "+ lastOpenedStored);
    showInterviewOf(lastOpenedStored);
}else{
    console.log("nothing stored");
    var abc = "#for-all";
    showInterviewOf(abc);
}

function showInterviewOf(selectDiv){
    $(".interview-table").addClass( "disp-none" );
    $(selectDiv).removeClass( "disp-none" );
    localStorage.setItem("lastOpened", selectDiv);
}
