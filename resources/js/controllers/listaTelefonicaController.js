angular.module("listaTelefonica").controller("listaTelefonicaController", function($scope, $http) {
            $scope.message = "Lista Telefonica";
            $scope.contatos = [];
            $scope.operadoras = [];
            $scope.addContact = function(contato) {
                $scope.contatos.push(contato);
                delete $scope.contato;
                $scope.contatoForm.$setPristine();
            };
            $scope.deleteContacts = function(contatos) {
                $scope.contatos = contatos.filter(function(contato) {
                    if (!contato.selecionado) {
                        return contato;
                    }
                });
            };
            $scope.isContatoSelecionado = function(contatos) {
                return contatos.some(function (contato) {
                   return contato.selecionado; 
                });
            };
            
            $scope.ordenarPor = function(ordenarPor) {
               $scope.criterioDeOrdenacao = ordenarPor;
               $scope.ordem = !$scope.ordem;
            };
            var carregarOperadoras = function() {
                $http.get("http://localhost:8080/lista-telefonica/operadoras").success(function(data) {
                   $scope.operadoras = data; 
                });
            };
            
            var carregarContatos = function() {
                $http.get("http://localhost:8080/lista-telefonica/contatos").success(function(data) {
                   $scope.contatos = data; 
                });
            }
            carregarOperadoras();
            carregarContatos();
        });