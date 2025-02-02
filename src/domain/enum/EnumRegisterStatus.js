const Enum = require('../../domain/enum/Enum');

module.exports = Enum({
    SCHEDULED: 'scheduled',
    DENIED: 'denied',
    APPROVED: 'approved',
    DONE: 'done',
    REVIEW: 'review'
});