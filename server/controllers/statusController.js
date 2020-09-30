async function getDatabaseStatus() {
    return new Promise(async(resolve, reject) => {
        resolve(g_dbConnected);
    });
}
async function getRemoteUserServerStatus() {
    return new Promise(async(resolve, reject) => {
        resolve(false);
    });
}



exports.getDatabaseStatus = getDatabaseStatus;
exports.getRemoteUserServerStatus = getRemoteUserServerStatus;