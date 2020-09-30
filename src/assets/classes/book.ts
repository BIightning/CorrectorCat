export class Book {
    _id: string;
    title: string;
    author: string;
    series: string;
    language: string;
    starting: boolean;
    cost: number;
    difficulty: string;
    imagePath: string;
    description: string;
    
    textChunks: [{
        text: string;
        audioCorrect: string;
        audioWrong: string;
        points: number;
        question: {
            answers: string[],
            correctIndex: number;
            explanation: string;
        };
    }];

    quiz?: [{
        question: string;
        points: number;
        answers: string[];
        correctAnswer: string;
    }];

}