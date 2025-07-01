import type { Template } from "@reactive-resume/utils";

import { AntMan } from "./acadenice/antman";
import { CaptainAmerica } from "./acadenice/captainamerica";
import { Hulk } from "./acadenice/hulk";
import { IronMan } from "./acadenice/ironman";
import { Thor } from "./acadenice/thor";
import { Azurill } from "./azurill";
import { Bronzor } from "./bronzor";
import { Chikorita } from "./chikorita";
import { Ditto } from "./ditto";
import { Gengar } from "./gengar";
import { Glalie } from "./glalie";
import { Kakuna } from "./kakuna";
import { Leafish } from "./leafish";
import { Nosepass } from "./nosepass";
import { Onyx } from "./onyx";
import { Pikachu } from "./pikachu";
import { Rhyhorn } from "./rhyhorn";

const normalizeTemplateName = (name: string) => {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036F]/g, "");
};

export const getTemplate = (template: Template) => {
  const normalizedTemplate = normalizeTemplateName(template);

  switch (normalizedTemplate) {
    case "antman": {
      return AntMan;
    }
    case "ironman": {
      return IronMan;
    }
    case "hulk": {
      return Hulk;
    }
    case "captainamerica": {
      return CaptainAmerica;
    }
    case "thor": {
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
      return AntMan;
    }
  }
};
