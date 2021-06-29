export interface ListModel {
        name: string;
        priority: number;
        kind: KindModel;
}

export interface KindModel {
        food: string;
        cosmetics: number;
        other: string;
}
