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
        const doc = req.body.DataArea.AdvanceShipNotice.AdvanceShipNoticeHeader.DocumentID.ID;
        const sender = req.body.ApplicationArea.Sender;
        const answer = '000000' + (Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000).toString();
        const response = {
            '@releaseID': '9.2',
            '@versionID': '2.13.0',
            ApplicationArea: {
                Sender: {
                    LogicalID: 'lid://infor.wm.vmzegwmsdb22-wmprd',
                    ComponentID: 'Warehouse Management'
                },
                CreationDateTime: new Date().toISOString(),
                BODID: `infor-nid:INFOR:${doc['@accountingEntity']}:${doc['@location']}:${answer}:1?AdvanceShipNotice&verb=Acknowledge`
            },
            DataArea: {
                Acknowledge: {
                    TenantID: 'INFOR',
                    AccountingEntityID: doc['@accountingEntity'],
                    LocationID: {
                        '@accountingEntity': doc['@accountingEntity'],
                        '#text': doc['@location']
                    },
                    OriginalApplicationArea: {
                        Sender: {
                            LogicalID: doc['@lid'],
                            ComponentID: sender.ComponentID,
                            ConfirmationCode: sender.ConfirmationCode
                        },
                        CreationDateTime: req.body.ApplicationArea.CreationDateTime,
                        BODID: req.body.ApplicationArea.BODID
                    },
                    ResponseCriteria: {
                        ResponseExpression: {
                            '@actionCode': 'Accepted',
                            '#text': 'Accepted'
                        }
                    }
                },
                AdvanceShipNotice: {
                    AdvanceShipNoticeHeader: {
                        DocumentID: {
                            ID: {
                                '@accountingEntity': doc['@accountingEntity'],
                                '@location': doc['@location'],
                                '#text': answer
                            }
                        },
                        AlternateDocumentID: {
                            ID: doc['#text']
                        }
                    }
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