export interface PlantNetResponse {
    statusCode?:    number | null | undefined
    error?:         string | null | undefined,
    message:        string | null,
    session:        string;
    results:        Result[];
    organs:         any[];
    geo:            null;
    date:           number;
    warnings:       Warning[];
    alert:          null;
    predicted_tags: PredictedTags;
}

export interface PredictedTags {
    query:  Query;
    images: PredictedTagsImage[];
}

export interface PredictedTagsImage {
    id:         string;
    url:        null;
    organ:      Context[];
    phytopatho: Variety[];
    context:    Context[];
    foreground: Context[];
}

export interface Context {
    value: string;
    score: number;
}

export interface Variety {
    value: string;
    score: number;
    label: string;
}

export interface Query {
    variety: Variety[];
    family:  FamilyElement[];
    genus:   FamilyElement[];
}

export interface FamilyElement {
    value:   string;
    score:   number;
    images?: FamilyImage[];
    family?: FamilyFamily;
    genus?:  FamilyFamily;
}

export interface FamilyFamily {
    name:                 string;
    author:               null;
    commonNames:          string[];
    secondaryCommonNames: any[];
    family?:              string;
}

export interface FamilyImage {
    id:            string;
    score:         number;
    o:             string;
    m:             string;
    s:             string;
    organ:         Organ;
    author:        Author;
    license:       License;
    date:          number;
    observationId: null;
    project:       null;
}

export enum Author {
    PlNTNet = "Pl@ntNet",
}

export enum License {
    CcBy = "cc-by",
    CcByNc = "cc-by-nc",
    CcByNcSa = "cc-by-nc-sa",
    CcBySa = "cc-by-sa",
    Empty = "©",
}

export enum Organ {
    Flower = "flower",
    Habit = "habit",
    Leaf = "leaf",
    Other = "other",
    Sheet = "sheet",
}

export interface Result {
    score:   number;
    images:  ResultImage[];
    species: Species;
}

export interface ResultImage {
    id:            string;
    o:             string;
    m:             string;
    s:             string;
    organ:         Organ;
    author:        string;
    date:          string;
    license:       License;
    observationId: string;
    project:       string;
}

export interface Species {
    name:         string;
    author:       string;
    family:       string;
    genus:        string;
    commonNames:  string[];
    needRevision: boolean;
    iucn?:        Iucn;
}

export interface Iucn {
    id:       null;
    category: Category;
    link:     null;
}

export interface Category {
    code:    string;
    caption: string;
}

export interface Warning {
    key:     string;
    value:   boolean;
    message: string;
}