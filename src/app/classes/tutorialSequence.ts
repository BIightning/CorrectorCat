export class TutorialSequence {
    _id?: string;
    tutorialTitle: string;
    slides: [{
        slideTitle?: string;
        sceneType: number;
        catAnimation?: string;
        catImage: string;
        slideText: {
            german: string;
            english: string;
            portuguese: string;
            greek: string;
        };
        widgetID: number;
        widgetData?: any;
    }];
    targetTextTitle: string;

    constructor(slides?: any, targetText?: string){
        this.slides = slides;
        this.targetTextTitle = targetText;
    }
}