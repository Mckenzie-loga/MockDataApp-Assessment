export type Post = {
  id: string;
  title: string;
  supplier: string;
  amountZar: number;
  thumbnailUrl: string;
  imageUrl: string;
  dueAt?: string; // ISO datetime; if within 24h, show "Remind me"
};

export const ALL_POSTS: Post[] = [
  { id: "1", title: "Cloud Services Retainer", supplier: "Thrive Business Solutions", amountZar: 12500.5, thumbnailUrl: "https://picsum.photos/id/1015/200/120", imageUrl: "https://picsum.photos/id/1015/1200/720", dueAt: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString() },
  { id: "2", title: "Recruitment Fees", supplier: "Connect HR", amountZar: 8900, thumbnailUrl: "https://picsum.photos/id/1025/200/120", imageUrl: "https://picsum.photos/id/1025/1200/720", dueAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString() },
  { id: "3", title: "Engineering Bootcamp", supplier: "Dev Science", amountZar: 15200, thumbnailUrl: "https://picsum.photos/id/1035/200/120", imageUrl: "https://picsum.photos/id/1035/1200/720" },
  { id: "4", title: "Marketing Campaign", supplier: "Brand Corp", amountZar: 7200, thumbnailUrl: "https://picsum.photos/id/1045/200/120", imageUrl: "https://picsum.photos/id/1045/1200/720", dueAt: new Date(Date.now() + 1000 * 60 * 60 * 3).toISOString() },
  { id: "5", title: "Design Consultation", supplier: "Creative Minds", amountZar: 5400, thumbnailUrl: "https://picsum.photos/id/1055/200/120", imageUrl: "https://picsum.photos/id/1055/1200/720" },
  { id: "6", title: "Software License", supplier: "Tech Solutions", amountZar: 13200, thumbnailUrl: "https://picsum.photos/id/1065/200/120", imageUrl: "https://picsum.photos/id/1065/1200/720", dueAt: new Date(Date.now() + 1000 * 60 * 60 * 1).toISOString() },
  { id: "7", title: "Networking Event", supplier: "ProConnect", amountZar: 4800, thumbnailUrl: "https://picsum.photos/id/1075/200/120", imageUrl: "https://picsum.photos/id/1075/1200/720" },
  { id: "8", title: "Cloud Storage Upgrade", supplier: "DataSafe", amountZar: 9900, thumbnailUrl: "https://picsum.photos/id/1085/200/120", imageUrl: "https://picsum.photos/id/1085/1200/720", dueAt: new Date(Date.now() + 1000 * 60 * 60 * 4).toISOString() },
  { id: "9", title: "Team Workshop", supplier: "SkillUp", amountZar: 6700, thumbnailUrl: "https://picsum.photos/id/1016/200/120", imageUrl: "https://picsum.photos/id/1016/1200/720" },
  { id: "10", title: "Hardware Purchase", supplier: "CompTech", amountZar: 15400, thumbnailUrl: "https://picsum.photos/id/1026/200/120", imageUrl: "https://picsum.photos/id/1026/1200/720" },
  { id: "11", title: "Website Redesign", supplier: "WebWorks", amountZar: 8300, thumbnailUrl: "https://picsum.photos/id/1036/200/120", imageUrl: "https://picsum.photos/id/1036/1200/720" },
  { id: "12", title: "SEO Optimization", supplier: "SearchMax", amountZar: 4600, thumbnailUrl: "https://picsum.photos/id/1046/200/120", imageUrl: "https://picsum.photos/id/1046/1200/720" },
  { id: "13", title: "App Development", supplier: "DevHouse", amountZar: 12800, thumbnailUrl: "https://picsum.photos/id/1056/200/120", imageUrl: "https://picsum.photos/id/1056/1200/720", dueAt: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString() },
  { id: "14", title: "Data Analysis", supplier: "Insight Labs", amountZar: 7300, thumbnailUrl: "https://picsum.photos/id/1066/200/120", imageUrl: "https://picsum.photos/id/1066/1200/720" },
  { id: "15", title: "Social Media Management", supplier: "SocialPros", amountZar: 5600, thumbnailUrl: "https://picsum.photos/id/1076/200/120", imageUrl: "https://picsum.photos/id/1076/1200/720" },
  { id: "16", title: "Online Ads Campaign", supplier: "AdMasters", amountZar: 9100, thumbnailUrl: "https://picsum.photos/id/1086/200/120", imageUrl: "https://picsum.photos/id/1086/1200/720" },
  { id: "17", title: "Cybersecurity Audit", supplier: "SecureIT", amountZar: 14200, thumbnailUrl: "https://picsum.photos/id/1017/200/120", imageUrl: "https://picsum.photos/id/1017/1200/720" },
  { id: "18", title: "Cloud Migration", supplier: "CloudWay", amountZar: 11000, thumbnailUrl: "https://picsum.photos/id/1027/200/120", imageUrl: "https://picsum.photos/id/1027/1200/720", dueAt: new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString() },
  { id: "19", title: "Employee Training", supplier: "LearnFast", amountZar: 6200, thumbnailUrl: "https://picsum.photos/id/1037/200/120", imageUrl: "https://picsum.photos/id/1037/1200/720" },
  { id: "20", title: "System Upgrade", supplier: "UpgradeTech", amountZar: 9800, thumbnailUrl: "https://picsum.photos/id/1047/200/120", imageUrl: "https://picsum.photos/id/1047/1200/720" },
  { id: "21", title: "Project Consultation", supplier: "Consultify", amountZar: 8700, thumbnailUrl: "https://picsum.photos/id/1057/200/120", imageUrl: "https://picsum.photos/id/1057/1200/720" },
  { id: "22", title: "Marketing Analysis", supplier: "MarketIQ", amountZar: 7200, thumbnailUrl: "https://picsum.photos/id/1067/200/120", imageUrl: "https://picsum.photos/id/1067/1200/720" },
  { id: "23", title: "Networking Setup", supplier: "NetPro", amountZar: 5400, thumbnailUrl: "https://picsum.photos/id/1077/200/120", imageUrl: "https://picsum.photos/id/1077/1200/720" },
  { id: "24", title: "Database Management", supplier: "DataMasters", amountZar: 13200, thumbnailUrl: "https://picsum.photos/id/1087/200/120", imageUrl: "https://picsum.photos/id/1087/1200/720" },
  { id: "25", title: "Content Writing", supplier: "WriteIt", amountZar: 4300, thumbnailUrl: "https://picsum.photos/id/1018/200/120", imageUrl: "https://picsum.photos/id/1018/1200/720" },
  { id: "26", title: "UI/UX Design", supplier: "DesignHub", amountZar: 9800, thumbnailUrl: "https://picsum.photos/id/1028/200/120", imageUrl: "https://picsum.photos/id/1028/1200/720" },
  { id: "27", title: "Product Launch", supplier: "LaunchPad", amountZar: 11500, thumbnailUrl: "https://picsum.photos/id/1038/200/120", imageUrl: "https://picsum.photos/id/1038/1200/720" },
  { id: "28", title: "Event Planning", supplier: "Eventify", amountZar: 7600, thumbnailUrl: "https://picsum.photos/id/1048/200/120", imageUrl: "https://picsum.photos/id/1048/1200/720" },
  { id: "29", title: "Server Maintenance", supplier: "ServerCare", amountZar: 12200, thumbnailUrl: "https://picsum.photos/id/1058/200/120", imageUrl: "https://picsum.photos/id/1058/1200/720" },
  { id: "30", title: "Software Testing", supplier: "TestLab", amountZar: 8900, thumbnailUrl: "https://picsum.photos/id/1068/200/120", imageUrl: "https://picsum.photos/id/1068/1200/720" },
  { id: "31", title: "Digital Marketing", supplier: "DigiPro", amountZar: 9400, thumbnailUrl: "https://picsum.photos/id/1078/200/120", imageUrl: "https://picsum.photos/id/1078/1200/720" },
  { id: "32", title: "Analytics Dashboard", supplier: "InsightTech", amountZar: 10800, thumbnailUrl: "https://picsum.photos/id/1088/200/120", imageUrl: "https://picsum.photos/id/1088/1200/720" },
];
