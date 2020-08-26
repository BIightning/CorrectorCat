export class TutorialSequence {
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
    targetText?: number;

    constructor(slides?: any, targetText?: number){
        this.slides = slides;
        this.targetText = targetText;
    }
}