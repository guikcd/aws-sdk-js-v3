// smithy-typescript generated code
import { Paginator } from "@aws-sdk/types";

import {
  ListCustomRoutingPortMappingsByDestinationCommand,
  ListCustomRoutingPortMappingsByDestinationCommandInput,
  ListCustomRoutingPortMappingsByDestinationCommandOutput,
} from "../commands/ListCustomRoutingPortMappingsByDestinationCommand";
import { GlobalAcceleratorClient } from "../GlobalAcceleratorClient";
import { GlobalAcceleratorPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: GlobalAcceleratorClient,
  input: ListCustomRoutingPortMappingsByDestinationCommandInput,
  ...args: any
): Promise<ListCustomRoutingPortMappingsByDestinationCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListCustomRoutingPortMappingsByDestinationCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListCustomRoutingPortMappingsByDestination(
  config: GlobalAcceleratorPaginationConfiguration,
  input: ListCustomRoutingPortMappingsByDestinationCommandInput,
  ...additionalArguments: any
): Paginator<ListCustomRoutingPortMappingsByDestinationCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListCustomRoutingPortMappingsByDestinationCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof GlobalAcceleratorClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected GlobalAccelerator | GlobalAcceleratorClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
