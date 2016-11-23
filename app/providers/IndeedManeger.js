(function() {

    var IndeedManeger = {};

    IndeedManeger.keys = {
    	mashape : "dPyeABLIhPmsh4Y9Qhae8nNiuiefp1hdXhAjsnang5n788F73n",
    	publisher : "9028851456320642",
    }
    IndeedManeger.searchUrl = "https://indeed-indeed.p.mashape.com/apisearch";

    IndeedManeger.network = function(endpoint, _data, _method){
       var data    = _data      || {};
       data['publisher'] = IndeedManeger.keys.publisher;
       var method  = _method    || 'GET';
       var txDeferred = $.Deferred();
       var headers = {};
       headers['X-Mashape-Key'] = IndeedManeger.keys.mashape;
       $.ajax({
               url : endpoint,
               type : method,
               data : data,
               cache: false,
               headers: headers,
               success : function(data){
                   txDeferred.resolve(data);
               },
               error: function(xhr){
                   console.log(xhr);
                   txDeferred.reject(xhr);
               },
               timeout: TIMEOUT
           });
       return txDeferred.promise();
   };
   IndeedManeger.search = function(data, successCB, errorCB){
   		$.when(IndeedManeger.network(IndeedManeger.searchUrl, data))
   		.done(function(dat){
        successCB(dat)
      })
   		.fail(function(error){
        errorCB(error)
      });
   };
    formelo.exports('IndeedManeger', IndeedManeger);
})();