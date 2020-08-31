//OLD Version of book class. Can be deleted as soon as new implementation works
export class Book {
    id: number;
    title: string;
    author: string;
    language: string;
    starting: boolean;
    cost: number;
    difficulty: string;
    image: string;
    description: string;
    pointsNeededForQuiz: number;
    
    textChunks: [{
        text: string;
        audioCorrect: string;
        audioWrong: string;
        points: number;
        error: string[];
    }];

    quiz: [{
        question: string;
        points: number;
        answers: string[];
        correctAnswer: string;
    }];

}