export class User {
        email: string;
        password: string;
        name : string;
        gender: string;
        avatar: string;
        points: number;
        pointsPerBook: [{bookId: number, currentPoints: number}];
        id : number;
}