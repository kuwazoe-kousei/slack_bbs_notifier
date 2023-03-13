import { DefineWorkflow } from "deno-slack-sdk/mod.ts";
import { SampleFunctionDefinition } from "../functions/sample_function.ts";

/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/future/workflows
 *
 * This workflow uses interactivity. Learn more at:
 * https://api.slack.com/future/forms#add-interactivity
 */
const SampleWorkflow = DefineWorkflow({
  callback_id: "sample_workflow",
  title: "Sample workflow",
  description: "A sample workflow",
});

SampleWorkflow.addStep(SampleFunctionDefinition, {});

export default SampleWorkflow;
