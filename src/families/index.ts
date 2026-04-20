import { auroraNeon } from "./families/auroraNeon";
import { brutalist } from "./families/brutalist";
import { flat } from "./families/flat";
import { glass } from "./families/glass";
import { material } from "./families/material";
import { neumorphism } from "./families/neumorphism";
import { wireframe } from "./families/wireframe";


export * from "./types";
export * from "./utils";

export const families = {
    flat,
    material,
    neumorphism,
    glass,
    brutalist,
    auroraNeon,
    wireframe,
};
export type FamilyId = keyof typeof families;
