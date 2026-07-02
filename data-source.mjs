import { fileURLToPath } from "node:url";
import path from "node:path";

/* ---------------------------------------------------------------------------
   Location of the master workbook (single source of truth).

   DEFAULT: the file sits one level above this project (../ai_automation_master.xlsx).

   To read/write a SharePoint-synced copy instead:
   1. In SharePoint/OneDrive, use "Sync" or "Add shortcut to OneDrive" so the
      product library's ai_automation_master.xlsx mirrors to your machine.
   2. Set OVERRIDE below to that file's ABSOLUTE local path, using forward
      slashes, e.g.:
        const OVERRIDE = "C:/Users/tbrabant/LendingTree/Product - Documents/AI/ai_automation_master.xlsx";

   Both `npm run gen:data` and the dev "Share how you AI" endpoint use this path.
   --------------------------------------------------------------------------- */
const OVERRIDE = "";

const here = path.dirname(fileURLToPath(import.meta.url)); // = the lt-app folder
export const MASTER_XLSX = OVERRIDE || path.resolve(here, "../ai_automation_master.xlsx");
