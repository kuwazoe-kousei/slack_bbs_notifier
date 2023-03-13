import { TriggerTypes } from "https://deno.land/x/deno_slack_api@1.7.0/typed-method-types/workflows/triggers/mod.ts";
import { ScheduledTrigger } from "https://deno.land/x/deno_slack_api@1.7.0/typed-method-types/workflows/triggers/scheduled.ts";
import SampleWorkflow from "../workflows/sample_workflow.ts";
/**
 * Triggers determine when workflows are executed. A trigger
 * file describes a scenario in which a workflow should be run,
 * such as a user pressing a button or when a specific event occurs.
 * https://api.slack.com/future/triggers
 */
const schedule: ScheduledTrigger<typeof SampleWorkflow.definition> = {
  name: "schedule",
  type: TriggerTypes.Scheduled,
  workflow: `#/workflows/${SampleWorkflow.definition.callback_id}`,
  schedule: {
    start_time: "2023-03-13T15:50:00+09:00",
    timezone: "asia/tokyo",
    frequency: {
      type: "hourly",
      repeats_every: 2,
    },
  },
};
export default schedule;
