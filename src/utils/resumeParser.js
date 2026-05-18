import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs';
import mammoth from 'mammoth';

//  TEXT EXTRACTION
export const extractText = async (file) => {
  if (file.mimetype === 'application/pdf') {
    const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(file.buffer) }).promise;

    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(i => i.str).join(' ') + '\n';
    }
    return text;
  }

  if (file.mimetype.includes('word')) {
    const data = await mammoth.extractRawText({ buffer: file.buffer });
    return data.value;
  }

  throw new Error('Unsupported file type');
};

// RESUME STRUCTURE HELPERS
// resume.parser.js

const SECTION_HEADERS = [
  "PROFESSIONAL SUMMARY",
  "TECHNICAL SKILLS",
  "WORK EXPERIENCE",
  "EXPERIENCE",
  "PROJECTS",
  "EDUCATION",
  "CERTIFICATION",
];

const clean = (t) => t.replace(/\s+/g, " ").trim();

const getSection = (text, start, ends) => {
  const s = text.search(new RegExp(start, "i"));
  if (s === -1) return "";

  let e = text.length;
  for (const end of ends) {
    const idx = text.slice(s + 1).search(new RegExp(end, "i"));
    if (idx !== -1) {
      e = s + 1 + idx;
      break;
    }
  }

  return clean(text.slice(s, e));
};

// export const parseResumeText = (text) => {
//   text = text.replace(/\r/g, "");

//   // BASIC INFO
//   const name = clean(text.split("\n")[0]);

//   const email = (text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [""])[0];
//   const phone = (text.match(/(\+?\d[\d\s-]{8,})/) || [""])[0];

//   const links = [...text.matchAll(/https?:\/\/[^\s]+/g)].map(m => m[0]);

//   const locationMatch = text.match(/Location:\s*([^\n]+)/i);
//   const location = locationMatch ? clean(locationMatch[1]) : "";

//   // SUMMARY
//   const summary = getSection(text, "PROFESSIONAL SUMMARY", [
//     "TECHNICAL SKILLS",
//     "WORK EXPERIENCE",
//   ]);

//   // SKILLS (auto detect from keywords)
//   const SKILL_KEYWORDS = [
//     "html","css","javascript","react","redux","tailwind","bootstrap","node","express",
//     "mongodb","postgresql","mysql","aws","docker","git","jira","figma","websocket","stripe"
//   ];

//   const skills = [
//     ...new Set(
//       SKILL_KEYWORDS.filter(skill =>
//         new RegExp(`\\b${skill}\\b`, "i").test(text)
//       )
//     ),
//   ];

//   // EXPERIENCE
//   const expSection = getSection(text, "WORK EXPERIENCE|EXPERIENCE", [
//     "PROJECTS",
//     "EDUCATION",
//   ]);

//   const experience = [];
//   const expBlocks = expSection.split(/\n(?=[A-Z][a-z]+\s[A-Z])/g);

//   expBlocks.forEach(block => {
//     const lines = block.split("\n").map(l => l.trim()).filter(Boolean);
//     if (lines.length < 2) return;

//     const roleCompany = lines[0];
//     const durationMatch = block.match(
//       /(\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s?\d{4}\s?–?\s?(?:Present|\d{4}))/i
//     );

//     experience.push({
//       role: roleCompany,
//       company: lines[1] || "",
//       duration: durationMatch ? durationMatch[0] : "",
//       description: clean(lines.slice(2).join(" ")),
//     });
//   });

//   // EDUCATION
//   const eduSection = getSection(text, "EDUCATION", ["CERTIFICATION", "PROJECTS"]);

//   const education = [];
//   const eduLines = eduSection.split("\n").filter(Boolean);

//   eduLines.forEach(line => {
//     if (/B\.?Tech|Bachelor|Master|BCA|MCA|Engineering/i.test(line)) {
//       education.push({
//         degree: line,
//         institute: "",
//         year: (line.match(/\b(19|20)\d{2}\b/) || [""])[0],
//       });
//     }
//   });

//   // PROJECTS
//   const projSection = getSection(text, "PROJECTS", ["EDUCATION", "CERTIFICATION"]);

//   const projects = [];
//   const projBlocks = projSection.split(/\n(?=[A-Z])/g);

//   projBlocks.forEach(block => {
//     const lines = block.split("\n").filter(Boolean);
//     if (lines.length < 2) return;

//     projects.push({
//       title: lines[0],
//       description: clean(lines.slice(1).join(" ")),
//     });
//   });

//   return {
//     name,
//     email,
//     phone,
//     location,
//     links,
//     summary,
//     skills,
//     experience,
//     education,
//     projects,
//   };
// };

// resume.parser.js
import nlp from "compromise";


export const parseResumeText = (text) => {
  const doc = nlp(text);

  // Name (first detected person)
  const name = doc.people().out("array")[0] || "";

  // Email / Phone
  const email = (text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [""])[0];
  const phone = (text.match(/(\+?\d[\d\s-]{8,})/) || [""])[0];

  // Links
  const links = [...text.matchAll(/https?:\/\/[^\s]+/g)].map(m => m[0]);

  // Skills by keyword bank (ATS style)
  const SKILLS_DB = [
    "html","css","javascript","react","redux","tailwind","bootstrap","jquery",
    "node","express","mongodb","postgresql","mysql",
    "aws","docker","git","jira","figma","websocket","stripe"
  ];

  const skills = [
    ...new Set(
      SKILLS_DB.filter(s =>
        new RegExp(`\\b${s}\\b`, "i").test(text)
      )
    ),
  ];

  // Experience (organizations + dates)
  const orgs = doc.organizations().out("array");
  // const dates = doc.dates().out("array");

  const experience = orgs.map((org, i) => ({
    company: org,
    // duration: dates[i] || "",
  }));

  // Education lines
  const education = text
    .split("\n")
    .filter(l => /B\.?Tech|Bachelor|Master|BCA|MCA|Engineering/i.test(l))
    .map(l => ({
      degree: clean(l),
      year: (l.match(/\b(19|20)\d{2}\b/) || [""])[0],
    }));

  return {
    name,
    email,
    phone,
    links,
    skills,
    experience,
    education,
  };
};

const SKILL_DB = [
  "html","css","javascript","react","redux","tailwind","bootstrap","jquery",
  "node","express","mongodb","postgresql","mysql",
  "aws","docker","git","jira","figma","websocket","stripe"
];


export const basicParse = (text) => {
  // EMAIL
  const email = (text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i) || [""])[0];

  // PHONE
  const phone = (text.match(/(\+?\d[\d\s-]{8,})/) || [""])[0];

  // NAME (first line before phone/email)
  const firstLines = text.split("\n").slice(0, 5).join(" ");
  const nameMatch = firstLines.match(/^[A-Z][A-Za-z\s]{3,30}/);
  const name = nameMatch ? clean(nameMatch[0]) : "";

  // LOCATION (common Indian pattern)
  const locMatch = text.match(/([A-Za-z]+,\s*India|[A-Za-z]+,\s*[A-Za-z]+)/i);
  const location = locMatch ? clean(locMatch[0]) : "";

  // SKILLS by keyword match
  const skills = [
    ...new Set(
      SKILL_DB.filter(skill =>
        new RegExp(`\\b${skill}\\b`, "i").test(text)
      )
    ),
  ];

  // EXPERIENCE YEARS
  const expMatch = text.match(/(\d+)\+?\s*(years?|yrs?)/i);
  const total_experience = expMatch ? Number(expMatch[1]) : 0;

  return {
    name,
    email,
    phone,
    location,
    skills,
    total_experience,
    raw_text: text,
  };
};