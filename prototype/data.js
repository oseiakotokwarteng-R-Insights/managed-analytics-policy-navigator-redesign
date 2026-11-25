// Sample data for the redesign concept.
// Everything here was copied by hand from the live Data Center Policy Navigator
// (tamingdatacenters.com) on 25 Nov 2026, for Virginia and Texas only.
// The short descriptions and bill summaries are my own wording, not Climate Cabinet's text.
// Nothing here has been checked against the original sources.

window.NAV_DATA = {
  asOf: "25 Nov 2026",

  states: {
    VA: {
      name: "Virginia",
      market: "a regional market run by a multi-state grid operator",
      projects: { operating: 460, approved: 23, proposed: 339 },
      status: {
        "verified-demand": "none",
        "committed-capital": "in",
        "cause-and-pay": "partial",
        "real-cost-pricing": "none",
        "load-flexibility": "none",
        "scenario-planning": "none",
        "new-clean-supply": "none",
        "siting-community": "partial",
        "incentive-clawbacks": "partial"
      }
    },
    TX: {
      name: "Texas",
      market: "an energy-only market",
      projects: { operating: 129, approved: 39, proposed: 148 },
      status: {
        "verified-demand": "partial",
        "committed-capital": "partial",
        "cause-and-pay": "partial",
        "real-cost-pricing": "none",
        "load-flexibility": "partial",
        "scenario-planning": "partial",
        "new-clean-supply": "none",
        "siting-community": "none",
        "incentive-clawbacks": "none"
      }
    }
  },

  priorities: {
    ratepayers: {
      label: "Keep costs off household bills and keep the lights on",
      short: "household bills and the grid",
      dimensions: ["cost", "planning", "reliability"]
    },
    clean: {
      label: "Get new clean power, not new fossil fuel plants",
      short: "new clean power",
      dimensions: ["clean"]
    },
    communities: {
      label: "Protect the communities where data centers get built",
      short: "host communities",
      dimensions: ["community", "water"]
    },
    subsidies: {
      label: "Make sure tax breaks pay off",
      short: "tax breaks that pay off",
      dimensions: ["incentive"]
    }
  },

  stages: {
    none: { label: "Not one in particular", phase: null },
    approval: { label: "One that hasn't been approved yet", phase: "before" },
    building: { label: "One that is being built", phase: "during" },
    operating: { label: "One that is already running", phase: "during" }
  },

  phases: {
    before: "Before approval",
    during: "While it runs",
    after: "After the deal"
  },

  // The nine protections. Names follow the framework's public element names.
  elements: [
    {
      id: "verified-demand", n: 1, name: "Verified demand", phase: "before",
      themes: ["ratepayers"],
      line: "An independent check on how much power a project really needs before the grid is built around it.",
      detail: "Developers often supply their own demand numbers, and those numbers drive big grid spending. A neutral third party checking them first keeps ratepayers from paying for power that never gets used."
    },
    {
      id: "committed-capital", n: 2, name: "Committed capital", phase: "before",
      themes: ["ratepayers"],
      line: "Developers put real money behind the grid costs they cause.",
      detail: "Bonds, deposits and take-or-pay contracts mean a project pays for the grid capacity it reserved, even if it never uses it. Without them, a canceled project can walk away and leave ratepayers with the cost."
    },
    {
      id: "cause-and-pay", n: 3, name: "Cause and pay", phase: "before",
      themes: ["ratepayers"],
      line: "Whoever causes a grid upgrade pays for it.",
      detail: "New lines and substations built for one giant facility get charged to that facility through its interconnection terms, not spread across every household bill."
    },
    {
      id: "real-cost-pricing", n: 4, name: "Real cost pricing", phase: "during",
      themes: ["ratepayers", "clean"],
      line: "Large users pay prices that reflect what it really costs to serve them.",
      detail: "Power costs more at some hours and in some places. A flat rate lets everyone else absorb the difference, and it gives the facility no reason to shift when it uses power."
    },
    {
      id: "load-flexibility", n: 5, name: "Load flexibility", phase: "during",
      themes: ["ratepayers", "clean"],
      line: "Big facilities cut back first in a grid emergency, before households.",
      detail: "A data center that can curtail or shift its use helps the grid in a crunch. Making that commitment enforceable means households aren't the first ones asked to sacrifice."
    },
    {
      id: "scenario-planning", n: 6, name: "Scenario planning", phase: "during",
      themes: ["ratepayers", "clean"],
      line: "Planners test what happens if the expected demand never shows up.",
      detail: "Utilities often plan around one hopeful forecast and then build to it. Requiring high, low and no growth cases keeps a single company's projection from turning into decades of obligations for ratepayers."
    },
    {
      id: "new-clean-supply", n: 7, name: "New clean supply", phase: "after",
      themes: ["clean"],
      line: "New demand is met with newly built clean power.",
      detail: "Without a clean supply rule, new large loads tend to trigger fast, reactive fossil fuel buildout. Credits can also be a loophole that adds nothing to the grid, which is why additionality matters."
    },
    {
      id: "siting-community", n: 8, name: "Siting and community", phase: "after",
      themes: ["communities"],
      line: "Local communities get a real say before a site is locked in.",
      detail: "Water use, noise, land and combined impacts get studied with public comment, and local governments keep their zoning power. Protections lost at this stage are the hardest to win back."
    },
    {
      id: "incentive-clawbacks", n: 9, name: "Incentive clawbacks", phase: "after",
      themes: ["subsidies"],
      line: "Tax breaks only pay out for jobs and investment that show up.",
      detail: "Subsidies are tied to the jobs, investment and energy promises that justified them, with a clawback from the date a facility falls short. Without that, communities may never see what they were promised."
    }
  ],

  // Plain definitions, written for this concept.
  glossary: {
    "ratepayers": "Everyone who pays an electric bill, so households and small businesses, not just big customers.",
    "take-or-pay": "A contract where the customer pays for a set amount of power whether or not they use it.",
    "curtail": "To cut back electricity use, usually when the grid is stressed.",
    "interconnection": "The physical and legal process of hooking a large facility up to the grid.",
    "clawback": "A rule that lets the state take tax benefits back if promised results don't happen.",
    "additionality": "The idea that a clean energy purchase should lead to new clean power being built, not relabel power that already existed.",
    "stranded costs": "Money spent on grid capacity that ends up unused, usually passed on to everyone else.",
    "hyperscale": "Very large data centers, often drawing as much power as a small city."
  },

  // Dimensions used to tag bills.
  dimensions: {
    cost: "Grid cost protection",
    planning: "Grid planning",
    reliability: "Grid reliability",
    clean: "Clean energy supply",
    incentive: "Incentive reform",
    community: "Community protection",
    water: "Water stewardship"
  },

  // 26 example bills. "status" is the label shown on the live tool.
  // check: true means the label and the summary seem to disagree, so it needs a source check.
  bills: [
    { state: "PA", id: "SB 1384", year: 2025, status: "Introduced", dims: ["clean", "incentive", "community"], text: "Closes the state's data center incentive to new applicants and ties a new one to matched clean power, jobs and cost coverage." },
    { state: "CO", id: "SB 102", year: 2026, status: "Failed", dims: ["clean", "cost", "planning", "reliability", "community", "water"], text: "Would have required long contracts, banned discount rates and required hourly clean power matching and community agreements." },
    { state: "FL", id: "SB 484", year: 2026, status: "Passed", dims: ["cost", "water"], text: "Utilities must set special tariffs so large customers cover their own costs. Keeps local zoning and adds a water permit hearing." },
    { state: "NJ", id: "A 796", year: 2026, status: "Passed", dims: ["clean", "cost", "planning", "reliability"], text: "Special utility rules for big data centers: an 85% minimum use commitment, financial security and cutbacks ahead of homes." },
    { state: "TX", id: "SB 6", year: 2025, status: "Failed", check: true, dims: ["cost", "planning", "reliability"], text: "Large users pay to connect, meet financial commitments and can be cut back during grid stress." },
    { state: "IL", id: "SB 4016", year: 2025, status: "Introduced", dims: ["clean", "cost", "planning", "incentive", "reliability", "community", "water"], text: "Clean supply plans, cost rules, impact assessments and community benefit agreements. Stalled in committee." },
    { state: "PA", id: "HB 1834", year: 2025, status: "Engrossed", dims: ["clean", "cost", "planning", "incentive", "reliability", "community"], text: "Financial security, exit fees, cost causation and rising clean power requirements. Passed the House." },
    { state: "MD", id: "HB 1532", year: 2026, status: "Passed", dims: ["clean", "cost"], text: "A separate rate schedule for large users with collateral and exit fees, plus voluntary tiers for new clean energy." },
    { state: "DE", id: "HB 233", year: 2025, status: "Introduced", check: true, dims: ["clean", "cost"], text: "Ten year service agreements, a separate rate class and cutbacks in grid emergencies." },
    { state: "MI", id: "HB 5790", year: 2025, status: "Introduced", dims: [], text: "Adds green building and clean energy conditions to an existing tax break, with repayment if missed." },
    { state: "OH", id: "SB 381", year: 2025, status: "Introduced", dims: ["cost", "planning"], text: "The utility regulator must approve a connection before construction, based on an independent forecast." },
    { state: "SC", id: "S 902", year: 2025, status: "Introduced", dims: ["cost", "community", "water"], text: "A siting act with decommissioning plans and a commission certificate before building." },
    { state: "WA", id: "HB 1846", year: 2021, status: "Passed", dims: ["incentive"], text: "A sales tax break that depends on family wage jobs and a green building certificate, with repayment if missed." },
    { state: "ID", id: "HB 911", year: 2026, status: "Passed", dims: ["cost", "planning"], text: "Regulators approve large new loads before they connect, using a no harm test and financial security." },
    { state: "NC", id: "S 1026", year: 2025, status: "Introduced", dims: ["cost", "planning"], text: "Reviews demand forecasts, requires 20 year contracts and creates a large load tariff. Pending in a Senate committee." },
    { state: "IL", id: "HB 5607", year: 2025, status: "Introduced", dims: ["clean"], text: "Hourly clean power matching from 20% in 2030 to 100% in 2035, though credits can come from older plants." },
    { state: "NJ", id: "A 4801", year: 2026, status: "Engrossed", dims: ["cost"], text: "Large loads post financial security, report their demand and bear backstop power costs." },
    { state: "PA", id: "HB 2246", year: 2025, status: "Engrossed", dims: ["water"], text: "Data centers using over 100,000 gallons of water a day must disclose sources and conservation plans and get a permit." },
    { state: "IN", id: "SB 431", year: 2025, status: "Passed", dims: ["planning"], text: "Bars new data centers owned by foreign adversaries unless a state study shows they won't strain the grid." },
    { state: "ND", id: "HB 1427", year: 2025, status: "Introduced", dims: ["community"], text: "Would have required impact studies and a commission hearing. The sponsor withdrew it." },
    { state: "OH", id: "HB 706", year: 2025, status: "Introduced", dims: ["cost"], text: "Minimum 12 year contracts, exit fees and collateral. Upgrade costs can't be passed to other customers." },
    { state: "PA", id: "HB 2516", year: 2025, status: "Introduced", dims: ["community"], text: "Statewide zoning minimums, such as 2,500 foot setbacks from homes and a public hearing." },
    { state: "VA", id: "SB 552", year: 2026, status: "Introduced", dims: ["community"], text: "Two public hearings and a required impact assessment before approval. It died in committee." },
    { state: "AL", id: "SB 270", year: 2026, status: "Passed", dims: ["cost"], text: "The Public Service Commission reviews large data center contracts and approves only those that cover their costs." },
    { state: "ME", id: "LD 912", year: 2025, status: "Passed", dims: [], text: "Caps data center supply at 25% of a provider's in-state sales." },
    { state: "TX", id: "HB 5588", year: 2025, status: "Introduced", dims: [], text: "A property tax break if the facility is self sufficient and signs a grid services agreement. No clawback." }
  ],

  stateNames: {
    AL: "Alabama", CO: "Colorado", DE: "Delaware", FL: "Florida", ID: "Idaho", IL: "Illinois",
    IN: "Indiana", ME: "Maine", MD: "Maryland", MI: "Michigan", NJ: "New Jersey", NC: "North Carolina",
    ND: "North Dakota", OH: "Ohio", PA: "Pennsylvania", SC: "South Carolina", TX: "Texas",
    VA: "Virginia", WA: "Washington"
  }
};
