(function(){
    'use strict';

    var _jobType = null;
    var _city = null;
    var indeedManeger = formelo.require("IndeedManeger");
    formelo.event().onCreate(function(){
        // Entry point of this application
        //fetchValue();
        customise();
        console.log(_jobType);
        console.log(_city);
        showValues(_jobType, _city);
    
    });

    formelo.event().onIntent(function(params){
         _jobType = params.detail.jobType;
         _city = params.detail.city;
        // Receive parameters from calling page
    });

    formelo.event().onClose(function(){
        // Override close button
        // formelo.navigation.stopPropagation()
    });
    function showValues(Type, location){
       var data = {
                co: "",
                chnl:"",
                callback:"",
                filter:"",
                format:"json",
                fromage:"",
                highlight:"",
                jt:"",
                l:location,
                latlong:"",
                limit:"",
                q: Type,
                radius:25,
                sort:"",
                st:"",
                start:"",
                useragent:"",
                userip:"",
                v:2


            }

    indeedManeger.search(data,
        function(result){
            console.log(result);
            // var resn = JSON.stringify(result.results);
            // var resn = JSON.stringify(result.location);
            // console.log(resn);
            alert(result.location);
            alert(result.query);
            showResult(result.results, result.location, result.query); 
        },
        function(error){
            console.log(error);
        })

    }
    function showResult (_data, location, queryValue){
        var formattedData = [];
        _data.forEach(function(item){
            formattedData.push({
                // image : item.company,
                name : item.jobtitle,
                description : item.city,
                unique : item.jobkey, 
                time: item.formattedRelativeTime,
                parameters : item.city,
                // parameters : item.city,
            })
        });
            
        formelo.ui().listAdapter(formattedData, '#search-results').attach(function(unique){
            // console.log(parameters);
            console.log(location);
            console.log(queryValue);
            formelo.navigation().openActivity("detail", {jobkey : unique, location : location, queryValue:queryValue});
            console.log(unique);
            
        });
    }
    function customise(){
        formelo.html().get.header.title().html("Job Search");
}
}());

