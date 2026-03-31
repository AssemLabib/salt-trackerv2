import React, { useState } from "react";

const NAVY = "#1B3A5C";
const TEAL = "#0E7A6F";
const GOLD = "#C9A84C";

const PEOPLE     = ["SS", "CB", "AL", "CB/SS", "SS/CB", "AL/SS", "CS", "External"];
const PRIORITIES = ["High", "Medium", "Low"];
const STATUSES   = ["Not Started", "In Progress", "Awaiting Response", "Completed", "On Hold"];
const STAGES     = ["Land Acquisition", "Planning & Approvals", "Construction", "Sales & Settlements", "Finance & Budget"];

const priCfg = {
  High:   { bg: "#FEE2E2", text: "#991B1B", dot: "#EF4444" },
  Medium: { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  Low:    { bg: "#ECFDF5", text: "#065F46", dot: "#10B981" },
};
const stsCfg = {
  "Not Started":       { bg: "#F3F4F6", text: "#6B7280" },
  "In Progress":       { bg: "#DBEAFE", text: "#1E40AF" },
  "Awaiting Response": { bg: "#FEF3C7", text: "#92400E" },
  "Completed":         { bg: "#D1FAE5", text: "#065F46" },
  "On Hold":           { bg: "#F3E8FF", text: "#6B21A8" },
};

const SECTION_META = [
  { id: "authorities",  title: "Authorities",          icon: "🏛", color: "#1B3A5C" },
  { id: "legal",        title: "Legal",                icon: "⚖️", color: "#5B4FCF" },
  { id: "design",       title: "Design & Consultants", icon: "📐", color: "#0E7A6F" },
  { id: "sales",        title: "Sales & Marketing",    icon: "📣", color: "#E07B39" },
  { id: "construction", title: "Construction",         icon: "🏗", color: "#2D6A4F" },
  { id: "finance",      title: "Banking & Finance",    icon: "💰", color: "#B5451B" },
];

let _uid = 100;
const uid = () => String(++_uid);

const mkTask = (o = {}) => ({ id: uid(), action: "", person: "SS", due: "", priority: "Medium", status: "Not Started", thisWeek: false, ...o });
const mkRow  = (label, name, comments, tasks) => ({ id: uid(), label, name: name||"", comments: comments||"", tasks: (tasks||[{}]).map(t => mkTask(t)) });

// ─── SEED DATA (from Excel) ──────────────────────────────────────────────────
function buildProjects() {
  return [

  // ── NANDROYA ──────────────────────────────────────────────────────────────
  { id:"nandroya", name:"Nandroya", color:"#0E7A6F", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2025-10-13",
    sections:{
      authorities:[
        mkRow("Council","Gold Coast City Council","DA Submitted 13/01/2026. RFI Responded 15/02/2026. 35 Business Days to respond. Due 03/04/2026.",[
          {action:"Monitor DA progress & prepare RFI response",person:"SS",priority:"High",status:"In Progress",thisWeek:true}]),
        mkRow("Electricity Authority","Energex","Confirmation on Upgrade of Isolator to PMT from PECE.",[
          {action:"Follow up PECE re isolator upgrade confirmation",person:"AL",priority:"High",status:"Awaiting Response",thisWeek:true,due:"2026-03-20"}]),
        mkRow("Water Authority","Gold Coast Water","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","Community Title Document underway.",[
          {action:"Progress Community Title Scheme document",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Contracts","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Architect","Stuart Osman – Osman Architects","SALT to review Detailed Design Documentation. Stuart to provide L Shape Kitchen by Wed 01/04. Stuart to provide all consultant quotes, steel install quote. Interiors – book meeting with Stu this week.",[
          {action:"Review Detailed Design Documentation",person:"AL/SS",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-14"},
          {action:"Book interiors meeting with Stuart Osman",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Obtain L Shape Kitchen design from Stuart (due 01/04)",person:"AL",priority:"High",status:"Not Started",due:"2026-04-01"},
        ]),
        mkRow("Town Planner","HPC Consulting – Murray Wright","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Detailed Design Submitted. RFI Response Submitted. Non-Approved Storm Water Filtration System – Awaiting Approval, if not approved update design.",[
          {action:"Confirm stormwater system approval status",person:"SS",priority:"High",status:"Awaiting Response",thisWeek:true}]),
        mkRow("Structural Engineer","Osmans","Building Structural Quotes tendered by Osmans. Retaining Wall Structural Quotes – To Engage.",[
          {action:"Review structural quotes from Osmans",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Engage structural engineer for retaining walls & get quotes",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"SS to speak to Pete re structural eng",person:"SS",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","PECE to provide preliminary design timings & comments, new PMT confirmation, ECI pricing (internal & external breakdown). Send updated DD & civil package to PECE.",[
          {action:"Provide ECI pricing & PMT confirmation",person:"AL/SS",priority:"High",status:"Awaiting Response",thisWeek:true,due:"2026-03-20"},
          {action:"Send updated DD & civil package to PECE",person:"SS",priority:"High",status:"Not Started"},
        ]),
        mkRow("Hydraulic Engineer","Hydraulic Design Solutions","Design received – to be reviewed. Send to Jason for review.",[
          {action:"Review hydraulic design & send to Jason",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","RFI Traffic Comments Addressed.",[
          {action:"Confirm final traffic sign-off",person:"SS",priority:"Low",status:"In Progress"}]),
        mkRow("Landscape Architect","I-Primus – Loren","RFI Comments Addressed.",[
          {action:"Confirm final landscape plan approval",person:"SS",priority:"Low",status:"Awaiting Response"}]),
        mkRow("Geotech","Protest Engineering","Report Updated Through RFI Process.",[
          {action:"No further action required",status:"Completed"}]),
        mkRow("Arborist","Heritage Tree Care – Tony","Review Arborist Report. Organise Tree Management Plan once DA is approved.",[
          {action:"Review arborist report",person:"SS",priority:"Low",status:"Not Started"},
          {action:"Organise Tree Management Plan (post DA approval)",person:"SS",priority:"Low",status:"Not Started"},
        ]),
        mkRow("Building Certifier","TBC","Review both quotes. Engage certifier. Recommendations on Mechanical, Fire Safety & additional items.",[
          {action:"Review certifier quotes & appoint",person:"SS",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Mechanical Engineer","TBC","Certifier to confirm mechanical requirements.",[
          {action:"Await certifier confirmation on mechanical",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Energy Rater","TBC","Stuart Osman to provide Energy Rater Quote (timing & cost). Shannon recommendation to update quote – Thermal Assessments Australia (TAA).",[
          {action:"Obtain energy rater quote from Stuart Osman",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Get alternative quote from Thermal Assessments Australia",person:"SS",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Survey","Andrew & Hanson","Proposed POS for Units (Disclosure Plan).",[
          {action:"Prepare disclosure plan / POS survey",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Sales","","1BD Sales Strategy. Rental Investments.",[
          {action:"Develop 1BD sales strategy & rental investment approach",person:"CB/SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Digital Marketing","Ivy Street","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","Engage","",[
          {action:"Prepare Investment Brochure",person:"SS",priority:"Medium",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","BOQ (SS). Shannon to begin tendering. Back-up stormwater – timing & availability. Program (SS to build out over the fortnight). Sewer & Water – before built form or after? SS/AL to speak to Stuart.",[
          {action:"Complete BOQ",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Begin civil tendering process",person:"SS",priority:"High",status:"Not Started"},
          {action:"Build out construction programme",person:"SS",priority:"High",status:"Not Started"},
          {action:"Clarify sewer & water sequencing with Stuart",person:"SS/AL",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Built Form","Stuart Osman / TBC","Tender Stuart & other options. Pricing breakdown / BOQ. Programme. Staged timings.",[
          {action:"Tender built form with Stuart Osman & alternatives",person:"SS",priority:"High",status:"Not Started"},
          {action:"Obtain pricing breakdown / BOQ",person:"SS",priority:"High",status:"Not Started"},
        ]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 13th October 2025. Current Debt: $1.154m at 12%. 12 Month Term capitalised.",[{action:"Monitor debt repayment schedule",person:"CB",priority:"High",status:"In Progress"}]),
        mkRow("Hurdles","","Understand Build Cost, Civil Cost, Electrical Timing & Cost.",[
          {action:"Obtain build cost estimate",person:"CB/SS",priority:"High",status:"Not Started"},
          {action:"Confirm civil cost",person:"SS",priority:"High",status:"Not Started"},
          {action:"Confirm electrical timing & cost from PECE",person:"AL",priority:"High",status:"Not Started"},
        ]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. Built Form $3,000/SQM & $4,000/SQM. Civil $1,500,000 + Electrical $500,000.",[
          {action:"CB to send current Feaso to AL",person:"CB",priority:"High",status:"Not Started",thisWeek:true},
          {action:"AL to build updated feasibility model",person:"AL",priority:"High",status:"Not Started"},
        ]),
        mkRow("Valuers","","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","Current Debt: $1.154m at 12%. Settled 13/10/2025. 12 Month Term capitalised.",[
          {action:"Monitor debt position",person:"CB",priority:"High",status:"In Progress"}]),
        mkRow("QS","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
    }
  },

  // ── MEADOWVIEW JIMBOOMBA ──────────────────────────────────────────────────
  { id:"jimboomba", name:"Meadowview Jimboomba", color:"#1B3A5C", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2025-03-17",
    sections:{
      authorities:[
        mkRow("Council","Logan City Council","Awaiting Operational Works. TP to submit Ecological Data / Email.",[
          {action:"Follow up LCC re OW status",person:"CS",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-30"},
          {action:"Submit ecological data email to council",person:"CS",priority:"High",status:"Not Started",thisWeek:true},
        ]),
        mkRow("Electricity Authority","Energex","PECE to submit with Energex – AL to check in.",[
          {action:"AL to check in on PECE submission to Energex",person:"AL",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-20"}]),
        mkRow("Water Authority","Logan Water","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Contracts","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","Proposed POS for Units (Disclosure Plan).",[
          {action:"Prepare disclosure plan / POS survey",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","PECE to provide: preliminary design timings & comments, ECI pricing (internal & external), send updated DD & civil package to PECE.",[
          {action:"Provide preliminary design timings & ECI pricing",person:"AL/SS",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-20"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","Road Closure Traffic Permits.",[
          {action:"Organise road closure traffic permits",person:"SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Landscape Architect","I-Primus – Loren","No Action Items.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Detailed Design Submitted. RFI Response Submitted.",[
          {action:"Monitor civil design progress",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Geotech","Protest Engineering","Test pits.",[
          {action:"Organise test pits",person:"SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Arborist","QFC","Pre & Post Clearing Report.",[
          {action:"Arrange pre & post clearing report",person:"CB",priority:"Medium",status:"Not Started"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","Ecologist email to council. Offset recalculation.",[
          {action:"Send ecologist email to council",person:"CS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Complete offset recalculation",person:"CS",priority:"High",status:"Not Started"},
        ]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","Review Offset Sites.",[
          {action:"Review offset sites",person:"SS",priority:"High",status:"In Progress"}]),
        mkRow("Fisheries","Aquatic Bio Passage – Andrew Berghuis","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Digital Marketing","","Coming Soon Page Ad. Billboard.",[
          {action:"Set up Coming Soon page ad",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Organise billboard",person:"SS",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("House Renovation","","Building Cleaner – 10/04. Painter (Robo's Handy Man) – booked, start 12/04. Tiler (Dexter) – need to organise, start 15/04. Electrical (T42 Fabian) – need to book 19/04. Plumbing (Josh Brown) – need to book 19/04. Tidy driveway & clean up rubbish 10-11/04.",[
          {action:"Book building cleaner for 10/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Confirm tiler Dexter for 15/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Book T42 Electrical Fabian for 19/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Book Josh Brown Plumbing for 19/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Tidy driveway & clean rubbish 10-11/04",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","Jason – Legend Consulting","BOQ received from Jason – SS to revise. Programme – SS to build out over fortnight. Dig Right to provide pricing. Sewer & water – before built form or after? SS/AL to speak to Stuart.",[
          {action:"Revise BOQ received from Jason",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Build out construction programme",person:"SS",priority:"High",status:"Not Started"},
          {action:"Obtain pricing from Dig Right",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Clarify sewer & water sequencing with Stuart",person:"SS/AL",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","$2.8m Purchase Price. No Debt but owes Stockleigh.",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 17/03/2025.",[{action:"",status:"Not Started"}]),
        mkRow("Hurdles","","Offset Site.",[{action:"Progress offset site acquisition",person:"CB/SS",priority:"High",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. $2.8m Purchase Price – No Debt but owes Stockleigh.",[
          {action:"CB to send current Feaso to AL",person:"CB",priority:"High",status:"Not Started"},
          {action:"AL to build updated feasibility model",person:"AL",priority:"High",status:"Not Started"},
        ]),
        mkRow("Valuers","Savills – Amy","Due next week 07/03. CS to follow up.",[
          {action:"Follow up Amy re valuation",person:"CS",priority:"High",status:"In Progress"}]),
        mkRow("Debt","","No Debt.",[{action:"No debt – no action",status:"Completed"}]),
        mkRow("QS","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
    }
  },

  // ── MEADOWVIEW STOCKLEIGH ─────────────────────────────────────────────────
  { id:"stockleigh", name:"Meadowview Stockleigh", color:"#C9A84C", stage:"Construction",
    purchaseDate:"", settlementDate:"2025-03-17",
    sections:{
      authorities:[
        mkRow("Council","Logan City Council","Landscape Bond Return 05/11/26 – $133,942.96.",[
          {action:"Monitor landscape bond return process",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Electricity Authority","Energex","Bond Due this week – $30k.",[
          {action:"Pay Energex bond – $30k",person:"CB",priority:"High",status:"Not Started",thisWeek:true}]),
        mkRow("Water Authority","Logan Water","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","",[{action:"",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","Lightpole Repair East – cost repair.",[
          {action:"Organise lightpole repair (east side) – get cost",person:"SS",priority:"Medium",status:"Not Started",thisWeek:true}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","",[{action:"",status:"Not Started"}]),
        mkRow("Landscape Architect","I-Primus – Loren","Plant Street Trees 05/05/2026. Tender out works.",[
          {action:"Tender landscape works for street trees",person:"CB/SS",priority:"Medium",status:"Not Started",due:"2026-05-05"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","",[{action:"",status:"Not Started"}]),
        mkRow("Geotech","Protest Engineering","",[{action:"",status:"Not Started"}]),
        mkRow("Arborist","QFC","",[{action:"",status:"Not Started"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","",[{action:"",status:"Not Started"}]),
        mkRow("Bushfire Consultant","","",[{action:"",status:"Not Started"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","Quarterly Maintenance Reports – Southern Cross Regen. Stay on top of them. Next Report April. Need to slash.",[
          {action:"Chase Southern Cross Regen re quarterly maintenance report (due April)",person:"CB",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Organise site slash",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Fisheries","Aquatic Bio Passage – Andrew Berghuis","Follow up reporting – courtesy call.",[
          {action:"Courtesy call to Andrew re fisheries reporting",person:"SS",priority:"Low",status:"Not Started"}]),
      ],
      sales:[
        mkRow("Old House","","Paint Roof (get quotes). Install Driveway 10/04 – Pete & Mitch. Install Water Meter – Pete to complete application URGENT. Landscape – review yard and buy plants.",[
          {action:"Get quotes for roof painting",person:"SS",priority:"Medium",status:"Not Started",thisWeek:true},
          {action:"Confirm driveway install with Pete & Mitch for 10/04",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Pete to complete water meter application – URGENT",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Review yard & purchase landscaping plants",person:"SS",priority:"Low",status:"Not Started"},
        ]),
        mkRow("Whole Site","","Fencing – follow up for commitment. Laser Cut Entry Piece Sign (SS to arrange). Maintenance mow.",[
          {action:"Follow up fencing contractor commitment",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Arrange laser cut entry piece sign",person:"SS",priority:"Medium",status:"Not Started"},
          {action:"Organise maintenance mow",person:"SS",priority:"Low",status:"Not Started"},
        ]),
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","Jason – Legend Consulting","BOQ received from Jason – SS to revise. Programme – SS to build out over fortnight. Dig Right to provide pricing. Sewer & water sequencing TBC.",[
          {action:"Revise civil BOQ",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Build out construction programme",person:"SS",priority:"High",status:"Not Started"},
        ]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 17/03/2025. No Debt – equity release to fund Bonogin.",[{action:"Monitor equity release for Bonogin funding",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Hurdles","","Offset Site.",[{action:"Progress offset site",person:"CB/SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. $2.8m Purchase Price.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Valuers","Savills – Amy","Due next week 07/03. CS to follow up.",[
          {action:"Follow up valuation with Amy",person:"CS",priority:"High",status:"In Progress"}]),
        mkRow("Debt","","No Debt. Equity release to fund Bonogin.",[{action:"No debt – monitor equity release",status:"Completed"}]),
        mkRow("QS","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
    }
  },

  // ── MUDGEERABA ────────────────────────────────────────────────────────────
  { id:"mudgeeraba", name:"Mudgeeraba", color:"#E07B39", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2024-10-01",
    sections:{
      authorities:[
        mkRow("Council","Gold Coast City Council","DA Submission Paused – Council Refusal. Afflux Issues outside tolerances. 30M Creek Buffer. Need to organise onsite council meeting.",[
          {action:"Organise onsite meeting with council",person:"CB/SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Address afflux issues & 30m creek buffer",person:"SS",priority:"High",status:"In Progress"},
        ]),
        mkRow("Electricity Authority","Energex","Awaiting DA.",[{action:"Awaiting DA approval",status:"On Hold"}]),
        mkRow("Water Authority","Logan Water","Awaiting DA.",[{action:"Awaiting DA approval",status:"On Hold"}]),
        mkRow("Road Authority","TMR","RFI Response Submitted 17/03/2026. Response due 17/04/2026.",[
          {action:"Monitor TMR RFI response – due 17/04/2026",person:"SS",priority:"High",status:"Awaiting Response",due:"2026-04-17"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","Community Title Scheme.",[
          {action:"Progress Community Title Scheme",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","Proposed POS for Units (Disclosure Plan).",[
          {action:"Prepare disclosure plan survey",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","Preliminary Design to be stopped. PECE to provide preliminary design comments and ECI pricing.",[
          {action:"Instruct PECE to pause preliminary design",person:"AL/SS",priority:"High",status:"Not Started",thisWeek:true,due:"2026-03-20"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action Items.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","Review RFI Response & redesign landscape. Look into tiered retaining wall option based on TMR response.",[
          {action:"Review RFI response & redesign landscape with tiered retaining wall option",person:"SS",priority:"High",status:"In Progress"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Afflux recalculation & solution – 31/03. 30m Buffer Zone – seeking relaxation, no action.",[
          {action:"Afflux recalculation & engineering solution",person:"SS",priority:"High",status:"In Progress",due:"2026-03-31"}]),
        mkRow("Geotech","Protest Engineering","",[{action:"",status:"Not Started"}]),
        mkRow("Arborist","QFC","Pre & Post Clearing Report.",[
          {action:"Arrange pre & post clearing report",person:"CB",priority:"Medium",status:"Not Started"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","Understand additional reports that can assist case – e.g. ecology to support 30m offset.",[
          {action:"Identify additional supporting reports for council case",person:"CS",priority:"High",status:"In Progress"}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Fisheries","Aquatic Bio Passage – Andrew Berghuis","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Acoustic","Palmer Acoustic – Javier Navas","TMR RFI – Management.",[
          {action:"Manage TMR RFI acoustic response",person:"SS",priority:"High",status:"In Progress"}]),
      ],
      sales:[
        mkRow("House Relocation","CB – David Wright House Relocators","David Wright – House relocators.",[
          {action:"Engage David Wright re house relocation",person:"CB",priority:"High",status:"Not Started",thisWeek:true}]),
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","",[{action:"",status:"Not Started"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 01/10/2024. $2.275m – 9% – Dave – 100% – 2yr cap.",[{action:"Monitor debt position",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Hurdles","","DA Approval.",[{action:"Progress DA through council issues",person:"CB/SS",priority:"High",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. $2.275m – 9% – Dave – 100% – 2yr cap.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"Medium",status:"Not Started"},
          {action:"AL to build updated feasibility model",person:"AL",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Valuers","","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","",[{action:"",status:"Not Started"}]),
        mkRow("QS","","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
    }
  },

  // ── BONOGIN VALLEY ESTATE ─────────────────────────────────────────────────
  { id:"bonogin", name:"Bonogin Valley Estate", color:"#2D6A4F", stage:"Planning & Approvals",
    purchaseDate:"2025-12-16", settlementDate:"2026-06-26",
    sections:{
      authorities:[
        mkRow("Council","Gold Coast City Council","DA Submission this week.",[
          {action:"Lodge DA this week",person:"SS",priority:"High",status:"Not Started",thisWeek:true}]),
        mkRow("Electricity Authority","Energex","Awaiting DA.",[{action:"Awaiting DA lodgement",status:"On Hold"}]),
        mkRow("Water Authority","Gold Coast City Water","Awaiting DA.",[{action:"Awaiting DA lodgement",status:"On Hold"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","Send DA Package. Contract Void Date 08/04/2026.",[
          {action:"Send DA package to Johanson Lawyers",person:"SS",priority:"High",status:"Not Started",thisWeek:true},
          {action:"Monitor contract void date 08/04/2026",person:"CB",priority:"High",status:"In Progress",due:"2026-04-08"},
        ]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","Proposed POS for Units (Disclosure Plan).",[
          {action:"Prepare disclosure plan survey",person:"SS",priority:"Low",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","",[ {action:"",person:"AL/SS",status:"Not Started",due:"2026-03-20"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action Items.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","Awaiting Package – 30/01.",[
          {action:"Follow up landscape package",person:"SS",priority:"Medium",status:"Awaiting Response"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Awaiting Civil Design – 30/01.",[
          {action:"Follow up civil design from Jason",person:"SS",priority:"High",status:"Awaiting Response"}]),
        mkRow("Geotech","Protest Engineering","Landslide Report Complete.",[{action:"No further action",status:"Completed"}]),
        mkRow("Arborist","QFC","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Town Planner","HPC Consulting – Murray Wright","Preparation of DA Package.",[
          {action:"Finalise & lodge DA package",person:"SS",priority:"High",status:"In Progress",thisWeek:true}]),
        mkRow("Bushfire Consultant","","Awaiting Report – 30/01.",[
          {action:"Follow up bushfire report",person:"SS",priority:"High",status:"Awaiting Response"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","Reports complete for DA.",[{action:"Ecology reports ready – no further action",status:"Completed"}]),
        mkRow("Fisheries","","",[{action:"",status:"Not Started"}]),
      ],
      sales:[
        mkRow("Marketing","","Engage Graya. Full Marketing Package.",[
          {action:"Engage Graya for full marketing package",person:"CB/SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","",[{action:"",status:"Not Started"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","Purchased 16/12/2025. Only paid deposit. $5,555,000 + $300k per lot over 14 lots.",[{action:"Monitor contract & settlement obligations",person:"CB",priority:"High",status:"In Progress"}]),
        mkRow("Settlement Date","","Settlement due 26/06/2026.",[{action:"Prepare for settlement 26/06/2026",person:"CB",priority:"High",status:"In Progress",due:"2026-06-26"}]),
        mkRow("Hurdles","","DA Approval.",[{action:"Progress DA lodgement",person:"CB/SS",priority:"High",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. AL to build new Feaso. $5,555,000 + $300k per lot over 14 lots – only paid deposit.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"High",status:"Not Started",thisWeek:true},
          {action:"AL to build feasibility model",person:"AL",priority:"High",status:"Not Started"},
        ]),
        mkRow("Valuers","","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","",[{action:"",status:"Not Started"}]),
        mkRow("QS","","",[{action:"",status:"Not Started"}]),
      ],
    }
  },

  // ── GOONELLABAH ───────────────────────────────────────────────────────────
  { id:"goonellabah", name:"Goonellabah", color:"#5B4FCF", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2024-08-23",
    sections:{
      authorities:[
        mkRow("Council","Lismore City Council","Awaiting Minor Change Modification. Public Notice finished 25/03. Response expected 10/03 latest. Surplus land to be included in future urban footprint (Draft Urban Plan). Expected date 14/04/2026.",[
          {action:"Monitor minor change modification response",person:"SS",priority:"High",status:"Awaiting Response",due:"2026-04-14",thisWeek:true},
          {action:"Monitor draft urban plan inclusion – expected 14/04/2026",person:"CB",priority:"High",status:"Awaiting Response",due:"2026-04-14"},
        ]),
        mkRow("Electricity Authority","Essential Energy","Awaiting DA.",[{action:"Awaiting DA",status:"On Hold"}]),
        mkRow("Water Authority","Gold Coast City Water","Awaiting DA.",[{action:"Awaiting DA",status:"On Hold"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","Locate Sewer Manhole.",[
          {action:"Locate sewer manhole",person:"SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Geotech","Protest Engineering","Geotech Investigation.",[
          {action:"Organise geotech investigation",person:"SS",priority:"Medium",status:"Not Started"}]),
        mkRow("Arborist","QFC","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Town Planner","HPC Consulting – Murray Wright","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Marketing","","Off Market Sale Campaign – finishes 02/04.",[
          {action:"Monitor off market sale campaign – ends 02/04",person:"CB",priority:"High",status:"In Progress",due:"2026-04-02",thisWeek:true}]),
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","",[{action:"",status:"Not Started"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 23/08/2024. $2,000,000 – 12% – 2yr Term – Dave 100%.",[{action:"Monitor debt repayment",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Hurdles","","Draft Urban Plan Inclusion. Valuation. Off Market Sale Campaign.",[
          {action:"Monitor draft urban plan inclusion progress",person:"CB",priority:"High",status:"In Progress"},
        ]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. $2,000,000 – 12% – 2yr Term – Dave 100%.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Valuers","Charter Kremer","50% Valuation 17/04. Full Valuation 5 days later.",[
          {action:"Confirm 50% valuation appointment for 17/04",person:"CB",priority:"High",status:"Not Started",due:"2026-04-17",thisWeek:true},
        ]),
        mkRow("Debt","","",[{action:"",status:"Not Started"}]),
        mkRow("QS","","",[{action:"",status:"Not Started"}]),
      ],
    }
  },

  // ── BILAMBIL ──────────────────────────────────────────────────────────────
  { id:"bilambil", name:"Bilambil", color:"#B5451B", stage:"Planning & Approvals",
    purchaseDate:"", settlementDate:"2022-03-02",
    sections:{
      authorities:[
        mkRow("Council","Tweed City Council","Modification Submission. Waiting on council to provide invoice. Documentation Submitted 12/03/2026.",[
          {action:"Follow up Tweed Council re modification invoice",person:"SS",priority:"High",status:"Awaiting Response",thisWeek:true}]),
        mkRow("Electricity Authority","Essential Energy","",[{action:"",status:"Not Started"}]),
        mkRow("Water Authority","Tweed Water","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
        mkRow("State Authority","","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","Community Title Scheme.",[
          {action:"Progress Community Title Scheme",person:"SS",priority:"Medium",status:"In Progress"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","CB/AL to follow up and check design submission. Design Completed. Timing.",[
          {action:"Follow up PECE re design submission timing",person:"AL",priority:"High",status:"In Progress",thisWeek:true,due:"2026-03-20"},
        ]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","Lodge CC once modification is approved. Design Complete.",[
          {action:"Lodge Construction Certificate once modification approved",person:"SS",priority:"High",status:"On Hold"}]),
        mkRow("Geotech","Protest Engineering","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Arborist","QFC","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","Modification Lodgement Follow Up.",[
          {action:"Follow up modification lodgement status",person:"CS",priority:"High",status:"In Progress",thisWeek:true}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","Awaiting CC Approval.",[{action:"Awaiting CC approval before proceeding",status:"On Hold"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settled 02/03/2022. $2,000,000 – 10%. $600k Ivette @10%. $1,400,000 @7%.",[{action:"Monitor debt structure",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("Hurdles","","Modification Approval.",[{action:"Progress modification approval",person:"CB/SS",priority:"High",status:"In Progress"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","CB to send AL Feaso. $2,000,000 – 10%. $600k Ivette @10%. $1,400,000 @7%.",[
          {action:"CB to send Feaso to AL",person:"CB",priority:"Medium",status:"Not Started"},
        ]),
        mkRow("Valuers","Charter Kremer","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","$1,400,000 @7% – Ivette Servicing Loan.",[{action:"Monitor Ivette servicing loan",person:"CB",priority:"Medium",status:"In Progress"}]),
        mkRow("QS","","",[{action:"",status:"Not Started"}]),
      ],
    }
  },

  // ── DAVE – CANUNGRA ───────────────────────────────────────────────────────
  { id:"canungra", name:"Canungra – Dave", color:"#7B5EA7", stage:"Land Acquisition",
    purchaseDate:"", settlementDate:"",
    sections:{
      authorities:[
        mkRow("Council","Scenic Rim Council","",[{action:"",status:"Not Started"}]),
        mkRow("Electricity Authority","Essential Energy","",[{action:"",status:"Not Started"}]),
        mkRow("Water Authority","Tweed Water","",[{action:"",status:"Not Started"}]),
        mkRow("Road Authority","TMR","",[{action:"",status:"Not Started"}]),
        mkRow("Federal Authority","Federal","",[{action:"",status:"Not Started"}]),
      ],
      legal:[
        mkRow("Solicitor / Lawyer","Johanson Lawyers","",[{action:"",status:"Not Started"}]),
        mkRow("Contracts","","",[{action:"",status:"Not Started"}]),
        mkRow("Title & Searches","","",[{action:"",status:"Not Started"}]),
      ],
      design:[
        mkRow("Survey","Andrew & Hanson","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Electrical Engineer","Peter Eustace Consulting Engineers (PECE)","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Traffic & Waste","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Landscape Architect","I-Primus – Loren","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Civil Engineer","Jason – Legend Consulting","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Geotech","Protest Engineering","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Arborist","QFC","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Town Planner","Ultimate Planning Solutions – Chris Selton","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Bushfire Consultant","","No Action.",[{action:"No action required",status:"Completed"}]),
        mkRow("Ecology","Ultimate Planning Solutions – Graham Dart","No Action.",[{action:"No action required",status:"Completed"}]),
      ],
      sales:[
        mkRow("Digital Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Physical Marketing","","",[{action:"",status:"Not Started"}]),
        mkRow("Sales","","",[{action:"",status:"Not Started"}]),
      ],
      construction:[
        mkRow("Civil Works","","",[{action:"",status:"Not Started"}]),
        mkRow("Built Form","","",[{action:"",status:"Not Started"}]),
        mkRow("Landscaping","",[{action:"",status:"Not Started"}]),
        mkRow("Defects","",[{action:"",status:"Not Started"}]),
      ],
      finance:[
        mkRow("Purchase Date","","",[{action:"",status:"Not Started"}]),
        mkRow("Settlement Date","","Settlement date TBC.",[{action:"Confirm settlement date with Dave",person:"CB",priority:"Medium",status:"Not Started"}]),
        mkRow("Hurdles","","",[{action:"",status:"Not Started"}]),
        mkRow("Accounting","","",[{action:"",status:"Not Started"}]),
        mkRow("PCG","","",[{action:"",status:"Not Started"}]),
        mkRow("Invoices","","",[{action:"",status:"Not Started"}]),
        mkRow("Feaso","","Run Dave through Feaso.",[
          {action:"Run Canungra through feasibility model",person:"CB/AL",priority:"Medium",status:"Not Started"}]),
        mkRow("Valuers","Charter Kremer","",[{action:"",status:"Not Started"}]),
        mkRow("Debt","","",[{action:"",status:"Not Started"}]),
        mkRow("QS","","",[{action:"",status:"Not Started"}]),
      ],
    }
  },

  ]; // end projects
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function getWeekRange() {
  const t=new Date(), day=t.getDay();
  const mon=new Date(t); mon.setDate(t.getDate()-(day===0?6:day-1));
  const fri=new Date(mon); fri.setDate(mon.getDate()+4);
  const f=d=>d.toLocaleDateString("en-AU",{day:"numeric",month:"short"});
  return `${f(mon)} – ${f(fri)}, ${fri.getFullYear()}`;
}
function fmtDate(s){if(!s)return"";const d=new Date(s);return isNaN(d)?s:d.toLocaleDateString("en-AU",{day:"numeric",month:"short",year:"numeric"});}

function Badge({label,cfg,small}){
  return(<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:small?"2px 7px":"3px 10px",borderRadius:20,fontSize:small?10:11,fontWeight:600,background:cfg.bg,color:cfg.text,whiteSpace:"nowrap"}}>
    {cfg.dot&&<span style={{width:5,height:5,borderRadius:"50%",background:cfg.dot,flexShrink:0}}/>}{label}</span>);
}
function Btn({onClick,children,variant="ghost",style={}}){
  const s={ghost:{background:"none",border:"1px solid #E5E7EB",color:"#6B7280"},primary:{background:TEAL,border:"none",color:"white"},danger:{background:"#FEF2F2",border:"1px solid #FCA5A5",color:"#991B1B"},gold:{background:"#FFFBEB",border:`1.5px solid ${GOLD}`,color:"#92400E"}};
  return(<button onClick={onClick} style={{padding:"3px 10px",borderRadius:5,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"sans-serif",...s[variant],...style}}>{children}</button>);
}

// ─── Task Row ─────────────────────────────────────────────────────────────────
function TaskRow({task,onUpdate,onDelete,onToggleWeek,onToggleComplete,isOnly}){
  const[editing,setEditing]=useState(false);
  const[draft,setDraft]=useState(task);
  const done=task.status==="Completed";
  const has=task.action?.trim();
  const save=()=>{onUpdate(draft);setEditing(false);};
  return(
    <div style={{display:"flex",alignItems:"flex-start",gap:8,padding:"7px 0",borderBottom:"1px dashed #F0F0F0",background:task.thisWeek?"#FFFDF5":"transparent"}}>
      <button onClick={onToggleComplete} style={{flexShrink:0,marginTop:3,width:15,height:15,borderRadius:3,padding:0,cursor:"pointer",border:`2px solid ${done?"#10B981":"#D1D5DB"}`,background:done?"#10B981":"white",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {done&&<span style={{color:"white",fontSize:8,fontWeight:900,lineHeight:1}}>✓</span>}
      </button>
      {editing?(
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:6}}>
          <textarea value={draft.action} onChange={e=>setDraft(d=>({...d,action:e.target.value}))} placeholder="Action required..." rows={2}
            style={{fontSize:12,border:"1px solid #E5E7EB",borderRadius:5,padding:"5px 8px",outline:"none",resize:"vertical",fontFamily:"sans-serif",width:"100%",boxSizing:"border-box"}}/>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {[["person",PEOPLE],["priority",PRIORITIES],["status",STATUSES]].map(([f,opts])=>(
              <select key={f} value={draft[f]} onChange={e=>setDraft(d=>({...d,[f]:e.target.value}))}
                style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"3px 6px",outline:"none",fontFamily:"sans-serif"}}>
                {opts.map(o=><option key={o}>{o}</option>)}
              </select>
            ))}
            <input type="date" value={draft.due||""} onChange={e=>setDraft(d=>({...d,due:e.target.value}))}
              style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"3px 6px",outline:"none"}}/>
            <label style={{fontSize:11,display:"flex",alignItems:"center",gap:4,cursor:"pointer",fontFamily:"sans-serif"}}>
              <input type="checkbox" checked={draft.thisWeek} onChange={e=>setDraft(d=>({...d,thisWeek:e.target.checked}))}/> This Week
            </label>
          </div>
          <div style={{display:"flex",gap:6}}>
            <Btn onClick={()=>{setDraft(task);setEditing(false);}}>Cancel</Btn>
            <Btn onClick={save} variant="primary">Save</Btn>
          </div>
        </div>
      ):(
        <div style={{flex:1,minWidth:0}}>
          {has?(
            <>
              <div style={{fontSize:12,color:done?"#9CA3AF":"#1F2937",textDecoration:done?"line-through":"none",lineHeight:1.4,marginBottom:4}}>{task.action}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:10,fontWeight:700,color:NAVY}}>@{task.person}</span>
                {task.due&&<span style={{fontSize:10,color:"#9CA3AF"}}>· {fmtDate(task.due)}</span>}
                <Badge label={task.priority} cfg={priCfg[task.priority]||priCfg.Medium} small/>
                <Badge label={task.status} cfg={stsCfg[task.status]||stsCfg["Not Started"]} small/>
              </div>
            </>
          ):<span style={{fontSize:11,color:"#CBD5E1",fontStyle:"italic"}}>No action — click Edit to add</span>}
        </div>
      )}
      {!editing&&(
        <div style={{display:"flex",gap:4,flexShrink:0,alignItems:"center"}}>
          <button onClick={onToggleWeek} style={{padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:700,cursor:"pointer",border:`1.5px solid ${task.thisWeek?GOLD:"#E5E7EB"}`,background:task.thisWeek?"#FFFBEB":"white",color:task.thisWeek?"#92400E":"#CBD5E1"}}>
            {task.thisWeek?"★":"☆"}
          </button>
          <Btn onClick={()=>{setDraft(task);setEditing(true);}}>Edit</Btn>
          {!isOnly&&<Btn onClick={onDelete} variant="danger">✕</Btn>}
        </div>
      )}
    </div>
  );
}

// ─── Consultant Block (3 columns) ─────────────────────────────────────────────
function ConsultantBlock({c,secColor,onUpdate,onAddTask,onUpdateTask,onDeleteTask,onToggleWeek,onToggleComplete,onDelete,isDefault}){
  const[editMeta,setEditMeta]=useState(false);
  const[meta,setMeta]=useState({label:c.label,name:c.name,comments:c.comments});
  const twk=c.tasks.filter(t=>t.thisWeek).length;
  const saveMeta=()=>{onUpdate({...c,...meta});setEditMeta(false);};
  return(
    <div style={{display:"grid",gridTemplateColumns:"190px 1fr 1fr",borderBottom:"1px solid #EEF0F3",background:twk>0?"#FFFDF5":"white",minHeight:52}}>
      {/* COL 1 */}
      <div style={{padding:"10px 12px",borderRight:"1px solid #EEF0F3",background:twk>0?"#FFF9E6":"#FAFBFC",display:"flex",flexDirection:"column",justifyContent:"flex-start",gap:4}}>
        {editMeta?(
          <>
            <input value={meta.label} onChange={e=>setMeta(d=>({...d,label:e.target.value}))} placeholder="Role/type"
              style={{fontSize:11,fontWeight:700,color:secColor,border:"1px solid #E5E7EB",borderRadius:4,padding:"2px 6px",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <input value={meta.name} onChange={e=>setMeta(d=>({...d,name:e.target.value}))} placeholder="Firm/contact"
              style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"2px 6px",outline:"none",width:"100%",boxSizing:"border-box"}}/>
            <div style={{display:"flex",gap:4,marginTop:2}}><Btn onClick={()=>setEditMeta(false)}>Cancel</Btn><Btn onClick={saveMeta} variant="primary">Save</Btn></div>
          </>
        ):(
          <>
            <div style={{fontSize:11,fontWeight:700,color:secColor,textTransform:"uppercase",letterSpacing:"0.04em",lineHeight:1.2}}>{c.label}</div>
            <div style={{fontSize:11,color:"#6B7280",fontStyle:c.name?"normal":"italic"}}>{c.name||"—"}</div>
            <div style={{display:"flex",gap:4,marginTop:3,flexWrap:"wrap"}}>
              <Btn onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}}>✏️ Edit</Btn>
              {!isDefault&&<Btn onClick={onDelete} variant="danger">Remove</Btn>}
            </div>
            {twk>0&&<span style={{fontSize:9,background:GOLD,color:"#78350F",padding:"1px 6px",borderRadius:20,fontWeight:700,alignSelf:"flex-start",marginTop:2}}>★ {twk} this week</span>}
          </>
        )}
      </div>
      {/* COL 2: General Comments */}
      <div style={{padding:"10px 12px",borderRight:"1px solid #EEF0F3"}}>
        {editMeta?(
          <textarea value={meta.comments} onChange={e=>setMeta(d=>({...d,comments:e.target.value}))} placeholder="General comments, status notes, background info..." rows={4}
            style={{fontSize:11,border:"1px solid #E5E7EB",borderRadius:4,padding:"4px 7px",outline:"none",resize:"vertical",fontFamily:"sans-serif",width:"100%",boxSizing:"border-box",color:"#4B5563"}}/>
        ):c.comments?(
          <div style={{fontSize:11,color:"#4B5563",lineHeight:1.55,whiteSpace:"pre-wrap",cursor:"pointer"}} onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}}>
            {c.comments}
          </div>
        ):(
          <div style={{fontSize:11,color:"#E2E8F0",fontStyle:"italic",cursor:"pointer"}} onClick={()=>{setMeta({label:c.label,name:c.name,comments:c.comments});setEditMeta(true);}}>Add comments…</div>
        )}
      </div>
      {/* COL 3: Action Items */}
      <div style={{padding:"8px 12px",display:"flex",flexDirection:"column"}}>
        {c.tasks.map(t=>(
          <TaskRow key={t.id} task={t} isOnly={c.tasks.length===1}
            onUpdate={u=>onUpdateTask(c.id,t.id,u)} onDelete={()=>onDeleteTask(c.id,t.id)}
            onToggleWeek={()=>onToggleWeek(c.id,t.id)} onToggleComplete={()=>onToggleComplete(c.id,t.id)}/>
        ))}
        <button onClick={()=>onAddTask(c.id)} style={{marginTop:6,padding:"4px 0",fontSize:11,color:TEAL,background:"none",border:"1px dashed #B2DFDB",borderRadius:5,cursor:"pointer",fontFamily:"sans-serif",fontWeight:600,textAlign:"center"}}>
          + Add Task
        </button>
      </div>
    </div>
  );
}

// ─── Section Block ────────────────────────────────────────────────────────────
function SectionBlock({sec,consultants,purchaseDate,settlementDate,onUpdateC,onAddC,onDeleteC,onAddTask,onUpdateTask,onDeleteTask,onToggleWeek,onToggleComplete,collapsed,onToggleCollapse}){
  const twk=consultants.flatMap(c=>c.tasks).filter(t=>t.thisWeek).length;
  const active=consultants.flatMap(c=>c.tasks).filter(t=>t.action?.trim()).length;
  return(
    <div style={{marginBottom:14,borderRadius:10,overflow:"hidden",border:"1.5px solid #E8ECF0",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
      <div style={{display:"flex",alignItems:"center",background:sec.color}}>
        <button onClick={onToggleCollapse} style={{flex:1,display:"flex",alignItems:"center",gap:9,padding:"11px 16px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
          <span style={{fontSize:15}}>{sec.icon}</span>
          <span style={{fontSize:13,fontWeight:700,color:"white"}}>{sec.title}</span>
          {sec.id==="finance"&&(purchaseDate||settlementDate)&&(
            <span style={{fontSize:10,color:"rgba(255,255,255,0.55)",marginLeft:4}}>
              {purchaseDate&&`📅 Purchased: ${fmtDate(purchaseDate)}`}{purchaseDate&&settlementDate&&"  ·  "}{settlementDate&&`🏁 Settlement: ${fmtDate(settlementDate)}`}
            </span>
          )}
          <span style={{flex:1}}/>
          {twk>0&&<span style={{fontSize:10,background:GOLD,color:"#78350F",padding:"2px 8px",borderRadius:20,fontWeight:700}}>★ {twk} this week</span>}
          <span style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginLeft:8}}>{active} action{active!==1?"s":""} · {collapsed?"▶":"▼"}</span>
        </button>
        {!collapsed&&<button onClick={onAddC} style={{margin:"0 12px",padding:"4px 12px",fontSize:11,fontWeight:700,background:"rgba(255,255,255,0.15)",color:"white",border:"1px solid rgba(255,255,255,0.3)",borderRadius:20,cursor:"pointer",fontFamily:"sans-serif",whiteSpace:"nowrap"}}>+ Add Row</button>}
      </div>
      {!collapsed&&(
        <>
          <div style={{display:"grid",gridTemplateColumns:"190px 1fr 1fr",background:"#F8F9FB",borderBottom:"1px solid #EEF0F3"}}>
            {["Consultant / Authority","General Comments","Action Items"].map((h,i)=>(
              <div key={h} style={{padding:"5px 12px",fontSize:10,fontWeight:700,color:"#9CA3AF",textTransform:"uppercase",letterSpacing:"0.06em",borderRight:i<2?"1px solid #EEF0F3":"none"}}>{h}</div>
            ))}
          </div>
          {consultants.map((c,idx)=>(
            <ConsultantBlock key={c.id} c={c} secColor={sec.color} isDefault={false}
              onUpdate={u=>onUpdateC(sec.id,c.id,u)} onDelete={()=>onDeleteC(sec.id,c.id)}
              onAddTask={cId=>onAddTask(sec.id,cId)}
              onUpdateTask={(cId,tId,u)=>onUpdateTask(sec.id,cId,tId,u)}
              onDeleteTask={(cId,tId)=>onDeleteTask(sec.id,cId,tId)}
              onToggleWeek={(cId,tId)=>onToggleWeek(sec.id,cId,tId)}
              onToggleComplete={(cId,tId)=>onToggleComplete(sec.id,cId,tId)}/>
          ))}
        </>
      )}
    </div>
  );
}

// ─── This Week row ────────────────────────────────────────────────────────────
function WeekRow({item,onToggleWeek,onToggleComplete,onNavigate}){
  const done=item.status==="Completed";
  return(
    <div style={{background:done?"#FAFAFA":"white",border:"1px solid #E8ECF0",borderLeft:`3px solid ${item.projectColor}`,borderRadius:7,marginBottom:5,padding:"10px 14px",display:"flex",alignItems:"flex-start",gap:10,opacity:done?0.65:1}}>
      <button onClick={()=>onToggleComplete(item.projectId,item.secId,item.cId,item.tId)}
        style={{flexShrink:0,marginTop:2,width:18,height:18,borderRadius:4,border:`2px solid ${done?"#10B981":"#D1D5DB"}`,background:done?"#10B981":"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0}}>
        {done&&<span style={{color:"white",fontSize:9,fontWeight:900}}>✓</span>}
      </button>
      <div style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",alignItems:"center",gap:5,flexWrap:"wrap",marginBottom:3}}>
          <span style={{fontSize:10,fontWeight:700,color:item.projectColor,textTransform:"uppercase",letterSpacing:"0.04em"}}>{item.projectName}</span>
          <span style={{color:"#CBD5E1",fontSize:10}}>›</span>
          <span style={{fontSize:10,color:"#9CA3AF"}}>{item.secTitle}</span>
          <span style={{color:"#CBD5E1",fontSize:10}}>›</span>
          <span style={{fontSize:10,color:"#6B7280"}}>{item.cLabel}{item.cName?` · ${item.cName}`:""}</span>
        </div>
        <div style={{fontSize:13,fontWeight:600,color:done?"#9CA3AF":"#1F2937",textDecoration:done?"line-through":"none",marginBottom:4}}>{item.action}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
          <span style={{fontSize:11,fontWeight:700,color:NAVY}}>@{item.person}</span>
          {item.due&&<span style={{fontSize:11,color:"#9CA3AF"}}>Due {fmtDate(item.due)}</span>}
          <Badge label={item.priority} cfg={priCfg[item.priority]||priCfg.Medium} small/>
          <Badge label={item.status} cfg={stsCfg[item.status]||stsCfg["Not Started"]} small/>
        </div>
      </div>
      <div style={{display:"flex",gap:5,flexShrink:0}}>
        <Btn onClick={()=>onToggleWeek(item.projectId,item.secId,item.cId,item.tId)} variant="gold">★ Remove</Btn>
        <Btn onClick={()=>onNavigate(item.projectId)}>Open →</Btn>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App(){
  const[projects,setProjects]=useState(()=>buildProjects());
  const[view,setView]=useState("thisweek");
  const[activeProject,setActiveProject]=useState(null);
  const[search,setSearch]=useState("");
  const[filterPerson,setFilterPerson]=useState("All");
  const[filterPriority,setFilterPriority]=useState("All");
  const[collapsed,setCollapsed]=useState({});
  const[showAdd,setShowAdd]=useState(false);
  const[newName,setNewName]=useState("");
  const[newStage,setNewStage]=useState("Planning & Approvals");

  const mutate=fn=>setProjects(ps=>ps.map(p=>p.id===activeProject?fn(p):p));
  const updC=(sId,cId,u)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?u:c)}}));
  const addC=sId=>mutate(p=>({...p,sections:{...p.sections,[sId]:[...p.sections[sId],mkRow()]}}));
  const delC=(sId,cId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].filter(c=>c.id!==cId)}}));
  const addT=(sId,cId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:[...c.tasks,mkTask()]}:c)}}));
  const updT=(sId,cId,tId,u)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?u:t)}:c)}}));
  const delT=(sId,cId,tId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.filter(t=>t.id!==tId)}:c)}}));
  const togW=(sId,cId,tId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?{...t,thisWeek:!t.thisWeek}:t)}:c)}}));
  const togC=(sId,cId,tId)=>mutate(p=>({...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id===cId?{...c,tasks:c.tasks.map(t=>t.id===tId?{...t,status:t.status==="Completed"?"In Progress":"Completed"}:t)}:c)}}));

  const gTog=(pId,sId,cId,tId,type)=>setProjects(ps=>ps.map(p=>p.id!==pId?p:{...p,sections:{...p.sections,[sId]:p.sections[sId].map(c=>c.id!==cId?c:{...c,tasks:c.tasks.map(t=>t.id!==tId?t:type==="week"?{...t,thisWeek:!t.thisWeek}:{...t,status:t.status==="Completed"?"In Progress":"Completed"})})}}));

  const addProject=()=>{if(!newName.trim())return;const cs=["#0E7A6F","#1B3A5C","#E07B39","#5B4FCF","#2D6A4F","#B5451B","#7B5EA7","#C9A84C"];
    const secs={};SECTION_META.forEach(s=>{secs[s.id]=[];});
    setProjects(ps=>[...ps,{id:uid(),name:newName.trim(),color:cs[ps.length%cs.length],stage:newStage,purchaseDate:"",settlementDate:"",sections:secs}]);
    setNewName("");setShowAdd(false);};

  const thisWeekItems=[];
  projects.forEach(p=>{SECTION_META.forEach(sec=>{(p.sections[sec.id]||[]).forEach(c=>{c.tasks.forEach(t=>{if(t.thisWeek&&t.action?.trim())thisWeekItems.push({...t,projectId:p.id,projectName:p.name,projectColor:p.color,secId:sec.id,secTitle:sec.title,cId:c.id,cLabel:c.label,cName:c.name,tId:t.id});});});});});

  const applyF=items=>items.filter(i=>{
    const ms=!search||i.action?.toLowerCase().includes(search.toLowerCase())||i.cName?.toLowerCase().includes(search.toLowerCase());
    return ms&&(filterPerson==="All"||i.person===filterPerson)&&(filterPriority==="All"||i.priority===filterPriority);
  });
  const filtered=applyF(thisWeekItems);
  const total=thisWeekItems.length,done=thisWeekItems.filter(i=>i.status==="Completed").length,high=thisWeekItems.filter(i=>i.priority==="High"&&i.status!=="Completed").length;
  const cur=projects.find(p=>p.id===activeProject);
  const today=new Date();

  const FilterBar=()=>(
    <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search actions or consultants..."
        style={{flex:1,minWidth:180,padding:"8px 14px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:12,outline:"none",fontFamily:"sans-serif"}}/>
      {[["Person",filterPerson,setFilterPerson,["All",...PEOPLE]],["Priority",filterPriority,setFilterPriority,["All",...PRIORITIES]]].map(([l,v,s,o])=>(
        <select key={l} value={v} onChange={e=>s(e.target.value)} style={{padding:"8px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,fontSize:12,background:"white",cursor:"pointer",fontFamily:"sans-serif"}}>
          {o.map(op=><option key={op}>{op==="All"?`All ${l}s`:op}</option>)}
        </select>
      ))}
    </div>
  );

  return(
    <div style={{fontFamily:"'Georgia',serif",background:"#F0F2F5",minHeight:"100vh"}}>
      {/* Top Bar */}
      <div style={{background:NAVY,padding:"0 24px",display:"flex",alignItems:"center",borderBottom:`3px solid ${GOLD}`}}>
        <div onClick={()=>{setView("thisweek");setActiveProject(null);}} style={{display:"flex",alignItems:"baseline",gap:10,padding:"14px 0",cursor:"pointer"}}>
          <span style={{fontSize:22,fontWeight:800,color:GOLD,letterSpacing:"-0.02em"}}>SALT</span>
          <span style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontFamily:"sans-serif"}}>Property Development</span>
        </div>
        <div style={{flex:1}}/>
        {[{k:"thisweek",l:"★ This Week"},{k:"projects",l:"All Projects"}].map(({k,l})=>(
          <button key={k} onClick={()=>{setView(k);setActiveProject(null);}} style={{padding:"8px 18px",marginLeft:2,border:"none",background:"transparent",borderBottom:view===k&&!activeProject?`3px solid ${GOLD}`:"3px solid transparent",color:view===k&&!activeProject?GOLD:"rgba(255,255,255,0.55)",fontWeight:view===k&&!activeProject?700:400,cursor:"pointer",fontSize:13,fontFamily:"sans-serif"}}>{l}</button>
        ))}
        <div style={{width:1,height:28,background:"rgba(255,255,255,0.1)",margin:"0 14px"}}/>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.3)",fontFamily:"sans-serif"}}>{today.toLocaleDateString("en-AU",{weekday:"short",day:"numeric",month:"short",year:"numeric"})}</span>
      </div>

      <div style={{maxWidth:1180,margin:"0 auto",padding:"24px"}}>

        {/* ══ THIS WEEK ══ */}
        {view==="thisweek"&&!activeProject&&(<>
          <div style={{background:NAVY,borderRadius:12,padding:"22px 28px",marginBottom:20,display:"flex",alignItems:"center",gap:24,flexWrap:"wrap"}}>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:GOLD,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4,fontFamily:"sans-serif"}}>Week in Focus</div>
              <div style={{fontSize:18,fontWeight:700,color:"white",marginBottom:2}}>{getWeekRange()}</div>
              <div style={{fontSize:12,color:"rgba(255,255,255,0.4)",fontFamily:"sans-serif"}}>{done} of {total} completed</div>
              <div style={{marginTop:10,height:5,background:"rgba(255,255,255,0.1)",borderRadius:10,maxWidth:280}}>
                <div style={{height:"100%",width:`${total?(done/total)*100:0}%`,background:GOLD,borderRadius:10,transition:"width 0.4s"}}/>
              </div>
            </div>
            {[["Total",total,"white"],["High ⚠",high,"#FCA5A5"],["Done",done,"#6EE7B7"],["Remaining",total-done,GOLD]].map(([l,v,c])=>(
              <div key={l} style={{textAlign:"center",padding:"0 14px",borderLeft:"1px solid rgba(255,255,255,0.1)"}}>
                <div style={{fontSize:26,fontWeight:800,color:c,lineHeight:1}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:4,fontFamily:"sans-serif",textTransform:"uppercase"}}>{l}</div>
              </div>
            ))}
          </div>
          <FilterBar/>
          {projects.map(p=>{const items=filtered.filter(i=>i.projectId===p.id);if(!items.length)return null;return(
            <div key={p.id} style={{marginBottom:18}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
                <div style={{width:9,height:9,borderRadius:"50%",background:p.color}}/>
                <span style={{fontSize:12,fontWeight:700,color:p.color,textTransform:"uppercase",letterSpacing:"0.05em"}}>{p.name}</span>
                <span style={{fontSize:11,color:"#9CA3AF",fontFamily:"sans-serif"}}>{items.filter(i=>i.status==="Completed").length}/{items.length} done</span>
                <div style={{flex:1,height:1,background:"#E5E7EB"}}/>
                <button onClick={()=>{setActiveProject(p.id);setView("project");}} style={{fontSize:11,color:TEAL,background:"none",border:"none",cursor:"pointer",fontWeight:600,fontFamily:"sans-serif"}}>Open Project →</button>
              </div>
              {items.map(item=><WeekRow key={`${item.projectId}-${item.secId}-${item.cId}-${item.tId}`} item={item} onToggleWeek={(pId,sId,cId,tId)=>gTog(pId,sId,cId,tId,"week")} onToggleComplete={(pId,sId,cId,tId)=>gTog(pId,sId,cId,tId,"done")} onNavigate={id=>{setActiveProject(id);setView("project");}}/>)}
            </div>
          );})}
          {filtered.length===0&&(<div style={{textAlign:"center",padding:"60px",color:"#9CA3AF"}}><div style={{fontSize:36,marginBottom:10}}>☆</div><div style={{fontSize:15,fontWeight:600,marginBottom:6}}>No actions flagged this week</div><div style={{fontSize:12,fontFamily:"sans-serif"}}>Open a project and tap ☆ on any task to flag it for this week</div></div>)}
        </>)}

        {/* ══ ALL PROJECTS ══ */}
        {view==="projects"&&!activeProject&&(<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <h2 style={{margin:0,fontSize:18,color:NAVY}}>All Projects</h2>
            <Btn onClick={()=>setShowAdd(v=>!v)} variant="primary" style={{padding:"8px 18px",fontSize:13}}>+ New Project</Btn>
          </div>
          {showAdd&&(<div style={{background:"white",border:"1.5px solid #E5E7EB",borderRadius:10,padding:16,marginBottom:16,display:"flex",gap:8,flexWrap:"wrap",alignItems:"flex-end"}}>
            <div style={{flex:1,minWidth:180,display:"flex",flexDirection:"column",gap:4}}>
              <label style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",fontFamily:"sans-serif"}}>Project Name</label>
              <input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="e.g. Smith Road Coomera" style={{padding:"8px 12px",border:"1.5px solid #E5E7EB",borderRadius:6,fontSize:13,outline:"none",fontFamily:"sans-serif"}}/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:4}}>
              <label style={{fontSize:10,fontWeight:700,color:"#6B7280",textTransform:"uppercase",fontFamily:"sans-serif"}}>Stage</label>
              <select value={newStage} onChange={e=>setNewStage(e.target.value)} style={{padding:"8px 12px",border:"1.5px solid #E5E7EB",borderRadius:6,fontSize:13,outline:"none",fontFamily:"sans-serif"}}>
                {STAGES.map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
            <Btn onClick={addProject} variant="primary" style={{padding:"8px 18px",fontSize:13}}>Add</Btn>
            <Btn onClick={()=>setShowAdd(false)} style={{padding:"8px 14px",fontSize:13}}>Cancel</Btn>
          </div>)}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))",gap:12}}>
            {projects.map(p=>{
              const all=SECTION_META.flatMap(s=>(p.sections[s.id]||[]).flatMap(c=>c.tasks));
              const act=all.filter(t=>t.action?.trim()),dn=all.filter(t=>t.status==="Completed"),tw=all.filter(t=>t.thisWeek&&t.action?.trim()).length,hi=all.filter(t=>t.priority==="High"&&t.status!=="Completed"&&t.action?.trim()).length;
              return(<div key={p.id} onClick={()=>{setActiveProject(p.id);setView("project");}}
                style={{background:"white",border:"1.5px solid #E8ECF0",borderTop:`4px solid ${p.color}`,borderRadius:10,padding:"16px 18px",cursor:"pointer"}}
                onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.08)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                  <div><div style={{fontSize:14,fontWeight:700,color:NAVY,marginBottom:4}}>{p.name}</div><Badge label={p.stage} cfg={{bg:"#F3F4F6",text:"#374151"}} small/></div>
                  <div style={{width:34,height:34,borderRadius:"50%",background:p.color,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:14,fontWeight:700}}>{p.name[0]}</div>
                </div>
                {(p.purchaseDate||p.settlementDate)&&<div style={{fontSize:10,color:"#9CA3AF",marginBottom:8,fontFamily:"sans-serif"}}>{p.purchaseDate&&`Purchased: ${fmtDate(p.purchaseDate)}`}{p.purchaseDate&&p.settlementDate&&"  ·  "}{p.settlementDate&&`Settlement: ${fmtDate(p.settlementDate)}`}</div>}
                <div style={{display:"flex",gap:14}}>
                  {[["Tasks",act.length],["Done",dn.length],["This Wk",tw],["High ⚠",hi]].map(([l,v])=>(
                    <div key={l} style={{textAlign:"center"}}><div style={{fontSize:17,fontWeight:700,color:l==="High ⚠"&&v>0?"#EF4444":NAVY}}>{v}</div><div style={{fontSize:9,color:"#9CA3AF",fontFamily:"sans-serif",textTransform:"uppercase"}}>{l}</div></div>
                  ))}
                </div>
                <div style={{marginTop:10,height:3,background:"#F3F4F6",borderRadius:10}}><div style={{height:"100%",width:`${act.length?(dn.length/act.length)*100:0}%`,background:p.color,borderRadius:10}}/></div>
              </div>);
            })}
          </div>
        </>)}

        {/* ══ SINGLE PROJECT ══ */}
        {activeProject&&cur&&(<>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
            <button onClick={()=>setActiveProject(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:13,color:TEAL,fontWeight:600,fontFamily:"sans-serif"}}>← Back</button>
            <div style={{width:1,height:20,background:"#E5E7EB"}}/>
            <div style={{width:10,height:10,borderRadius:"50%",background:cur.color}}/>
            <h2 style={{margin:0,fontSize:18,color:NAVY}}>{cur.name}</h2>
            <Badge label={cur.stage} cfg={{bg:"#F3F4F6",text:"#374151"}} small/>
          </div>
          {(cur.purchaseDate||cur.settlementDate)&&<div style={{fontSize:11,color:"#9CA3AF",marginBottom:14,fontFamily:"sans-serif"}}>{cur.purchaseDate&&`📅 Purchase: ${fmtDate(cur.purchaseDate)}`}{cur.purchaseDate&&cur.settlementDate&&"   ·   "}{cur.settlementDate&&`🏁 Settlement: ${fmtDate(cur.settlementDate)}`}</div>}
          <FilterBar/>
          <div style={{display:"flex",gap:8,marginBottom:14}}>
            <Btn onClick={()=>{const s={};SECTION_META.forEach(m=>{s[`${cur.id}-${m.id}`]=true;});setCollapsed(s);}}>Collapse All</Btn>
            <Btn onClick={()=>setCollapsed({})}>Expand All</Btn>
          </div>
          {SECTION_META.map(sec=>(
            <SectionBlock key={sec.id} sec={sec} consultants={cur.sections[sec.id]||[]} purchaseDate={cur.purchaseDate} settlementDate={cur.settlementDate}
              onUpdateC={(sId,cId,u)=>updC(sId,cId,u)} onAddC={()=>addC(sec.id)} onDeleteC={(sId,cId)=>delC(sId,cId)}
              onAddTask={(sId,cId)=>addT(sId,cId)} onUpdateTask={(sId,cId,tId,u)=>updT(sId,cId,tId,u)} onDeleteTask={(sId,cId,tId)=>delT(sId,cId,tId)}
              onToggleWeek={(sId,cId,tId)=>togW(sId,cId,tId)} onToggleComplete={(sId,cId,tId)=>togC(sId,cId,tId)}
              collapsed={!!collapsed[`${cur.id}-${sec.id}`]} onToggleCollapse={()=>setCollapsed(s=>({...s,[`${cur.id}-${sec.id}`]:!s[`${cur.id}-${sec.id}`]}))}/>
          ))}
        </>)}
      </div>
    </div>
  );
}
