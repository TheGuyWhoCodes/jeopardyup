import { Question } from './question';

export class QuestionCategory {
    id: string
    title: string
    clues_count: string
    clues: Question[]
}
