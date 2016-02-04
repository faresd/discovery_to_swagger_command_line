// set variables for environment
var path = require('path'),
    Converter = require('api-spec-converter'),
    FS = require('fs'),
    clipp = require('clipp').parse(),
    params = clipp.params;


var basePath = params.from? params.from : "./discovery",
    relativeBasePath = path.resolve(basePath);
var targetPath = params.to? params.to : "./generated_swagger",
    relativeTargetPath = path.resolve(targetPath);

function createDir(path, callback) {
    FS.mkdir(path, function(error) {
        if(error && error.code != "EEXIST") {
            console.error(error)
        } else callback();
    })
}

createDir(targetPath, function() {
    console.log("kajdslkfjlajsdlkjfakdf")

    FS.readdir(relativeBasePath, function(err, files) {
        if (err) console.error(err)
        files.filter(function(file) {
            console.log("kajdslkfjlajsdlkjfakdf")

            var fileExtention = path.extname(file);
            var discoveryType = file.lastIndexOf("rest")
            return fileExtention == ".discovery" && discoveryType > 0;
        }).forEach(function(file) {
            console.log("kajdslkfjlajsdlkjfakdf")
            Converter.convert({
                from: 'google',
                to: 'swagger_2',
                source: path.join(relativeBasePath, file)
            }, function(err, converted) {
                if (err) console.error(err)
                else {
                    if(!converted) console.log("The conversion of file : " + file + " has failed check if it is not empty!")
                    var newFileName = 'swagger_from_' + file,
                        absoluteFileName = path.join(relativeTargetPath, newFileName).replace('.discovery', '.json');

                    FS.writeFile(absoluteFileName, converted.stringify(), function(err){
                        if (err) {
                            console.error(err)
                        } else console.log("Done : swagger file " + absoluteFileName + " was created successfully!");
                    });
                }
            })
        })
    })
})
