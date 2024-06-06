/**
 * Simulate shipping notification.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * 
 * @throws {Error} - Throws an error if no data is provided.
 * - 400: No Data Provided!
 * 
 * @returns {void}
 * 
 */
async function shipNotice(req, res, next) {
    try {        
        if (!req.body) res.status(400).send('No Data Provided!');
        const doc = req.body.AdvanceShipNoticeHeader.DocumentID.ID;
        const answer = '000000' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();
        const response = {
            AdvanceShipNoticeHeader: {
                DocumentID: {
                    ID: {
                        '@accountingEntity': doc['@accountingEntity'],
                        '@location': doc['@location'],
                        $: answer
                    }
                },
                AlternateDocumentID: {
                    ID: doc.$
                }
            }
        }
        res.send(response);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    shipNotice
};