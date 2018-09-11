'use strict';

let Upload = function(Repository, Configuration) {
    let AmazonS3        = Repository.require('s3'),
        FileSystem      = Repository.require('fs'),
        AmazonClient    = AmazonS3.createClient(Configuration.client);

    const BUCKET_NAME   = Configuration.bucket.name;

    return (data, cb) => {
        dev.debug('Upload State => Start'.cyan);

        let percentage = (amount, total) => {
            return Math.ceil((amount / total) * 100);
        };

        let Uploader = AmazonClient.uploadFile({
            localFile: data.file.from,
            s3Params: {
                Bucket: BUCKET_NAME,
                Key:    data.file.to
            }
        })
        .on('error', (err) => {
            return cb((err) ? false : true, err);
        })
        .on('progress', () => {
            dev.debug('Upload State => Progress: '.cyan + '[%s]'.yellow, percentage(Uploader.progressAmount, Uploader.progressTotal));
        })
        .on('end', () => {
            dev.debug('Upload State => End'.cyan);
            return FileSystem.unlink(data.file.from, (err) => {
                return cb((err) ? false : true, err);
            });
        });
    };
};

module.exports = Upload;