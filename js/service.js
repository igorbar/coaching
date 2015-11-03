(function(){
angular
    .module('coaching')
    .service('dataService', dataService);
	
dataService.$inject = ['$http'];
	
function dataService($http) {
    var service = {
        create: create,
        getData: getData,
        update: update,
		remove: remove
    };

    return service;

    function create(item) {
        return $http.post('http://localhost:3000/users/', item);
    };
	
	function getData(id) {
        if(id){
            return $http.get('http://localhost:3000/users/'+id);
        }
        return $http.get('http://localhost:3000/users');
    };

    function update(item) {
        return $http.put('http://localhost:3000/users/'+item.id, item);
    };
	
	function remove(id) {
        return $http.delete('http://localhost:3000/users/'+id);
    };
}

})();