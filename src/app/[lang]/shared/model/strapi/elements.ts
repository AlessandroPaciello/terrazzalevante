import { Room, StrapiRoom } from "./shared";

export type About = {
    label: string, 
    value: string, 
    id: number
}

interface FeatureType {
    id: string;
    room: {
      data: StrapiRoom
    }
    showLink: boolean;
    newTab: boolean;
    url: string;
    text: string;
  }

export interface StrapiFeture extends FeatureType {}

export interface StrapiAbout extends About {}