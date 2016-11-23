(function(){
    'use strict';
    var indeedManeger = formelo.require("IndeedManeger");
    formelo.event().onCreate(function(){
        // Entry point of this application
        $("#submit").click(function(){
            var value1 = $("#jobTitle").val();
            var value2= $("#city").val();
            // alert(value);
            if(value1.length>3 || value2.length>3){
                formelo.navigation().openActivity("search", {jobType : value1, city : value2});
            }
        });
    });

    formelo.event().onIntent(function(params){
        var data = params.detail;
        // Receive parameters from calling page
    });

    formelo.event().onClose(function(){
        // Override close button
        // formelo.navigation.stopPropagation()
    });
}());