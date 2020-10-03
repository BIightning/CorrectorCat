//https://medium.com/@kainikhil/nodejs-file-upload-and-virus-scan-9f23691394f3
const NodeClam = require('clamscan');

// clamscan module configs
const ClamScan = new NodeClam().init({
    debug_mode: true,
    scan_recursively: false,
    clamdscan: {
        socket: '/var/run/clamav/clamd.ctl',
        timeout: 120000,
        local_fallback: true,
        path: '/var/lib/clamav',
        config_file: '/etc/clamav/clamd.conf'
    },
});

// Scan file using clamscan module 
function scanFile(filePath) {
    return ClamScan.then(async clamscan => {
        const { is_infected, viruses } = await clamscan.scan_file(filePath);

        if (is_infected) {
            console.log(`The file is INFECTED with ${viruses}`);
            throw new Error('ERR_FILE_SCAN_INFECTED');
        } else {
            return 'CLEAN';
        }
    }).catch(err => {
        throw new Error(err);
    });
}