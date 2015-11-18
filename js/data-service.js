(function(){
    angular
        .module('coaching')
        .service('dataService', dataService);

    dataService.$inject = ['$resource', '$q'];

    function dataService($resource, $q) {

        function execQuery(method, data, resource){
            var d = $q.defer();

            resource[method](
                data,
                function(response){
                    d.resolve(response);
                },
                function (response){
                    d.reject(response);
                }
            );

            return d.promise;
        }

        function createResource(url, params){
            return $resource(url, params);
        }

        function UserManager(url, params){
            this.sources = {
                main: createResource(url, params)
            }
        };

        UserManager.prototype.getUserById = function(id){
            return execQuery('get', {id: id}, this.sources.main);
        };

        UserManager.prototype.getAll = function(){
            return execQuery('query', {}, this.sources.main);
        };

        UserManager.prototype.remove = function(id){
            return execQuery('remove', {id: id}, this.sources.main);
        };

        UserManager.prototype.save = function(item){
            return execQuery('save', item, this.sources.main);
        };

        function Users(){
            UserManager.apply(this, ['http://localhost:3000/users/:id/']);
        }

        Users.prototype = Object.create(UserManager.prototype);
        Users.prototype.constructor = Users;


        function Admins(){
            UserManager.apply(this, ['http://localhost:3000/admins/:id/']);
        }

        Admins.prototype = Object.create(UserManager.prototype);
        Admins.prototype.constructor = Admins;

        return {
            Users: new Users(),
            Admins: new Admins()
        };

    }

})();
