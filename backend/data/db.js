// server/data/db.js

// ===============================
// PRODUCT PAGES
// ===============================
const productPages = [
  {
    title: "BASKETBALL EQUIPMENT",
    slug: "basketball-equipment",
    image: "/images/cats/basketball.jpg",
    shortDescription:
      "Professional-grade basketball systems and hoops for indoor and outdoor use.",
    isFeatured: true,
    groups: [
      {
        groupTitle: "Hydraulic Systems",
        items: [
          {
            title: "FIBA LEVEL 1 HYDRAULIC BASKETBALL SYSTEM",
            model: "HS BB 01",
            description:
              "Professional hydraulic portable basketball stand with 3.25m projection.",
            image: "/images/products/bb01.jpg",
          },
        ],
      },
      {
        groupTitle: "Wall Mounted Systems",
        items: [
          {
            title: "SIDE FOLD WALL MOUNTED SYSTEM",
            model: "HS BB WALL 01",
            description:
              "Space-saving side fold basketball system for multi-purpose halls.",
            image: "/images/products/bb-wall.jpg",
          },
        ],
      },
      {
        groupTitle: "Outdoor Systems",
        items: [
          {
            title: "OUTDOOR MOVABLE BASKETBALL POST",
            model: "HS 1500",
            description:
              "Heavy duty structure with weather-resistant coating.",
            image: "/images/product-basketball-1.jpg",
          },
          {
            title: "FIXED BASKETBALL POLE",
            model: "HS 1502",
            description:
              "Standard fixed pole system for parks and schools.",
            image: "/images/product-basketball-3.jpg",
          },
        ],
      },
    ],
  },

  {
    title: "SPORTS EQUIPMENTS",
    slug: "sports-equipments",
    image: "/images/cats/sports-eq.jpg",
    shortDescription:
      "Badminton, volleyball, and multi-sport equipment for all levels.",
    isFeatured: true,
    groups: [
      {
        groupTitle: "Badminton Posts",
        items: [
          {
            title: "PROFESSIONAL MOVABLE BADMINTON POSTS",
            model: "HS BADM 01",
            description:
              "Movable badminton posts with heavy base weights.",
            image: "/images/products/badm01.jpg",
          },
          {
            title: "SLEEVE TYPE BADMINTON POSTS",
            model: "HS BADM 02",
            description:
              "Standard sleeve type posts for indoor and outdoor courts.",
            image: "/images/products/badm02.jpg",
          },
        ],
      },
      {
        groupTitle: "Volleyball Posts",
        items: [
          {
            title: "TELESCOPIC VOLLEYBALL POSTS",
            model: "HS VOLLEY 01",
            description:
              "Adjustable height aluminum posts with internal winch.",
            image: "/images/products/vol01.jpg",
          },
          {
            title: "FIXED VOLLEYBALL POSTS",
            model: "HS VOLLEY 02",
            description:
              "Heavy duty steel posts for outdoor usage.",
            image: "/images/products/vol02.jpg",
          },
        ],
      },
    ],
  },
];

// ===============================
// SERVICE PAGES
// ===============================
const servicePages = [
  {
    title: "LIGHTING & SEATING SOLUTIONS",
    slug: "lighting-seating-solutions",
    image: "/images/serv-lighting.jpg",
    shortDescription:
      "Stadium floodlights, arena lighting, and premium spectator seating solutions.",
    isFeatured: true,
    groups: [
      {
        groupTitle: "Stadium Lighting",
        items: [
          {
            title: "LED STADIUM FLOOD LIGHTS",
            model: "HS LIGHT 01",
            description:
              "High-lumen LED floodlights designed for large stadiums.",
            image: "/images/services/lighting.jpg",
          },
          {
            title: "INDOOR ARENA LIGHTING",
            model: "HS LIGHT 02",
            description:
              "Anti-glare LED lighting systems for indoor sports arenas.",
            image: "/images/services/indoor-light.jpg",
          },
        ],
      },
      {
        groupTitle: "Stadium Seating",
        items: [
          {
            title: "VIP BUCKET SEATS",
            model: "HS SEAT 01",
            description:
              "Ergonomic bucket seats for VIP galleries and dugouts.",
            image: "/images/services/seat-vip.jpg",
          },
          {
            title: "TELESCOPIC BLEACHERS",
            model: "HS SEAT 02",
            description:
              "Retractable seating systems for multi-purpose halls.",
            image: "/images/services/bleachers.jpg",
          },
        ],
      },
    ],
  },

  {
    title: "MAINTENANCE WORKS",
    slug: "maintenance-works",
    image: "/images/serv-maint.jpg",
    shortDescription:
      "Annual maintenance, repair, and refurbishment services for sports facilities.",
    isFeatured: true,
    groups: [
      {
        groupTitle: "Court Maintenance",
        items: [
          {
            title: "WOODEN FLOORING REFURBISHMENT",
            model: "SERV-WOOD",
            description:
              "Complete sanding, polishing, and recoating of wooden courts.",
            image: "/images/services/wood-polish.jpg",
          },
          {
            title: "SYNTHETIC TURF MAINTENANCE",
            model: "SERV-TURF",
            description:
              "Deep cleaning, decompaction, and infill refilling.",
            image: "/images/services/turf-clean.jpg",
          },
        ],
      },
      {
        groupTitle: "Equipment Repairs",
        items: [
          {
            title: "BASKETBALL SYSTEM SERVICE",
            model: "SERV-BB",
            description:
              "Hydraulic oil replacement and structural safety inspection.",
            image: "/images/services/bb-repair.jpg",
          },
        ],
      },
    ],
  },
];

// ===============================
// PROJECTS
// ===============================
const projects = [
  {
    title: "Hercules Project – FIBA Women's Asia Cup",
    image: "/images/projects/fiba-women.jpg",
  },
  {
    title: "Hercules Indoor Basketball Court – Lakshyan Academy",
    image: "/images/projects/indoor-court-1.jpg",
  },
  {
    title: "Hercules Basketball Court – International Championship",
    image: "/images/projects/fiba-champ.jpg",
  },
  {
    title: "Hercules Shuttle Badminton Court – Sports Center",
    image: "/images/projects/badminton-green.jpg",
  },
];

// ===============================
// EXPORT
// ===============================
module.exports = {
  productPages,
  servicePages,
  projects,
};
