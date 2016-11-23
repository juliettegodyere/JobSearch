(function(){
    'use strict';

    var jobID = null;
    var _location= null;
    var  _queryValue= null;


    var indeedManeger = formelo.require("IndeedManeger");
    formelo.event().onCreate(function(){
        // Entry point of this application
        console.log(jobID);
        console.log(_location);
        showValues(_location, _queryValue);
        console.log(_queryValue);
         customise();

    });

    formelo.event().onIntent(function(params){
        // var data = params.detail.;
        jobID = params.detail.jobkey;
        _location = params.detail.location;
        _queryValue = params.detail.queryValue;

        // Receive parameters from calling page
    });

    formelo.event().onClose(function(){
        // Override close button
        // formelo.navigation.stopPropagation()
    });

   function showValues(value1, value2){
       var data = {
                co: "",
                chnl:"",
                callback:"",
                filter:"",
                format:"json",
                fromage:"",
                highlight:"",
                jt:"",
                l:value1,
                latlong:"",
                limit:"",
                q: value2,
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
            // console.log(JSON.stringify(result.results));
            showResult(result.results); 
            },      
        function(error){
            console.log(error);
        })

    }
    function showResult (_data){
        var formattedData = [];
        _data.forEach(function(item){
            console.log("hhjhdhjhdsdus"+jobID);
            console.log(item.jobkey);

            if(jobID===item.jobkey){
            formattedData.push({
                company : item.company,
                jobtitle : item.jobtitle,
                city:item.city,
                description : item.snippet,
                formattedRelativeTime:item.formattedRelativeTime,
                date:item.date,
                country:item.country,
                state:item.state,
                snippet:item.snippet,
                url:item.url,
                unique : item.jobkey, 
                // parameters : item.city,
            })
        }
        });
        console.log(JSON.stringify(formattedData));

        formattedData.forEach(function(itemms){
            console.log(itemms.company);
       

        var html = '<div>'+
                    '<h4 style="font-weight:20px"><b>'+itemms.jobtitle+'</b></h4>'+
                    '<div style="margin-top:10px; font-size:20px">'+itemms.company+ ' - '+ itemms.city+'</div>'+
                    '<div style="margin-top:10px; font-size:15px">'+itemms.state+ ' , '+ itemms.country+'</div>'+
                    '<div style="margin-top:10px; font-size:15px"><b>Required Experience</b></div>'+
                    '<div style="margin-top:10px, font-size:15px">'+itemms.snippet+'</div>'+
                    // '<div style="font-weight:10px; margin-top:10px">'+itemms.url+'</div>'+
                    '<div>'+'<a href='+itemms.url+' style="font-size:20px; margin-top:20px"><b>continue...</b></a></div>'+
                    '</div>';
                $("#search-resultss").html(html); 

        // formelo.ui().listAdapter(formattedData, '#search-resultss').attach(function(unique){
            // console.log(parameters);
            // formelo.navigation().openActivity("detail", {jobkey : unique, city : parameters});
            // console.log(unique);
            
        });
    }
    function customise(){
        formelo.html().get.header.title().html("Job Search");
    }
}());