// set variables for environment
var path = require('path'),
    Converter = require('api-spec-converter'),
    FS = require('fs'),
    clipp = require('clipp').parse(),
    params = clipp.params;


var basePath = params.from? params.from : "../discovery_to_swagger_command_line/discovery",
    relativeBasePath = path.resolve(basePath) + '/';
var targetPath = params.to? params.to : "../discovery_to_swagger_command_line/generated_swagger",
    relativetargetPath = path.resolve(targetPath) + '/';

FS.readdir(relativeBasePath, function(err, files) {
    if (err) console.error(err)
    files.forEach(function(file) {
        Converter.convert({
            from: 'google',
            to: 'swagger_2',
            source: relativeBasePath + file,
        }, function(err, converted) {
            if (err) console.error(err)
            else {
                if(!converted) console.log("The conversion of file : " + file + " has failed check if it is not empty!")
                var newFileName = 'swagger_from_' + file,
                    absoluteFileName = path.join(relativetargetPath, newFileName);
                FS.writeFile(absoluteFileName, converted.stringify(), function(err){
                    if (err) {
                        console.error(err)
                    } else console.log("Done : swagger file " + absoluteFileName + " was created successfully!");
                });

            }
        })
    })
})
