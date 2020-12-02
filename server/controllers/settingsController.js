const { Settings, settingsValidation } = require('../dbModels/settings.js');

//default settings
var settings = {
    remoteLoginApiUrl: "https://",
    primaryTutorials: [],
    forcedLanguage: "English",

    bSystemBasedLanguage: true,
    
    bConnectToRemoteApi: true,

    bNativeRegistrationAllowed: true,
    bRemoteRegistrationAllowed: false,
    bNativeAccountsActive: true,
    bRemoteAccountsActive: false,

    bTutorialAccess: true,
    bBookStoreAccess: false,
    bMyBooksAccess: true,
    bQuizAccess: false,

    bAutoplayEnabled: false,
    autoplayDelay: 7,

    bProgressApiActive: false,
    bCreditApiActive: false,
}

/**
 * This function retrieves the active settings from database
 * or falls back to default settings if it can't find any.
 * It will be called on startup and shouldn't be used afterwards.
 */
async function initSettings() {
    let retrievedSettings = await Settings.findOne();

    if (retrievedSettings === null) {
        console.log('\x1b[33m%s\x1b[0m', "\n Couldn't get setting from database. Proceeding with default settings...");
        retrievedSettings = await saveSettings();

        if (retrievedSettings === null)
            throw new Error("Error saving default settings. Terminating application.");
    }

    settings = retrievedSettings;
}

/**
 * Saves the current settings to database
 */
async function saveSettings() {
    let newSettings = new Settings(settings);
    return await newSettings.save();
}

/**
 * Maps the settings retrieved from database to the current settings object
 * @param retrievedSettings The retrieved settings to map to the current settings object
 */
function mapSettings(retrievedSettings) {
    settings.remoteLoginApiUrl = retrievedSettings.remoteLoginApiUrl;
    settings.primaryTutorials = retrievedSettings.primaryTutorials;
    settings.forcedLanguage = retrievedSettings.forcedLanguage

    settings.bSystemBasedLanguage = retrievedSettings.bSystemBasedLanguage;

    settings.bConnectToRemoteApi = retrievedSettings.bConnectToRemoteApi;

    settings.bNativeRegistrationAllowed = retrievedSettings.bNativeRegistrationAllowed;
    settings.bRemoteRegistrationAllowed = retrievedSettings.bRemoteRegistrationAllowed;
    settings.bNativeAccountsActive = retrievedSettings.bNativeAccountsActive;
    settings.bRemoteAccountsActive = retrievedSettings.bRemoteAccountsActive;
    settings.bProgressApiActive = retrievedSettings.bProgressApiActive;
    settings.bCreditApiActive = retrievedSettings.bCreditApiActive;

}

/** 
 * Returns the current settings object
 * Implemented as async for consistency in route handler.
 */
async function getSettings() {
    return await settings;
}

/**
 * Returns Settings which are needed on the client excluding
 * sensitive settings like api urls and settings that just aren't
 * relevant for normal users.
 * Implemented as async for consistency in route handlers
 */
async function getClientRelevantSettings() {
    let clientRelevantSettings = {
        primaryTutorials: settings.primaryTutorials,
        forcedLanguage: settings.forcedLanguage,

        bSystemBasedLanguage: settings.bSystemBasedLanguage,
        bNativeAccountsActive: settings.bNativeAccountsActive,
        bRemoteAccountsActive: settings.bRemoteAccountsActive,

        bTutorialAccess: settings.bTutorialAccess,
        bBookStoreAccess: settings.bBookStoreAccess,
        bMyBooksAccess: settings.bMyBooksAccess,
        bQuizAccess: settings.bQuizAccess,
    
        bAutoplayEnabled: settings.bAutoplayEnabled,
        autoplayDelay: settings.autoplayDelay,
    }
    return await clientRelevantSettings;
}

/** 
 * Returns the current settings object
 * Should be used outside of routes
 */
function getSettingsSync() {
    return settings;
}

/**
 * updates the settings with the passed data.
 * @param {object} data 
 */
async function updateSettings(data) {
    let { error } = settingsValidation(data);
    if (error) {
        let err = new Error(error.details[0].message);
        err.code = 400;
        throw err;
    }
    let newSettings = await Settings.findOneAndUpdate(data);

    if (newSettings === null) {
        let err = new Error("internal server error");
        err.code = 500;
        throw err;
    }

    settings = newSettings;
    return settings;
}

//IIFE for Settings initialization
(async function() {
    await initSettings();
    console.log("\n Loaded Settings:")
    console.log(settings);
})();

module.exports.getSettings = getSettings;
module.exports.getSettingsSync = getSettingsSync;
module.exports.getClientRelevantSettings = getClientRelevantSettings;
module.exports.updateSettings = updateSettings;