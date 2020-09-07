export class TutorialSequence {
    position: number;
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
    }];
    targetTextTitle: string;

    constructor(slides?: any, targetText?: string){
        this.slides = slides;
        this.targetTextTitle = targetText;
    }
}