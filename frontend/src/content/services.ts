/**
 * Procedures content. Written for patients who are considering the
 * operation, not for clinicians. The tone is factual and directs people
 * to an in-person consultation for their specific case — phrases like
 * "typically" and "in most patients" are intentional: every case differs.
 *
 * Volumes are approximate career totals at Shifa International Hospital
 * (values from the original site at commit 0fb3280).
 */

export type Category = 'General' | 'Bariatric' | 'Colorectal' | 'Upper GI';

export interface DetailSection {
  heading: string;
  body: string;
}

export interface ProcedureDetails {
  /**
   * Longer prose shown when the user opens the "Learn more" panel. Each
   * entry is a short, scannable subsection.
   */
  sections: DetailSection[];
}

export interface ServiceEntry {
  slug: string;
  title: string;
  /** Short factual label shown below the title on listing cards. */
  subtitle: string;
  /** 1-2 sentence plain-language summary. Always visible. */
  summary: string;
  volume: number;
  category: Category;
  details: ProcedureDetails;
}

export const services: ServiceEntry[] = [
  {
    slug: 'laparoscopic-cholecystectomy',
    title: 'Laparoscopic Cholecystectomy',
    subtitle: 'Gall bladder removal, minimally invasive',
    summary:
      'Keyhole removal of the gall bladder for patients with symptomatic gallstones or cholecystitis. Same-day discharge is the norm.',
    volume: 9000,
    category: 'General',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'Most commonly for recurrent right-upper-abdominal pain caused by gallstones, for inflammation of the gall bladder (cholecystitis), for gallstone-related pancreatitis once the acute episode has settled, and occasionally for gall-bladder polyps that meet surgical criteria. Removing the gall bladder resolves symptoms and prevents future attacks.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Four small keyhole incisions are made in the upper abdomen, each 5–10 mm. Carbon dioxide gas gently inflates the abdomen to create working space. A laparoscope (a thin camera) shows the view on a monitor while fine instruments carefully free the gall bladder from the liver bed and from the cystic duct and artery, which are clipped and divided. The gall bladder is removed through the navel incision. Typical operating time is 45–90 minutes under general anaesthetic.',
        },
        {
          heading: 'Recovery',
          body: 'Most patients are discharged the same day. Mild soreness at the incision sites for 5–7 days is normal and controlled with simple analgesia. Office work is usually possible within a week; driving, exercise and heavy lifting in 2–3 weeks. A follow-up visit is scheduled at 2 weeks to check wounds and review any histology.',
        },
        {
          heading: 'Living without a gall bladder',
          body: 'Life without a gall bladder is entirely normal. Bile continues to flow from the liver into the intestine, just more continuously rather than being stored and released after meals. A minority of patients have slightly looser stools for the first few weeks; this typically settles on its own.',
        },
        {
          heading: 'When to call the clinic',
          body: 'Fever above 38 °C, expanding abdominal pain, persistent vomiting, or any yellowing of the skin or eyes in the first two weeks should prompt a call. Wound redness, discharge or increasing pain at an incision site is also worth flagging early.',
        },
      ],
    },
  },
  {
    slug: 'appendix-surgery',
    title: 'Appendix Surgery',
    subtitle: 'Laparoscopic appendicectomy',
    summary:
      'Emergency keyhole removal of the appendix for appendicitis. Early surgery before rupture has the smoothest recovery.',
    volume: 8000,
    category: 'General',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'Acute appendicitis — sudden inflammation of the appendix, usually presenting as pain that begins around the navel and moves to the right lower abdomen, often with nausea, fever and loss of appetite. Left untreated, the appendix can rupture, which is a more serious problem requiring longer hospitalisation and antibiotics.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Three small keyhole incisions are made in the abdomen. The appendix is identified, its blood supply is clipped, and it is detached from the cecum and removed through one of the port sites. Any free fluid in the abdomen is washed out. Total operating time is 30–60 minutes.',
        },
        {
          heading: 'Recovery',
          body: 'For uncomplicated (unruptured) appendicitis, discharge is typically the same day or the next morning. Return to office work in a week; full activity in 2–3 weeks. Ruptured or complicated appendicitis requires a longer hospital stay (3–5 days) and a course of intravenous antibiotics.',
        },
        {
          heading: 'Is the appendix useful?',
          body: 'The appendix has no essential function in adults — life without it is entirely normal. Early surgery before rupture is always preferable to observing and waiting.',
        },
        {
          heading: 'When to call the clinic',
          body: 'Fever, expanding abdominal pain, wound redness or discharge in the first two weeks after surgery.',
        },
      ],
    },
  },
  {
    slug: 'laparoscopic-surgery',
    title: 'Laparoscopic Surgery',
    subtitle: 'Advanced minimally invasive techniques',
    summary:
      'An umbrella term for minimally invasive abdominal operations — hernia repair, adhesiolysis, diagnostic laparoscopy, small-bowel resection and more.',
    volume: 1500,
    category: 'General',
    details: {
      sections: [
        {
          heading: 'What falls under laparoscopic surgery',
          body: 'Almost any abdominal operation that used to require a long incision can now be performed through three to five keyhole incisions. Common examples beyond gall bladder and appendix include: hernia repair (inguinal, umbilical, hiatal), division of adhesions after prior surgery, small bowel resection, diagnostic laparoscopy for unexplained pain or infertility, and staging for abdominal cancers.',
        },
        {
          heading: 'Why laparoscopic rather than open',
          body: 'Advantages are consistent and well-documented: smaller incisions mean less post-operative pain, shorter hospital stays, faster return to normal activity, lower wound infection rates, and smaller scars. Most patients who are candidates for a laparoscopic approach prefer it.',
        },
        {
          heading: 'Who may need open surgery instead',
          body: 'Patients with extensive prior abdominal surgery, severe adhesions, very large tumours, or some emergencies may be safer with an open approach. Occasionally a laparoscopic operation is converted to open mid-procedure if anatomy is unclear — this is a sensible safety decision, not a failure. Dr. Siddiq will advise on the most appropriate approach during consultation.',
        },
        {
          heading: 'Recovery, in general',
          body: 'Varies with the specific operation. Most uncomplicated laparoscopic procedures involve a 1–2 day hospital stay and full recovery in 2–4 weeks. More complex operations (resections, revision surgery) take longer.',
        },
      ],
    },
  },
  {
    slug: 'colon-surgery',
    title: 'Colon Surgery',
    subtitle: 'Complex colorectal procedures',
    summary:
      'Surgery on the colon for cancer, diverticular disease, inflammatory bowel disease or large polyps that can’t be removed endoscopically.',
    volume: 65,
    category: 'Colorectal',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'Most often for colon cancer, but also for complications of diverticular disease (perforation, stricture, fistula), selected cases of inflammatory bowel disease, and large polyps that can’t safely be removed by colonoscopy. The specific operation depends on which segment of the colon is affected.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopic where feasible. The affected segment of colon is mobilised; the feeding blood vessels are divided at their origin along with the surrounding lymph nodes; the segment is removed; and the two healthy ends of bowel are rejoined (anastomosis). Operating time is typically 2–3 hours.',
        },
        {
          heading: 'Recovery',
          body: 'Hospital stay is typically 4–6 days. Early mobilisation is encouraged from the day after surgery — walking reduces the risk of blood clots and speeds bowel function recovery. Diet advances gradually from sips of water to a regular diet over 3–5 days as bowel function returns.',
        },
        {
          heading: 'What to expect afterwards',
          body: 'For cancer cases, the removed specimen goes to pathology for full staging; results are discussed in a follow-up visit about a week after surgery, and further treatment (such as chemotherapy) is arranged if indicated. Bowel habits may be slightly different for a few months but most patients return to a normal pattern.',
        },
      ],
    },
  },
  {
    slug: 'anterior-resection',
    title: 'Anterior Resection',
    subtitle: 'Precise rectal surgical approach',
    summary:
      'Removal of the upper or middle rectum for cancer, reconnecting healthy colon to the remaining rectum to preserve continence.',
    volume: 88,
    category: 'Colorectal',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'The main indication is rectal cancer in the upper or middle rectum. The goal is complete removal of the tumour with an adequate margin of healthy tissue and its surrounding lymph node–bearing fatty sheath (the mesorectum), while preserving bowel continuity and continence.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopic where feasible. The rectum and its mesorectum are carefully mobilised using a technique called total mesorectal excision (TME), which is the standard of care for rectal cancer. The diseased segment is removed and the healthy colon is joined to the remaining rectum using a surgical stapler.',
        },
        {
          heading: 'Temporary ileostomy',
          body: 'Many patients have a temporary loop ileostomy (a small-bowel stoma on the abdomen) to protect the new join while it heals — this is usually reversed in a second, smaller operation 8–12 weeks later. Whether a stoma is needed is discussed in detail before surgery.',
        },
        {
          heading: 'Recovery',
          body: 'Hospital stay is typically 5–7 days. Bowel function after anterior resection can change — stools may be more frequent or loose for several months before settling. Pelvic floor exercises and dietary adjustments help. A stoma-care nurse supports patients with temporary ileostomies.',
        },
      ],
    },
  },
  {
    slug: 'low-anterior-resection',
    title: 'Low Anterior Resection',
    subtitle: 'Specialised colorectal technique',
    summary:
      'A technically demanding operation for cancers of the lower rectum, preserving the anal sphincter where possible.',
    volume: 79,
    category: 'Colorectal',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'For cancers in the lower third of the rectum, where a very careful approach is needed to remove the tumour while preserving the anal sphincter and continence. Pre-operative chemoradiation is sometimes given to shrink the tumour first and improve the chances of sphincter preservation.',
        },
        {
          heading: 'How the operation is performed',
          body: 'The same TME principles as a standard anterior resection, with extra care taken in the lower pelvis. The colon is joined very low to the anal canal using a circular stapler (colo-anal anastomosis). The operation is technically demanding and benefits from a high-volume surgeon.',
        },
        {
          heading: 'Temporary stoma',
          body: 'Almost always performed with a temporary protective ileostomy, reversed once healing is confirmed (typically 8–12 weeks later).',
        },
        {
          heading: 'Recovery and function',
          body: 'Hospital stay 6–8 days. Bowel function after low anterior resection changes — many patients experience “low anterior resection syndrome” (frequent, urgent or clustered bowel movements) in the first 6–12 months, which usually improves substantially with time, diet and pelvic floor therapy.',
        },
      ],
    },
  },
  {
    slug: 'right-hemicolectomy',
    title: 'Right Hemicolectomy',
    subtitle: 'Right-side colon resection',
    summary:
      'Removal of the right half of the colon (cecum, ascending colon and part of the transverse colon), most often for cancer.',
    volume: 63,
    category: 'Colorectal',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'The most common indication is cancer of the right colon or cecum. Large right-sided polyps that can’t be removed endoscopically, chronic right-sided inflammatory disease, and some complicated appendix pathology are other reasons.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopically where possible. The right colon is mobilised, the right-sided blood vessels (ileocolic and right colic) are divided at their origin along with the lymph nodes, and the specimen is removed. The remaining ileum (end of small bowel) is joined to the remaining transverse colon. Operating time is typically 2–3 hours.',
        },
        {
          heading: 'Recovery',
          body: 'Hospital stay is usually 4–6 days. Return to normal diet within about a week; full recovery over 4–6 weeks.',
        },
        {
          heading: 'Bowel habits afterwards',
          body: 'Stools may be slightly looser for a few weeks after right-sided surgery because the right colon normally absorbs water. Most patients return to their pre-surgery pattern within 2–3 months; a high-fibre diet helps.',
        },
      ],
    },
  },
  {
    slug: 'left-hemicolectomy',
    title: 'Hemicolectomy',
    subtitle: 'Left-side colon resection',
    summary:
      'Removal of the left half of the colon (descending and sigmoid colon), most often for cancer or complicated diverticular disease.',
    volume: 71,
    category: 'Colorectal',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'Cancer of the left colon or sigmoid; complicated diverticular disease (perforation, fistula, stricture); recurrent diverticulitis causing major symptoms; and some large polyps or benign strictures.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopic where feasible. The left colon is mobilised, the inferior mesenteric vessels are divided with the lymph nodes, and the segment is removed. The remaining transverse colon is joined to the upper rectum. Operating time is typically 2–3 hours.',
        },
        {
          heading: 'Recovery',
          body: 'Hospital stay 4–6 days. Normal diet in about a week, full recovery 4–6 weeks.',
        },
        {
          heading: 'Bowel habits afterwards',
          body: 'Stools may be slightly firmer initially. Most patients return to their pre-surgery pattern within 2–3 months.',
        },
      ],
    },
  },
  {
    slug: 'partial-gastrectomy',
    title: 'Partial Gastrectomy',
    subtitle: 'Stomach partial removal',
    summary:
      'Removal of part of the stomach — usually for early gastric cancer or a refractory ulcer or stricture — preserving as much gastric function as possible.',
    volume: 59,
    category: 'Upper GI',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'Most commonly for gastric cancer (particularly cancers of the lower stomach), but also for chronic ulcers that have not healed with medical therapy, some benign tumours and selected strictures. The extent of the operation depends on where the disease sits.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopic or open, depending on tumour size, location and patient factors. The diseased portion of the stomach (usually the lower two-thirds) is removed along with the surrounding fat and lymph nodes. The remaining stomach is reconnected either directly to the duodenum (Billroth I) or to a loop of small bowel (Billroth II or Roux-en-Y), depending on the situation.',
        },
        {
          heading: 'Recovery',
          body: 'Hospital stay is typically 6–8 days. Diet begins with sips of water and advances gradually — small, frequent meals for the first several months. A dietitian meets every patient before discharge.',
        },
        {
          heading: 'Long-term nutrition',
          body: 'Vitamin B12, iron and occasionally vitamin D supplementation may be needed long-term after gastric resection. Annual blood tests track levels. Most patients adapt well and return to a good quality of life.',
        },
      ],
    },
  },
  {
    slug: 'esophagectomy',
    title: 'Esophagectomy',
    subtitle: 'Esophagus surgical removal',
    summary:
      'Removal of all or most of the oesophagus, usually for cancer. One of the most complex abdominal operations; high-volume surgeons and centres matter.',
    volume: 82,
    category: 'Upper GI',
    details: {
      sections: [
        {
          heading: 'When it is recommended',
          body: 'The main indication is oesophageal cancer, sometimes preceded by chemoradiation to shrink the tumour. Other indications are severe Barrett’s oesophagus with high-grade dysplasia that cannot be controlled endoscopically, and advanced end-stage motility disorders.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Most commonly a combined laparoscopic and thoracoscopic approach (minimally invasive Ivor-Lewis or McKeown oesophagectomy), though open surgery is chosen in selected cases. The diseased oesophagus is removed along with nearby lymph nodes; the stomach is reshaped into a tube and pulled up into the chest (or neck) to replace the oesophagus.',
        },
        {
          heading: 'Recovery',
          body: 'Hospital stay is typically 10–14 days, with the first 48–72 hours in a high-dependency or intensive-care setting. Liquids for the first week via a feeding tube in some cases; gradual advance to soft then regular diet over 4–6 weeks. Full recovery takes 3–6 months.',
        },
        {
          heading: 'Long-term adjustments',
          body: 'Because the new food-pipe is less muscular than the oesophagus it replaces, patients eat small, frequent meals, chew thoroughly, avoid drinking large volumes with meals, and sit up or walk for 30–60 minutes after eating rather than lying flat. Anti-reflux precautions — elevated head of bed, avoiding late-night eating — are lifelong. Most patients return to a good quality of life.',
        },
      ],
    },
  },
];

// ---------------------------------------------------------------------------
// Bariatric sub-procedures (shown on /bariatric).
// ---------------------------------------------------------------------------

export interface BariatricProcedure {
  number: string;
  title: string;
  summary: string;
  body: string;
  details: ProcedureDetails;
}

export const bariatricProcedures: BariatricProcedure[] = [
  {
    number: '01',
    title: 'Roux-en-Y gastric bypass',
    summary:
      'A small stomach pouch is created and connected directly to the lower small intestine. The oldest, most studied bariatric operation — particularly effective for severe obesity with type 2 diabetes or severe reflux.',
    body: 'A smaller stomach pouch is connected directly to the lower small intestine. The operation most often chosen when durable metabolic effect is the priority.',
    details: {
      sections: [
        {
          heading: 'Who it is for',
          body: 'Typically considered for patients with a BMI of 40 or above, or 35 or above with significant obesity-related comorbidities (type 2 diabetes, sleep apnoea, severe reflux, hypertension, non-alcoholic fatty liver disease). Particularly well suited to patients whose primary goal is metabolic (diabetes control) or whose reflux is severe.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopically, through five small keyhole incisions. A small pouch (about the size of a hen’s egg, roughly 30 mL) is created from the upper stomach and separated from the rest. A segment of small intestine (the “Roux limb”) is brought up and joined to this pouch. A second connection restores normal digestion downstream. The bypass both restricts intake and alters gut hormones that signal hunger and satiety.',
        },
        {
          heading: 'Typical weight loss and outcomes',
          body: 'Most patients lose 60–80 % of their excess body weight over 12–18 months. Type 2 diabetes goes into remission or improves substantially in the majority of patients (often within weeks, before major weight loss has occurred). Sleep apnoea, hypertension, high cholesterol and fatty liver also commonly improve.',
        },
        {
          heading: 'Recovery',
          body: '2–3 day hospital stay. A staged diet over the first month: clear liquids for the first few days, full liquids for 1–2 weeks, puréed foods for weeks 2–4, soft then regular foods thereafter — always in small, protein-first portions.',
        },
        {
          heading: 'Long-term commitments',
          body: 'Lifelong daily vitamins (multivitamin, calcium + vitamin D, iron, vitamin B12) and twice-yearly follow-up for the first two years, then annually. Some patients experience “dumping syndrome” (flushing, nausea, lightheadedness after very sugary or fatty meals) which usually improves with dietary adjustment.',
        },
        {
          heading: 'Things to consider',
          body: 'A more complex operation than sleeve gastrectomy. Reversible in principle, but rarely reversed. Not recommended for patients with certain chronic nutritional deficiencies or specific intestinal diseases — these are reviewed in consultation.',
        },
      ],
    },
  },
  {
    number: '02',
    title: 'Sleeve gastrectomy',
    summary:
      'Roughly three-quarters of the stomach is removed laparoscopically, leaving a narrow banana-shaped sleeve. A simpler operation than bypass, often chosen as a first bariatric procedure.',
    body: 'Laparoscopic removal of roughly 75 percent of the stomach to leave a narrow sleeve. A one-hour operation; most patients are home the same day and back to everyday movement in four to six weeks.',
    details: {
      sections: [
        {
          heading: 'Who it is for',
          body: 'Same BMI-based indications as gastric bypass. Often preferred as a first operation for patients who are otherwise well, want a simpler procedure without intestinal rerouting, or have specific reasons to avoid bypass. Less suited to patients with pre-existing severe reflux.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopically, through five small keyhole incisions. A long stapler is used to remove approximately 75–80 % of the stomach along the greater curvature, leaving a thin vertical tube. The removed portion is permanently gone. Operating time is typically about 60 minutes.',
        },
        {
          heading: 'Typical weight loss and outcomes',
          body: 'Most patients lose 50–70 % of their excess body weight over 12–18 months. Significant improvements in type 2 diabetes, sleep apnoea and hypertension are common, though on average the metabolic effect is slightly less pronounced than gastric bypass.',
        },
        {
          heading: 'Recovery',
          body: '1–2 day hospital stay. The same staged diet progression as gastric bypass: clear liquids → full liquids → puréed → soft → regular, over the first month, with small protein-first portions.',
        },
        {
          heading: 'Long-term commitments',
          body: 'Daily multivitamin, vitamin B12, iron and calcium + D supplementation. Twice-yearly follow-up for the first two years, then annually.',
        },
        {
          heading: 'Things to consider',
          body: 'Reflux can develop or worsen in a minority of patients after sleeve; if severe and unresponsive to medication, conversion to gastric bypass is sometimes offered later. Not reversible — the removed portion of the stomach is permanently gone.',
        },
      ],
    },
  },
  {
    number: '03',
    title: 'Mini gastric bypass (OAGB)',
    summary:
      'A long narrow stomach pouch is connected to a loop of small intestine via a single join. Simpler and faster than Roux-en-Y, with comparable weight-loss and metabolic outcomes.',
    body: 'A single-anastomosis gastric bypass — faster and simpler to perform than Roux-en-Y, with comparable metabolic outcomes in the right candidate.',
    details: {
      sections: [
        {
          heading: 'Who it is for',
          body: 'Similar indications to standard Roux-en-Y gastric bypass. The single-anastomosis design appeals to patients who want the metabolic benefits of a bypass with a technically simpler operation and shorter operating time.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopically. A long, narrow stomach pouch is created (similar shape to a sleeve but closed off at the bottom). A loop of small intestine is brought up and joined to the pouch in a single connection, bypassing roughly 150–200 cm of intestine.',
        },
        {
          heading: 'Typical weight loss and outcomes',
          body: 'Weight loss and metabolic outcomes are broadly comparable to Roux-en-Y gastric bypass in well-selected patients. Operative time and technical complexity are lower.',
        },
        {
          heading: 'Recovery',
          body: 'Similar to Roux-en-Y: 2–3 day hospital stay; the same staged diet progression over the first month.',
        },
        {
          heading: 'Bile reflux — a specific consideration',
          body: 'Because of the single-loop design, some patients experience bile-reflux symptoms (burning behind the breastbone, bitter taste, heartburn). This is a specific point of discussion in consultation — OAGB may not be the right choice for patients with pre-existing severe reflux.',
        },
        {
          heading: 'Long-term commitments',
          body: 'Same supplementation and follow-up schedule as Roux-en-Y: daily multivitamin, B12, iron, calcium + D.',
        },
      ],
    },
  },
  {
    number: '04',
    title: 'Revision bariatric surgery',
    summary:
      'A second bariatric operation to address inadequate weight loss, weight regain, reflux after sleeve, or a mechanical complication from an earlier procedure. One of Dr. Siddiq’s long-standing specialities.',
    body: 'Corrective operations for patients whose earlier bariatric procedure needs adjustment — one of Dr. Siddiq’s longest-running specialities.',
    details: {
      sections: [
        {
          heading: 'Who it is for',
          body: 'Patients who have had a previous bariatric operation and are facing one of: (a) inadequate weight loss, (b) significant weight regain, (c) severe reflux after sleeve gastrectomy, (d) a mechanical complication (stricture, leak, band erosion), or (e) a change in clinical priorities over time.',
        },
        {
          heading: 'Which revision procedure',
          body: 'The choice depends on the original operation and the new goal. Common examples: sleeve → Roux-en-Y bypass for severe reflux or additional weight loss; band removal → sleeve or bypass; Roux-en-Y → distal-limb revision for weight regain. Every revision plan is individual.',
        },
        {
          heading: 'How the operation is performed',
          body: 'Laparoscopic whenever it can safely be done. Revision surgery is technically more demanding than first-time operations because of scar tissue from the previous surgery, which is why experience matters. Operating times are generally longer.',
        },
        {
          heading: 'Recovery',
          body: 'Typically a 3–4 day hospital stay, with the same staged diet progression as primary bariatric operations. Expect recovery to be slightly slower than after a first operation.',
        },
        {
          heading: 'Outcomes',
          body: 'Reflux resolution rates are very high when converting sleeve to Roux-en-Y for that indication. Further weight loss of 10–25 % of excess weight, on average, after revision for weight regain. Outcomes always depend on the specific revision and on the patient’s long-term follow-through with diet and lifestyle.',
        },
      ],
    },
  },
];

export const bariatricIntro = {
  title: 'Bariatric Surgery',
  subtitle: 'A novel solution for obesity',
  body: [
    'Laparoscopic Bariatric surgery, a transformative weight-loss procedure, has found a pioneering champion in Dr. Ghulam Siddiq at Shifa International Hospital, Islamabad. Since 2010, he has performed over 1,400 successful laparoscopic cases, establishing himself as Pakistan’s leading authority in minimally invasive bariatric procedures.',
    'He routinely performs laparoscopic Roux-en-Y gastric bypasses, Sleeve Gastrectomies, Mini gastric bypasses (OAGB) and revision bariatric procedures.',
  ],
} as const;
