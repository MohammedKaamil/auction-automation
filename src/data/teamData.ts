export interface Team {
  id: string;
  name: string;
  shortName: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  gradientFrom: string;
  gradientTo: string;
  logoUrl: string;
  bgPattern: "waves" | "diagonal" | "radial" | "mesh";
}

export const teams: Team[] = [
  {
    id: "csk",
    name: "Chennai Super Kings",
    shortName: "CSK",
    primaryColor: "#FFC107",
    secondaryColor: "#0D47A1",
    textColor: "#0D47A1",
    gradientFrom: "#FFC107",
    gradientTo: "#FF9800",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/Roundbig/CSKroundbig.png",
    bgPattern: "waves"
  },
  {
    id: "mi",
    name: "Mumbai Indians",
    shortName: "MI",
    primaryColor: "#004BA0",
    secondaryColor: "#D4AF37",
    textColor: "#FFFFFF",
    gradientFrom: "#004BA0",
    gradientTo: "#002855",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/Logos/Roundbig/MIroundbig.png",
    bgPattern: "diagonal"
  },
  {
    id: "rcb",
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    primaryColor: "#EC1C24",
    secondaryColor: "#000000",
    textColor: "#FFFFFF",
    gradientFrom: "#EC1C24",
    gradientTo: "#8B0000",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/Logos/Roundbig/RCBroundbig.png",
    bgPattern: "radial"
  },
  {
    id: "kkr",
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    primaryColor: "#3A225D",
    secondaryColor: "#D4AF37",
    textColor: "#D4AF37",
    gradientFrom: "#3A225D",
    gradientTo: "#1A0A2E",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/Logos/Roundbig/KKRroundbig.png",
    bgPattern: "mesh"
  },
  {
    id: "srh",
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    primaryColor: "#FF822A",
    secondaryColor: "#000000",
    textColor: "#FFFFFF",
    gradientFrom: "#FF822A",
    gradientTo: "#E65100",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/Logos/Roundbig/SRHroundbig.png",
    bgPattern: "diagonal"
  },
  {
    id: "dc",
    name: "Delhi Capitals",
    shortName: "DC",
    primaryColor: "#0078BC",
    secondaryColor: "#EF1C26",
    textColor: "#FFFFFF",
    gradientFrom: "#0078BC",
    gradientTo: "#004B7C",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/Logos/Roundbig/DCroundbig.png",
    bgPattern: "waves"
  },
  {
    id: "rr",
    name: "Rajasthan Royals",
    shortName: "RR",
    primaryColor: "#EA1A85",
    secondaryColor: "#254AA5",
    textColor: "#FFFFFF",
    gradientFrom: "#EA1A85",
    gradientTo: "#C2185B",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/Logos/Roundbig/RRroundbig.png",
    bgPattern: "radial"
  },
  {
    id: "pbks",
    name: "Punjab Kings",
    shortName: "PBKS",
    primaryColor: "#D71920",
    secondaryColor: "#84754E",
    textColor: "#FFFFFF",
    gradientFrom: "#D71920",
    gradientTo: "#8B0000",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/Logos/Roundbig/PBKSroundbig.png",
    bgPattern: "mesh"
  },
  {
    id: "gt",
    name: "Gujarat Titans",
    shortName: "GT",
    primaryColor: "#1C3C6E",
    secondaryColor: "#A28E5D",
    textColor: "#FFFFFF",
    gradientFrom: "#1C3C6E",
    gradientTo: "#0D1F3C",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/Logos/Roundbig/GTroundbig.png",
    bgPattern: "waves"
  },
  {
    id: "lsg",
    name: "Lucknow Super Giants",
    shortName: "LSG",
    primaryColor: "#A72056",
    secondaryColor: "#FFCC00",
    textColor: "#FFFFFF",
    gradientFrom: "#A72056",
    gradientTo: "#00A8B5",
    logoUrl: "https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/Logos/Roundbig/LSGroundbig.png",
    bgPattern: "diagonal"
  }
];

export const getTeamById = (id: string): Team | undefined => {
  return teams.find(team => team.id === id);
};

export const getTeamByShortName = (shortName: string): Team | undefined => {
  return teams.find(team => team.shortName === shortName);
};
