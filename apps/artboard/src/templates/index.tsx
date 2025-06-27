import type { Template } from "@reactive-resume/utils";

import { Amaranth } from "./acadenice/amaranth";
import { Euphorbia } from "./acadenice/euphorbia";
import { Hellebore } from "./acadenice/hellebore";
import { Ladyfern } from "./acadenice/ladyfern";
import { Zinnia } from "./acadenice/zinnia";
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
    case "amaranth": {
      return Amaranth;
    }
    case "euphorbia": {
      return Euphorbia;
    }
    case "hellebore": {
      return Hellebore;
    }
    case "ladyfern": {
      return Ladyfern;
    }
    case "zinnia": {
      return Zinnia;
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
      return Amaranth;
    }
  }
};
