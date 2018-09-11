'use strict';

let Schema = function(Repository) {

    let mongoose = Repository.get('database.mongo-one'),
        Schema   = mongoose.Schema;

    let Validate = {
        email: (value) => {
            let Rule = () => {
                let regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?\^_`{|}~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?)*$/);
                return regex.test(value);
            };

            let Message = () => {
                return 'Email invalid';
            };

            return  {
                rule:    Rule,
                message: Message
            };
        }
    };

    const STATUS_ENUM = {
        values: [
            0, // Inactive
            1  // Active
        ],
        message: 'Enum validator failed for path `{PATH}` with value `{VALUE}`'
    };

    const GENDER_ENUM = {
        values: [
            1, // Male
            2  // Female
        ],
        message: 'Enum validator failed for path `{PATH}` with value `{VALUE}`'
    };

    return new Schema({
        name: {
            type: String,
            default: null
        },
        email: {
            type:       String,
            required:   true,
            validate:   [
                Validate.email.rule(),
                Validate.email.message()
            ]
        },
        status: {
            type: Number,
            required: true,
            enum: STATUS_ENUM
        },
        gender: {
            type:       Number,
            required:   true
            enum:       GENDER_ENUM
        }
    });
};

module.exports = Schema;
