// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListJobExecutionsForThingCommand,
  ListJobExecutionsForThingCommandInput,
  ListJobExecutionsForThingCommandOutput,
} from "../commands/ListJobExecutionsForThingCommand";
import { IoTClient } from "../IoTClient";
import { IoTPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: IoTClient,
  input: ListJobExecutionsForThingCommandInput,
  ...args: any
): Promise<ListJobExecutionsForThingCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListJobExecutionsForThingCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListJobExecutionsForThing(
  config: IoTPaginationConfiguration,
  input: ListJobExecutionsForThingCommandInput,
  ...additionalArguments: any
): Paginator<ListJobExecutionsForThingCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.nextToken
  let token: typeof input.nextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListJobExecutionsForThingCommandOutput;
  while (hasNext) {
    input.nextToken = token;
    input["maxResults"] = config.pageSize;
    if (config.client instanceof IoTClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected IoT | IoTClient");
    }
    yield page;
    const prevToken = token;
    token = page.nextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
