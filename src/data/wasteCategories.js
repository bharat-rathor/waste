export const wasteCategories = [
  {
    id: "wet-waste",
    name: "Wet Waste",
    tagline: "Biodegradable & Organic Waste",
    color: "#2e7d32",
    bgColor: "#e8f5e9",
    borderColor: "#a5d6a7",
    description: "Wet waste mainly consists of biodegradable materials that can decompose naturally through biological processes, making them ideal for composting and biogas generation.",
    shortDescription: "Biodegradable kitchen and garden waste that decomposes naturally.",
    examples: [
      "Vegetable peels and fruit leftovers",
      "Cooked and uncooked food scraps",
      "Used tea leaves and coffee grounds",
      "Egg shells and nut shells",
      "Garden leaves, twigs, and flower waste"
    ],
    guidance: [
      "Always keep wet waste strictly separate from dry and hazardous waste.",
      "Use a dedicated, well-ventilated or covered bin lined with compostable liners or newspaper.",
      "Drain excess liquids before depositing food waste into the wet waste bin.",
      "Compost organic waste at home using a simple compost bin or pot to create rich garden soil.",
      "Never mix batteries, chemicals, plastics, or sanitary waste into wet waste."
    ],
    dos: [
      "Compost kitchen scraps whenever possible",
      "Empty food scraps daily to prevent odor and pests",
      "Chop large fruit rinds to speed up natural breakdown"
    ],
    donts: [
      "Do not wrap wet waste in single-use plastic bags",
      "Do not toss plastic packaging or cutlery with leftover food",
      "Do not include cooking oil or animal bones in small home compost pots"
    ],
    disposalTip: "Best suited for municipal organic collection, community composters, or DIY garden composting."
  },
  {
    id: "dry-waste",
    name: "Dry Waste",
    tagline: "Clean, Dry & Non-Biodegradable",
    color: "#0288d1",
    bgColor: "#e1f5fe",
    borderColor: "#81d4fa",
    description: "Dry waste includes materials that are clean, non-wet, and do not decompose naturally. These items can be recovered, sorted, reused, or recycled depending on their condition.",
    shortDescription: "Non-biodegradable, non-wet items like clean paper, cartons, and packaging.",
    examples: [
      "Cardboard cartons and shipping boxes",
      "Newspapers, magazines, and notebook pages",
      "Clean paper bags and packaging envelopes",
      "Egg cartons and cardboard tubes",
      "Clean tetra paks and non-greasy wrappers"
    ],
    guidance: [
      "Keep all dry materials completely clean and dry to prevent mold and cross-contamination.",
      "Flatten cardboard boxes and paper cartons to save space in collection bins.",
      "Separate reusable cartons and paper from damaged or soiled paper.",
      "Send clean sorted dry waste to local scrap dealers (kabadiwalas) or municipal dry waste centers."
    ],
    dos: [
      "Flatten boxes to save storage space",
      "Store dry waste in a moisture-free area",
      "Reuse sturdy cartons for storage or DIY crafts"
    ],
    donts: [
      "Do not mix pizza boxes covered in grease with recyclable paper",
      "Do not let dry waste get wet or rain-soaked",
      "Do not throw plastic tape or synthetic stickers into paper pulping"
    ],
    disposalTip: "Drop off at dry waste collection kiosks, sell to scrap collectors, or upcycle into home organizers."
  },
  {
    id: "recyclable-waste",
    name: "Recyclable Waste",
    tagline: "Reprocessable Plastics, Glass & Metals",
    color: "#f57c00",
    bgColor: "#fff3e0",
    borderColor: "#ffcc80",
    description: "Recyclable waste consists of valuable secondary materials that can be remanufactured into new products when delivered to specialized collection and recycling facilities.",
    shortDescription: "High-value plastics, glass bottles, metal cans, and aluminium containers.",
    examples: [
      "Clean PET plastic bottles (water and beverage containers)",
      "Glass jars and beverage bottles",
      "Aluminium and tin beverage cans",
      "HDPE plastic jugs (shampoo, milk, detergent bottles)",
      "Metal jar lids and food tins"
    ],
    guidance: [
      "Rinse food containers with a little water and let them air-dry before placing in recycling bins.",
      "Remove non-recyclable caps or film seals if instructed by local guidelines.",
      "Check recycling resin identification codes (PET 1, HDPE 2, PP 5 are widely accepted).",
      "Never assume every glossy plastic packaging item is recyclable in municipal streams."
    ],
    dos: [
      "Rinse and dry food cans and drink bottles",
      "Crush plastic bottles to reduce volume",
      "Sort glass bottles separately from aluminium"
    ],
    donts: [
      "Do not recycle broken window panes or ceramics with bottle glass",
      "Do not recycle contaminated oil containers without specialized treatment",
      "Do not bag recyclables in black garbage bags unless requested"
    ],
    disposalTip: "Hand over to authorized recycling partners, deposit in neighborhood recycling bins, or use for DIY upcycling."
  },
  {
    id: "hazardous-waste",
    name: "Hazardous Waste",
    tagline: "Toxic, Corrosive & Flammable Household Waste",
    color: "#d32f2f",
    bgColor: "#ffebee",
    borderColor: "#ef9a9a",
    description: "Hazardous household waste contains chemicals, corrosive agents, or heavy metals that can contaminate soil, groundwater, and endanger sanitation workers when handled incorrectly.",
    shortDescription: "Batteries, paint residues, solvents, and harsh household chemicals.",
    examples: [
      "Household batteries (alkaline, lithium, button cells)",
      "Expired medications and pharmaceutical syrups",
      "Paint cans, thinners, and chemical solvents",
      "Pesticides, mosquito repellents, and disinfectant bottles",
      "Fluorescent tubes and CFL light bulbs"
    ],
    guidance: [
      "Keep hazardous waste completely segregated from ordinary household wet and dry trash.",
      "Never mix different chemical containers together as toxic reactions can occur.",
      "Avoid pouring toxic chemicals, paints, or solvents down sinks or storm drains.",
      "Store safely out of reach of children and domestic pets until a disposal drive."
    ],
    dos: [
      "Keep products in their original labeled containers whenever possible",
      "Tape battery terminals to prevent short circuits during storage",
      "Hand over to specialized municipal hazardous waste drives"
    ],
    donts: [
      "Never dispose of batteries in general waste bins or compost piles",
      "Never burn chemical containers or aerosol cans",
      "Never flush expired pills or antibiotics down the toilet"
    ],
    disposalTip: "Drop off at municipal hazardous waste depot days or pharmacy take-back centers."
  },
  {
    id: "e-waste",
    name: "E-Waste",
    tagline: "Electronic & Electrical Equipment",
    color: "#7b1fa2",
    bgColor: "#f3e5f5",
    borderColor: "#ce93d8",
    description: "E-waste consists of discarded electrical and electronic equipment, circuitry, and accessories. These contain valuable recoverable metals alongside hazardous heavy metals like lead and mercury.",
    shortDescription: "Outdated phones, frayed chargers, cables, circuit boards, and appliances.",
    examples: [
      "Old mobile phones and tablet devices",
      "Charging cables, adapters, and power cords",
      "Wired and wireless earphones/headphones",
      "Computer mice, keyboards, and flash drives",
      "Small appliances (toasters, electric kettles, hair dryers)"
    ],
    guidance: [
      "Keep electronic waste separate from household rubbish and protected from rain.",
      "Do not attempt to dismantle or pierce lithium-ion batteries yourself.",
      "Wipe personal data from digital devices before recycling.",
      "Locate authorized e-waste collection kiosks, producer take-back points, or brand return schemes."
    ],
    dos: [
      "Donate working electronic devices to students or local community centers",
      "Bundle cables together neatly when handing them over to recyclers",
      "Use certified e-waste recyclers who follow safe extraction standards"
    ],
    donts: [
      "Do not break CRT monitors, fluorescent lamps, or LCD screens",
      "Do not sell e-waste to informal scrap burners who use open-air acid baths",
      "Do not throw electronic devices in regular outdoor trash bins"
    ],
    disposalTip: "Deposit in verified electronics collection points, brand trade-in bins, or authorized e-waste drives."
  }
];
