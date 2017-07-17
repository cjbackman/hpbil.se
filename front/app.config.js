//Add below line at the top of your JavaScript code
Dropzone.autoDiscover = false;
//This will prevent Dropzone to instantiate on it's own unless you are using dropzone class for styling

var config = function($stateProvider, $urlRouterProvider, $httpProvider, dropzoneOpsProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
    .state("start", {
        url: "/",
        templateUrl: "front/views/start.html"
    })
    .state("cars", {
        url: "/cars",
        component: "cars"
    })
    .state("car", {
        url: "/cars/:id",
        component: "cars",
        resolve: {
            id: function ($stateParams) {
                return $stateParams.id;
            }
        }
    })
    .state("rent", {
        url: "/rent",
        templateUrl: "front/views/rent.html"
    })
    .state("login", {
        url: "/login",
        component: "login"
    })
    .state("admin", {
        url: "/admin",
        component: "admin"
    });

    $httpProvider.interceptors.push(function($localStorage) {
        return {
            'request': function(config) {
                if ($localStorage.currentUser) {
                    config.headers['Authorization'] = $localStorage.currentUser.token;
                }
                return config;
            }
        };
    });

    //Dropzone
    dropzoneOpsProvider.setOptions({
        url : 'api/uploadFiles.php',
        paramName : 'photo',
        maxFilesize : '10',
        resizeWidth: 500,
        acceptedFiles : 'image/jpeg, images/jpg, image/png',
        addRemoveLinks : true,
        autoProcessQueue : false,
        dictDefaultMessage : "Släpp bilder här för att ladda upp, alternativt klicka i rutan",
        dictFallbackMessage : "Din webbläsare stöder inte drag'n'drop av filer",
        dictFallbackText : "Använd formen nedan för att ladda upp dina filer",
        dictRemoveFile : "Ta bort fil",
        dictMaxFilesExceeded : "Du kan inte ladda upp fler filer",
        dictCancelUpload : "Avbryt uppladdning",
        dictCancelUploadConfirmation : "Är du säker på att du vill avbryta den här uppladdning?",
        dictFileTooBig : "Filen är för stor ({{filesize}}MiB). Max filstorlek: {{maxFilesize}}MiB."
    });
}

angular.module("app.config", [])
.config(config);