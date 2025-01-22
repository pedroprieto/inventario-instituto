import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";

import {
  BackupPlan,
  BackupPlanRule,
  BackupResource,
  BackupVault,
} from "aws-cdk-lib/aws-backup";
import { Schedule } from "aws-cdk-lib/aws-events";
import { Duration } from "aws-cdk-lib/core";

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
  data,
});

const { amplifyDynamoDbTables } = backend.data.resources.cfnResources;
for (const table of Object.values(amplifyDynamoDbTables)) {
  table.deletionProtectionEnabled = true;
  table.pointInTimeRecoveryEnabled = true;
}

const backupStack = backend.createStack("backup-inventario-instituto");
const myTables = Object.values(backend.data.resources.tables);

const vault = new BackupVault(backupStack, "BackupVaultInventarioInstituto", {
  backupVaultName: "backup-vault-inventario-instituto",
});

const plan = new BackupPlan(backupStack, "BackupPlanInventarioInstituto", {
  backupPlanName: "backup-plan-inventario-instituto",
  backupVault: vault,
});

plan.addRule(
  new BackupPlanRule({
    deleteAfter: Duration.days(90),
    ruleName: "backup-plan-rule-inventario-instituto",
    scheduleExpression: Schedule.cron({
      minute: "0",
      hour: "0",
      day: "*",
      month: "*",
      year: "*",
    }),
  })
);

plan.addSelection("BackupPlanSelectionInventarioInstituto", {
  resources: myTables.map((table) => BackupResource.fromDynamoDbTable(table)),
  allowRestores: true,
});
