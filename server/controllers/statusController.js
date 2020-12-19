const Settings = require('./settingsController');
const urlUtil = require('../utils/urlAvailabilityCheck');

async function getDatabaseStatus() {
    return g_dbConnected;
}
async function getRemoteUserServerStatus() {
    const settings = Settings.getSettingsSync();
    let connection = await urlUtil.checkAvailability(settings.remoteLoginApiUrl)
        .catch(err => {
            console.log(`Could not connect to ${settings.remoteLoginApiUrl}!`);
            return false;
        })
        
    if (connection.status === 200)
        return true;

    else
        return false;


}

exports.getDatabaseStatus = getDatabaseStatus;
exports.getRemoteUserServerStatus = getRemoteUserServerStatus;