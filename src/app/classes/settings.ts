//Settings relevant to every client
export class Settings {
    primaryTutorials: string[];
    forcedLanguage: string;

    bSystemBasedLanguage: boolean;

    bNativeRegistrationAllowed: boolean;
    bRemoteRegistrationAllowed: boolean;

    bNativeAccountsActive: boolean;
    bRemoteAccountsActive: boolean;

    bTutorialAccess: boolean;
    bBookStoreAccess: boolean;
    bMyBooksAccess: boolean;
    bQuizAccess: boolean;

    bAutoplayEnabled: boolean;
    autoplayDelay: number;
}

//All Settings
export class AdminLevelSettings {
    remoteLoginApiUrl: string;
    primaryTutorials: string[];
    forcedLanguage: string;

    bSystemBasedLanguage: boolean;

    bConnectToRemoteApi: boolean;

    bNativeRegistrationAllowed: boolean;
    bRemoteRegistrationAllowed: boolean;
    bNativeAccountsActive: boolean;
    bRemoteAccountsActive: boolean;
    bProgressApiActive: boolean;
    bCreditApiActive: boolean;

    bTutorialAccess: boolean;
    bBookStoreAccess: boolean;
    bMyBooksAccess: boolean;
    bQuizAccess: boolean;

    bAutoplayEnabled: boolean;
    autoplayDelay: number;
}