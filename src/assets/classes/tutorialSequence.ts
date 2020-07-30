export class TutorialSequence {
    slides: [{
        slideTitle?: string;
        catPosition: number;
        catImage: string;
        slideText: string;
        specialAction?: number;
    }];
    constructor(_slides?: any, targetText?: number){
        this.slides = _slides;
    }
    targetText?: number;
}