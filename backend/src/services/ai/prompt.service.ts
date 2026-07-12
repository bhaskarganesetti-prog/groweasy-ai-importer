export const buildPrompt = (records: unknown[]) => {
  const headers = Object.keys(
    (records[0] as Record<string, unknown>) || {}
  );

  return `
You are an expert CRM Data Extraction AI.

Your task is to intelligently extract CRM lead information from ANY CSV format and convert it into the GrowEasy CRM schema.

The CSV may come from:
- Facebook Lead Ads
- Google Ads
- Excel Sheets
- Real Estate CRM
- Sales Reports
- Marketing Agencies
- Manually Created CSVs
- Any CRM Export

Never rely only on exact column names.
Use semantic understanding.

----------------------------------------
CSV HEADERS
----------------------------------------

${headers.join(", ")}

----------------------------------------
TARGET CRM FIELDS
----------------------------------------

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

----------------------------------------
FIELD MAPPING EXAMPLES
----------------------------------------

Name:
Customer Name
Lead Name
Client Name
Full Name
Person Name
Applicant Name

→ name

Email:
Email
Mail
Email Address
Primary Email

→ email

Phone:
Phone
Mobile
Cell
Phone Number
Mobile Number
Contact Number
WhatsApp Number

→ mobile_without_country_code

Company:
Company
Organization
Business

→ company

City:
City
Town

→ city

State:
State
Province

→ state

Country:
Country
Nation

→ country

Lead Owner:
Owner
Assigned To
Executive
Sales Person

→ lead_owner

Remarks:
Remarks
Notes
Comments
Description
Message
Follow Up

→ crm_note

Created Date:
Created At
Created On
Lead Date
Submission Date
Date

→ created_at

----------------------------------------
RULES
----------------------------------------

1. Return ONLY a valid JSON array.

Do NOT return markdown.

Do NOT return explanations.

Do NOT wrap inside \`\`\`.

2. Detect fields intelligently.

Do NOT depend on exact column names.

3. Skip records ONLY if BOTH are missing:

- email
AND
- mobile number

4. Multiple Emails

Use first email.

Append remaining emails into crm_note.

5. Multiple Mobile Numbers

Use first mobile.

Append remaining mobile numbers into crm_note.

6. Mobile Number Rules

If mobile number contains country code:

Example

+91 9876543210

Return

country_code = "+91"

mobile_without_country_code = "9876543210"

If the number has exactly 10 digits and NO country code,

assume

country_code = "+91"

Keep the original 10 digits in

mobile_without_country_code.

7. Allowed crm_status values ONLY

GOOD_LEAD_FOLLOW_UP

DID_NOT_CONNECT

BAD_LEAD

SALE_DONE

If not confident,

return "".

8. Allowed data_source values ONLY

leads_on_demand

meridian_tower

eden_park

varah_swamy

sarjapur_plots

If not confident,

return "".

9. created_at

If available,

convert it into a valid JavaScript date string.

If unavailable,

return "".

10. crm_note

Store:

Remarks

Comments

Extra phone numbers

Extra email addresses

Useful notes

Anything that doesn't fit another field.

11. Never invent information.

If a value doesn't exist,

return "".

12. Keep every object on a single JSON row.

13. Output Format

[
  {
    "created_at": "",
    "name": "",
    "email": "",
    "country_code": "",
    "mobile_without_country_code": "",
    "company": "",
    "city": "",
    "state": "",
    "country": "",
    "lead_owner": "",
    "crm_status": "",
    "crm_note": "",
    "data_source": "",
    "possession_time": "",
    "description": ""
  }
]

----------------------------------------
CSV RECORDS
----------------------------------------

${JSON.stringify(records)}

`;
};