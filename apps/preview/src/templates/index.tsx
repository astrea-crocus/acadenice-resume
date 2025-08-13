import type { Template } from "@reactive-resume/utils";
import { normalizeTemplateName } from "@reactive-resume/utils";

import { AntMan, CaptainAmerica, Hulk, IronMan, Thor } from "./acadenice";
import {
  Azurill,
  Bronzor,
  Chikorita,
  Ditto,
  Gengar,
  Glalie,
  Kakuna,
  Leafish,
  Nosepass,
  Onyx,
  Pikachu,
  Rhyhorn,
} from "./base";
import { Example } from "./example";

export const getTemplate = (template: Template) => {
  const normalizedTemplate = normalizeTemplateName(template);

  switch (normalizedTemplate) {
    case "Example": {
      return Example;
    }
    case "Ant Man": {
      return AntMan;
    }
    case "Iron Man": {
      return IronMan;
    }
    case "Hulk": {
      return Hulk;
    }
    case "Captain America": {
      return CaptainAmerica;
    }
    case "Thor": {
      return Thor;
    }
    case "azurill": {
      return Azurill;
    }
    case "bronzor": {
      return Bronzor;
    }
    case "chikorita": {
      return Chikorita;
    }
    case "ditto": {
      return Ditto;
    }
    case "gengar": {
      return Gengar;
    }
    case "glalie": {
      return Glalie;
    }
    case "kakuna": {
      return Kakuna;
    }
    case "leafish": {
      return Leafish;
    }
    case "nosepass": {
      return Nosepass;
    }
    case "onyx": {
      return Onyx;
    }
    case "pikachu": {
      return Pikachu;
    }
    case "rhyhorn": {
      return Rhyhorn;
    }
    default: {
      return Example;
    }
  }
};
