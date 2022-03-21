import { Area, Dimension } from "../../domain";

interface AreaRecord {
  code: string;
  name: string;
  dimensions: { code: string; name: string }[];
}

export const AREA_RECORDS: AreaRecord[] = [
  {
    code: "LCA1",
    name: "Àrea de llengua catalana i literatura 1r",
    dimensions: [
      {
        code: "LCA-D01",
        name: "Comprensió oral",
      },
      {
        code: "LCA-D010",
        name: "Expressió oral",
      },
      {
        code: "LCA-D02",
        name: "Comprensió lectora",
      },
      {
        code: "LCA-D03",
        name: "Expressió escrita",
      },
      {
        code: "LCA-D04",
        name: "Literària",
      },
      {
        code: "LCA-D05",
        name: "Plurilingüe i intercultural",
      },
    ],
  },
  {
    code: "LCS1",
    name: "Àrea de llengua castellana i literatura 1r",
    dimensions: [
      {
        code: "LCS-D01",
        name: "Comprensió oral",
      },
      {
        code: "LCS-D010",
        name: "Expressió oral",
      },
      {
        code: "LCS-D02",
        name: "Comprensió lectora",
      },
      {
        code: "LCS-D03",
        name: "Expressió escrita",
      },
      {
        code: "LCS-D04",
        name: "Literària",
      },
      {
        code: "LCS-D05",
        name: "Plurilingüe i intercultural",
      },
    ],
  },
  {
    code: "IA1",
    name: "Àrea de primera llengua estrangera: anglès 1r",
    dimensions: [
      {
        code: "IA-D01",
        name: "Comprensió oral",
      },
      {
        code: "IA-D010",
        name: "Expressió oral",
      },
      {
        code: "IA-D02",
        name: "Comprensió lectora",
      },
      {
        code: "IA-D03",
        name: "Expressió escrita",
      },
      {
        code: "IA-D04",
        name: "Literària",
      },
      {
        code: "IA-D05",
        name: "Plurilingüe i intercultural",
      },
    ],
  },
  {
    code: "MAT1",
    name: "Àrea de matemàtiques 1r",
    dimensions: [
      {
        code: "MAT-D06",
        name: "Resolució de problemes",
      },
      {
        code: "MAT-D07",
        name: "Raonament i prova",
      },
      {
        code: "MAT-D08",
        name: "Connexions",
      },
      {
        code: "MAT-D09",
        name: "Comunicació i representació",
      },
    ],
  },
  {
    code: "CMN1",
    name: "Àrea de coneixement del medi natural 1r",
    dimensions: [
      {
        code: "CMEDI-D10",
        name: "Món actual",
      },
      {
        code: "CMEDI-D11",
        name: "Salut i equilibri personal",
      },
      {
        code: "CMEDI-D12",
        name: "Tecnologia i vida quotidiana",
      },
      {
        code: "CMEDI-D13",
        name: "Ciutadania",
      },
    ],
  },
  {
    code: "CMS1",
    name: "Àrea de coneixement del medi social i cultural 1r",
    dimensions: [
      {
        code: "CMEDI-D10",
        name: "Món actual",
      },
      {
        code: "CMEDI-D11",
        name: "Salut i equilibri personal",
      },
      {
        code: "CMEDI-D12",
        name: "Tecnologia i vida quotidiana",
      },
      {
        code: "CMEDI-D13",
        name: "Ciutadania",
      },
    ],
  },
  {
    code: "EAR 1-1",
    name: "Àrea d'educació artística: música i dansa, 1r",
    dimensions: [
      {
        code: "EAR-D14-1",
        name: "Percepció, comprensió i valoració",
      },
      {
        code: "EAR-D15-1",
        name: "Interpretació i producció",
      },
      {
        code: "EAR-D16-1",
        name: "Imaginació i creativitat",
      },
    ],
  },
  {
    code: "EAR 1",
    name: "Àrea d'educació artística: visual i plàstica, 1r",
    dimensions: [
      {
        code: "EAR-D14",
        name: "Percepció, comprensió i valoració",
      },
      {
        code: "EAR-D15",
        name: "Interpretació i producció",
      },
      {
        code: "EAR-D16",
        name: "Imaginació i creativitat",
      },
    ],
  },
  {
    code: "EART 1",
    name: "Àrea d'Educació Artística 1r",
    dimensions: [
      {
        code: "EART-D15",
        name: "Interpretació i producció",
      },
      {
        code: "EART-D16",
        name: "Imaginació i creativitat",
      },
      {
        code: "EART-D14",
        name: "Percepció, comprensió i valoració",
      },
    ],
  },
  {
    code: "EFI1",
    name: "Àrea d'educació física 1r",
    dimensions: [
      {
        code: "EFI-D17",
        name: "Activitat física",
      },
      {
        code: "EFI-D18",
        name: "Hàbits saludables",
      },
      {
        code: "EFI-D19",
        name: "Expressió i comunicació corporal",
      },
      {
        code: "EFI-D20",
        name: "Joc motor i temps de lleure",
      },
    ],
  },
  {
    code: "VSC1",
    name: "Àrea d'educació en valors socials i cívics 1r",
    dimensions: [
      {
        code: "VSC-D21",
        name: "Personal",
      },
      {
        code: "VSC-D22",
        name: "Interpersonal",
      },
      {
        code: "VSC-D23",
        name: "Social",
      },
    ],
  },
  {
    code: "VSC1",
    name: "Àrea d'educació en valors socials i cívics 1r",
    dimensions: [
      {
        code: "VSC-D21",
        name: "Personal",
      },
      {
        code: "VSC-D22",
        name: "Interpersonal",
      },
      {
        code: "VSC-D23",
        name: "Social",
      },
    ],
  },
  {
    code: "RE1",
    name: "Àrea de religió catòlica 1r",
    dimensions: [],
  },
  {
    code: "AMBIT_CD",
    name: "COMPETÈNCIA DIGITAL 1r",
    dimensions: [
      {
        code: "ACD_1",
        name: "Ús d'intruments i aplicacions",
      },
      {
        code: "ACD_2",
        name: "Tractament de la informació i organització dels entorns de treball i d'aprenentatge.",
      },
      {
        code: "ACD_3",
        name: "Comunicació interpersonal i col·laboració",
      },
      {
        code: "ACD_4",
        name: "Hàbits, civisme i identitat digital",
      },
    ],
  },
  {
    code: "AMBIT_APR",
    name: "APRENDRE A APRENDRE 1r",
    dimensions: [],
  },
  {
    code: "APR_1",
    name: "Demana ajut quan li cal, al mestre i/o als companys",
    dimensions: [],
  },
  {
    code: "APR_2",
    name: "Contribueix al bon funcionament d'un grup de treball",
    dimensions: [],
  },
  {
    code: "APR_3",
    name: "Adopta una actitud activa davant l'aprenentatge",
    dimensions: [],
  },
  {
    code: "AMBIT_AIP",
    name: "AUTONOMIA, INICIATIVA PERSONAL I EMPRENEDORIA 1r",
    dimensions: [],
  },
  {
    code: "AIP_1",
    name: "Proposa idees per resoldre situacions",
    dimensions: [],
  },
  {
    code: "AIP_2",
    name: "S'adapta a noves situacions o a determinats canvis",
    dimensions: [],
  },
  {
    code: "AIP_3",
    name: "Ajuda als altres en el seu aprenentatge",
    dimensions: [],
  },
];

export const AREA_DATA: Area[] = AREA_RECORDS.map((record) => {
  const dimensions = record.dimensions.map(Dimension.create);

  return Area.create({ ...record, dimensions });
});
