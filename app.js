// set variables for environment
var path = require('path');
var Converter = require('api-spec-converter');
var FS = require('fs');
var clipp = require('clipp').parse();
var params = clipp.params

var basePath = params.from? params.from : "/Volumes/repos/Projects/discovery_to_swagger_command_line/discovery/";
var targetPath = params.to? params.to : "/Volumes/repos/Projects/discovery_to_swagger_command_line/generated_swagger/";
FS.readdir(basePath, function(err, files) {
    if (err) console.error(err)
    files.forEach(function(file) {
        Converter.convert({
            from: 'google',
            to: 'swagger_2',
            source: basePath + file,
        }, function(err, converted) {
            if (err) console.error(err)
            else {
                if(!converted) console.log("The conversion of file : " + file + " has failed check if it is not empty!")
                var fileName = targetPath + 'swagger_from_' + file;
                FS.writeFile(fileName, converted.stringify(), function(err){
                    if (err) {
                        console.error(err)
                    } else console.log("Done : swagger file " + fileName + " was created successfully!");
                });

            }
        })
    })
})
