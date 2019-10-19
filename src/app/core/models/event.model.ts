class EventModel {
    constructor(
        public id: number,
        public answer: string,
        public question: string,
        public value: number,
        public airdate: Date,
        public created_at: Date,
        public updated_at: Date,
        public category_id: number,
        public game_id: number,
        public category: Category
    ) { }
}

class Category {
    constructor (
        public id: number,
        public title: string,
        public created_at: Date,
        public updated_at: Date,
        public clues_count: number
    ) { }
}

export {EventModel, Category};